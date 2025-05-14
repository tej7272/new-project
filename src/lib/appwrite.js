import { Client, Account} from 'appwrite';
import conf from '../conf/conf'

export const client = new Client();

client
    .setEndpoint(conf.appwrite)
    .setProject(conf.appwriteProjectId); 

export const account = new Account(client);
export { ID } from 'appwrite';
