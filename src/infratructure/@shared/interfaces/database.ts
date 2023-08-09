interface FieldDef {
  name: string;
  tableID: number;
  columnID: number;
  dataTypeID: number;
  dataTypeSize: number;
  dataTypeModifier: number;
  format: string;
}

interface QueryResultBase {
  command: string;
  rowCount: number;
  oid: number;
  fields: FieldDef[];
}

interface QueryResultRow {
  [column: string]: any;
}

interface QueryResult<R extends QueryResultRow = any>
  extends QueryResultBase {
  rows: R[];
}
export interface IDatabase {
  connectAsync(): Promise<any>;
  execQuery(query: string, binds?: any[]): Promise<QueryResult>;
  execQuerySequence(table_name: string): Promise<Partial<QueryResult>>;
}
