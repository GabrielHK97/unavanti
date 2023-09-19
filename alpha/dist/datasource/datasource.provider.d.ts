import { DataSource } from 'typeorm';
import { TypeORMConstants } from '../constants/typeorm.constants';
export declare const datasourceProvider: {
    provide: TypeORMConstants;
    useFactory: () => Promise<DataSource>;
}[];
