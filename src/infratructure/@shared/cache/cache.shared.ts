import 'reflect-metadata';
import { injectable } from 'inversify';
import NodeCache from 'node-cache';
import { head, isArray } from 'lodash';


export interface ICache {
  set(key: string, value: any): void;
  get(key: string): any;
}

@injectable()
export class CacheShared implements ICache {
    private myCache: NodeCache;

    constructor() {
        this.getInstance();
    }

    private getInstance() {
        if (this.myCache == null) {
            this.myCache = new NodeCache({
                stdTTL: 0,
                checkperiod: 0,
                deleteOnExpire: true,
            });
        }
    }

    public set(key: string, value: any,expiryTime?:string): void {
        console.log('[INFO] - cache set:', key);
        const shouldValueCache = value;
        const shouldNotValueCache = isArray(value) ? !!head(shouldValueCache) : !!head([shouldValueCache]);
        if (shouldNotValueCache) this.myCache.set(key, shouldValueCache);
    }

    public get(key: string): any {
        return this.myCache.get(key);
    }

    public validateExpired(keys: string): boolean {
        const expiryTime = this.myCache.getTtl(keys);
        const validate = expiryTime < Date.now();
        return validate;
    }
}
