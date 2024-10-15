import { Client } from 'appwrite';

export default function useAppwrite() {
    const config = useAppwriteConfig()

    const client = new Client();
    client.setEndpoint(config.endpoint).setProject(config.projectId);
    
    return {
        client
    }

}