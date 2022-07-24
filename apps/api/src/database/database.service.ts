import { Injectable } from '@nestjs/common';
import { Connection } from "mariadb/callback";

@Injectable()
export class DatabaseService {

  async healthCheckDatabase(): Promise<boolean> {
    const x = await this.prepareConnection()
    return !!x.info.status; //TODO maybe a different variable has to be used
  }

  storeTemperature(celsius: string) {
    this.query(`insert into temperature (celsius) values (${celsius})`)
  }

  private async query(query: string) {
    const conn = await this.prepareConnection();
    conn.query(query,
      (err, rows) => {
        conn.end();
        return rows;
      }
    );
  }

  private async prepareConnection(): Promise<Connection> {
    //https://hub.docker.com/_/mariadb
    //https://mariadb.com/kb/en/nodejs-connection-options/
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mariadb = require('mariadb/callback');
    const conn = mariadb.createConnection({
      host: process.env['DATABASE_IP'],
      port: process.env['DATABASE_PORT'],
      ssl: false,
      user: "root",//process.env['DATABASE_USER'],
      password: process.env['DATABASE_ROOT_HASH'],//process.env['DATABASE_PASS_HASH'],
      database: 'iot'
    })
    try {
      await conn.connect();
    } catch (e) {
      console.error(e)
      return null
    }
    return conn;
  }
}
