import { DataSource } from 'typeorm';

export class SQL {
  sqls: Array<string> = [
    `CREATE SCHEMA "alpha"`,
    `CREATE TABLE "alpha"."info" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "pk_task_id" PRIMARY KEY ("id"))`,
  ];

  async executeSQLs(datasource: DataSource): Promise<void> {
    for (let i = 0; i < this.sqls.length; i++) {
      await datasource.query(this.sqls[i]).catch((e) => {
        console.log(e);
      });
    }
  }
}