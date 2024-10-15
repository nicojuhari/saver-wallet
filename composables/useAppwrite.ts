import { Client, Account } from 'appwrite';

export default function useAppwrite() {

    const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'
    const APPWRITE_PROJECT_ID = '670d0506003d499f0268'

    const client = new Client();
    
    client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

    const account = new Account(client);
    

    return {
        client,
        account,
        APPWRITE_ENDPOINT,
        APPWRITE_PROJECT_ID
    }

}