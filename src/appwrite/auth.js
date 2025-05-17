import conf from '../conf/conf'
import { Client, Account, ID} from 'appwrite';


export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriterUrl)
        .setProject(conf.projectId);
        this.account = new Account(this.client);
    }


    async createAccount({email, password, name}){
        try{
          const userAccount =  await this.account.create(ID.unique(), email, password, name)
           if(userAccount){
            return this.login({email, password});
           }else{
            return userAccount
           }
        }catch(error){
            console.error("Appwrite Error :: create new account", error);
        }
    };

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            console.error("Appwrite Error :: login", error);
        }
    };

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.error("Appwrite Error :: get current user", error);
        }

        return null;
    };;

    async logoutAll(){
        try{
            return await this.account.deleteSessions();   // logout from all the devices
        }catch(error){
            console.error("Appwrite Error :: logout from all device", error);
        }
    }

    async logout(){

        try{
            return await this.account.deleteSession('current');   // logout from current device
        }catch(error){
            console.error("Appwrite Error :: logout session", error);
        }
    }
}

const authService = new AuthService();

export default authService;
