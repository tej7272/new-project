import conf from '../conf/conf'

import { Client, Account, ID } from 'appwrite'

export class AuthServiceTry{

    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new this.Account(this.client);
        
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.createAccount(ID.unique(), email, password, name);
            if(userAccount){
                // dfdf
            }else{
                return userAccount;
            }
        }catch(error){
            console.error("Error",error)
        }
    };

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            console.error("Error",error)
        }
    };

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.error("Error", error);
        }
    };

    async logout(){
        try{
            return await this.account.deleteSession('current');
        }catch(error){
            console.error("Error",error)
        }
    }

}

const authServiceTry = new AuthServiceTry();

export default authServiceTry;