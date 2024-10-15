import { Databases, ID, Query } from "appwrite";
import type { Models } from 'appwrite'

export default function useDatabases() {
    const config = useAppwriteConfig()
    const { client } = useAppwrite()
    const databases = new Databases(client);

    const getCardsByUserId = async (userId: string): Promise<Models.DocumentList<Models.Document>> => {
        try {
            const response = await databases.listDocuments(
                    config.databaseId,
                    config.collectionId,
                    [
                        Query.equal('user_id', userId),
                        Query.limit(20), // Adjust the limit as needed
                    ]
            );

            return {
                ...response,
                documents: response.documents.map(doc => ({
                    ...doc,
                    viewUrl: getFileViewUrl(doc.card_id)
                }))
            };
            // return response;
        } catch (error) {
            console.error('Error fetching cards:', error);
            throw error;
        }
    };

    const getSharedCards = async (userId: string): Promise<Models.DocumentList<Models.Document>> => {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.collectionId,
                [
                    Query.search('shared_with', userId),
                    Query.limit(20), // Adjust the limit as needed
                ]
            );

            return {
                ...response,
                documents: response.documents.map(doc => ({
                    ...doc,
                    viewUrl: getFileViewUrl(doc.card_id)
                }))
            };
        } catch (error) {
            console.error('Error fetching shared cards:', error);
            throw error;
        }
    };

    const getFileViewUrl = (fileId: string): string => {
        return `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${config.projectId}`
    }

    const addCard = async (cardId: string, title: string, userId: string) => {
        try {
            const response = await databases.createDocument(
                config.databaseId,  // Database ID
                config.collectionId,  // Collection ID
                ID.unique(),             // Generate a unique document ID
                {
                    card_id: cardId,
                    title,
                    user_id: userId,
                }
            );
            return response;
        } catch (error) {
            console.error('Error adding card:', error);
            throw error;
        }
    };

    const updateCard = async (documentId: string, updatedData: Partial<{
            card_id?: string;
            title?: string;
            user_id?: string;
            shared_with_users_id?: string
        }>) => {
        try {
            const response = await databases.updateDocument(
                config.databaseId,
                config.collectionId,
                documentId,
                updatedData
            );
            return response;
        } catch (error) {
            console.error('Error updating card:', error);
            throw error;
        }
    };



    return {
        addCard,
        getCardsByUserId,
        getSharedCards
    };



}