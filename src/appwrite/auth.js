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
           await this.account.create(ID.unique(), email, password, name)
        }catch(error){
            console.log("Error", error);
            throw error;
        }
    };

    async login({email, password}){
        try{
            await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            console.log("Error", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
