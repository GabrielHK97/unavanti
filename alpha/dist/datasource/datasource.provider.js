"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datasourceProvider = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const sql_1 = require("../sql/sql");
const info_entity_1 = require("../info/entities/info.entity");
const typeorm_constants_1 = require("../constants/typeorm.constants");
dotenv.config();
exports.datasourceProvider = [
    {
        provide: typeorm_constants_1.TypeORMConstants.DATA_SOURCE,
        useFactory: async () => {
            const env = process.env.ENV;
            const dataSource = new typeorm_1.DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                schema: process.env.DATABASE_SCHEMA,
                database: process.env.DATABASE_DATABASE,
                entities: [info_entity_1.Info],
                migrations: [],
                synchronize: false,
                logging: false,
            });
            const init = await dataSource.initialize();
            const sql = new sql_1.SQL();
            await sql.executeSQLs(dataSource);
            return init;
        },
    },
];
//# sourceMappingURL=datasource.provider.js.map