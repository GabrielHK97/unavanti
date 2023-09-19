import { DataSource } from 'typeorm';
export declare class SQL {
    sqls: Array<string>;
    executeSQLs(datasource: DataSource): Promise<void>;
}
