import { Databases, ID, Query } from "appwrite";
import type { Models } from 'appwrite'

export default function useDatabases() {
    const config = useAppwriteConfig()
    const { client } = useAppwrite()
    const databases = new Databases(client);


    const getAllCards = async (userId:string) => {
        const res1  = await getCardsByUserId(userId)
        const res2  = await getSharedCards(userId)

        return [...res1.documents, ...res2.documents]
    }

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
                    viewUrl: getFileViewUrl(doc.card_id),
                    isShared: true,
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

    const getCard = async (cardId: string, userId: string): Promise<Models.Document | null> => {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.collectionId,
                [
                    Query.equal('card_id', cardId),
                    Query.equal('user_id', userId)
                ]
            );

            if (response.documents.length > 0) {
                const card = response.documents[0];
                return {
                    ...card,
                    viewUrl: getFileViewUrl(card.card_id)
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching card:', error);
            throw error;
        }
    };

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

    const updateCard = async (documentId: string, title: string) => {
        try {
            const response = await databases.updateDocument(
                config.databaseId,
                config.collectionId,
                documentId,
                {
                    title
                }
            );
            return response;
        } catch (error) {
            console.error('Error updating card:', error);
            throw error;
        }
    };

    const deleteCard = async (documentId: string): Promise<void> => {
        try {
            // Delete the document
            await databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                documentId
            );

            console.log('Card deleted successfully');
        } catch (error) {
            console.error('Error deleting card:', error);
            throw error;
        }
    };



    return {
        addCard,
        getCard,
        getAllCards,
        updateCard,
        deleteCard,
        getCardsByUserId,
        getSharedCards
    };



}