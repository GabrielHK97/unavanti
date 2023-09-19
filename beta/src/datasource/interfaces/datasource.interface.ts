import { DatasourceConstants } from "../constants/datasource.constant";

export interface Datasource {
    type: DatasourceConstants;
    host: string;
    port: number;
    username: string;
    password: string;
    schema: string;
    database: string;
}
