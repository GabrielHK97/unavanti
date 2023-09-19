import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { SQL } from '../sql/sql';
import { Info } from '../info/entities/info.entity';
import { TypeORMConstants } from '../constants/typeorm.constants';

dotenv.config();

export const datasourceProvider = [
  {
    provide: TypeORMConstants.DATA_SOURCE,
    useFactory: async () => {
      const env = process.env.ENV as string;
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        schema: process.env.DATABASE_SCHEMA,
        database: process.env.DATABASE_DATABASE,
        entities: [Info],
        migrations: [
          /*...*/
        ],
        synchronize: false,
        logging: false,
      });

      const init = await dataSource.initialize();
      const sql = new SQL();
      await sql.executeSQLs(dataSource);
      return init;
    },
  },
];
