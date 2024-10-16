import { Client, Account } from 'appwrite';

export default defineNuxtPlugin(() => {
  const config = useAppwriteConfig();
  
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

  const account = new Account(client);

  return {
    provide: {
      appwrite: {
        client,
        account
      }
    }
  };
});