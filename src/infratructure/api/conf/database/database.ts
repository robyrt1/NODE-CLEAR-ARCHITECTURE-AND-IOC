import { HTTPCODE } from '../../../@shared/constants/httpCode';
import { Pool, PoolClient, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { IDatabase } from '../../../@shared/interfaces/database';
dotenv.config();

export class Database implements IDatabase {
    private connection: Pool;

    private static _instance: Database | null = null;

    private constructor() {
        this.connect();
    }

    public static getInstance(): Database {
        if (this._instance === null) {
            this._instance = new Database();
        }
        return this._instance;
    }

    public connect() {
        if (!this.getConnection()) {
            const dbConfig = {
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: parseInt(process.env.POSTGRES_PORT, 10),
                max: 10,
            };

            this.connection = new Pool(dbConfig)
        }
        console.log('[INFO] - Database is connected');
    }

    public getConnection(): Pool {
        return this.connection;
    }

    public async connectAsync() {
        if (!this.getConnection()) {
            const dbConfig = {
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: parseInt(process.env.POSTGRES_PORT, 10),
            };

            try {
                this.connection = new Pool(dbConfig);
                await this.connection.connect();
                console.log('[INFO] - Database is connected');
            } catch (error) {
                console.error('Error connecting to the database:', error);
            }
        }
    }

    public async execQuery(query: string, binds?: any[]): Promise<QueryResult> {
        const client: PoolClient = await this.getConnection().connect();
        try {
            const result: QueryResult = await client.query(query, binds);
            return result ; 
        } catch (error) {
            throw { statusCode: HTTPCODE.INTERNAL_SERVER_ERROR, error:JSON.stringify(error) };
        } finally {
            client.release();
        }
    }

    public async execQuerySequence(table_name: string): Promise<QueryResult> {
        const client: PoolClient = await this.getConnection().connect();
        try {
            const next_sequence = `select nextVal('manager.${table_name}_seq') as sequence`;
            const { rows }: QueryResult = await client.query(next_sequence);
            return rows[0].sequence;
        } catch (error) {
            throw { statusCode: HTTPCODE.INTERNAL_SERVER_ERROR, error };
        } finally {
            client.release();
        }
    }
}

