import { BaseEntity, DataSource, SelectQueryBuilder } from 'typeorm';
import config from './config';

import Audits from './models/audits.entity';
import Contents from './models/contents.entity';
import ContentsLikes from './models/contentslikes.entity';
import ContentsReply from './models/contentsreply.entity';
import Multimedia from './models/multimedia.entity';
import Notification from './models/notification.entity';
import Permissions from './models/permissions.entity';
import Roles from './models/roles.entity';
import Users from './models/users.entity';


const dbConfig = config.database
const AppDataSource = new DataSource(
  
{
    type: "mysql",
    host: dbConfig.host,
    port: Number(dbConfig.port),
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    entities: [Audits, Contents, ContentsLikes, ContentsReply, Multimedia, Notification, Permissions, Roles, Users],
    logging: true,
	dateStrings: true
}

);

const DB = {
  Audits, Contents, ContentsLikes, ContentsReply, Multimedia, Notification, Permissions, Roles, Users
}

export default DB;


async function rawQuery(query: string, params?: any[]) {
  try {
    const queryRunner = AppDataSource.createQueryRunner();
    const result = await queryRunner.query(query, params);
    queryRunner.release();
    return result;
  }
  catch (err) {
    console.log("raw query failled", err)
  }
}

export { AppDataSource, rawQuery }

// TODO: remove this once it is provided by TypeORM (in case that ever happens)
// check if record exits in a tble
// example: let recordExists = await User.getQuery().where({'user_email': 'emman@radsystems.io'}).exists();

export const isExistsQuery = (query: string) => `CASE WHEN EXISTS(${query}) THEN 1 ELSE 0 END AS "exists"`;
declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    exists<T>(): Promise<boolean>;
  }
}

SelectQueryBuilder.prototype.exists = async function (): Promise<boolean> {
  const result = await this.select(isExistsQuery(this.getQuery())).where('').take(1).getRawOne();
  return result?.exists == '1';
};


