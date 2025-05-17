import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, featuredImage, userId, content, status}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                ID.unique(),   // we can use slug here for unique ness
                {title, content, featuredImage, userId, status, slug}
            )
        }catch(error){
            console.error("Appwrite Error :: create post", error);
        }
    };

    async getPosts(queries = [Query.equal('status','active')]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        }catch(error){
            console.error("Appwrite Error :: get all posts", error);
            return false;
        }
    };

    async updatePost(slug, {title, featuredImage, content, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, featuredImage, content, status}
            )
        }catch(error){
            console.error("Appwrite Error :: update post", error);
        }
    };

    async deletePost({slug}){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true
        }catch(error){
            console.error("Appwrite Error :: delete post", error);
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.error("Appwrite Error :: get post", error);
            return false;
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.error("Appwrite Error :: upload file", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.error("Appwrite Error :: delete file", error);
            return false;
        }
    }

    getFilePreview(fileId){
        this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const appwriteService = new Service();

export default appwriteService;