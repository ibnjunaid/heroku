import { MongoClient } from 'mongodb';
export declare function getTrendByTime(Woeid: number, Ttime: number, conn: Promise<MongoClient>): Promise<any[]>;
