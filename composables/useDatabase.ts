import { Databases, ID, Query } from "appwrite";

export default function useDatabases() {
    const { client } = useAppwrite()
    const databases = new Databases(client);
    const APPWRITE_DATABASE_ID = '670d2a39001a601412d8'
    const APPWRITE_COLLECTION_ID = '670d2a7b000d41aa4892'

    const getCardsByUserId = async (userId: string) => {
        try {
            const response = await databases.listDocuments(
                    APPWRITE_DATABASE_ID,
                    APPWRITE_COLLECTION_ID,
                    [
                        Query.equal('user_id', userId),
                        Query.limit(100), // Adjust the limit as needed
                    ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching cards:', error);
            throw error;
        }
    };

    const addCard = async (cardId: string, title: string, userId: string) => {
        try {
            const response = await databases.createDocument(
                APPWRITE_DATABASE_ID,  // Database ID
                APPWRITE_COLLECTION_ID,  // Collection ID
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
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_ID,
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
        getCardsByUserId
    };



}