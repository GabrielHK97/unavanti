"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL = void 0;
class SQL {
    constructor() {
        this.sqls = [
            `CREATE SCHEMA "alpha"`,
            `CREATE TABLE "alpha"."info" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "pk_task_id" PRIMARY KEY ("id"))`,
        ];
    }
    async executeSQLs(datasource) {
        for (let i = 0; i < this.sqls.length; i++) {
            await datasource.query(this.sqls[i]).catch((e) => {
                console.log(e);
            });
        }
    }
}
exports.SQL = SQL;
//# sourceMappingURL=sql.js.map