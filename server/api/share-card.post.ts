import { Client, Users, Databases, Storage, Query, Permission, Role } from 'node-appwrite'

const APPWRITE_API_KEY = 'standard_fbc1d8f5cb4bf26b6f4c6ca7c0bfcd120ee7f5d34f50b52fa39a6d288a63c51fcbf5b8bc1c1f310a2c8296ac6d8118de55564f2e39c4dcc611807f7bb08ec9830497a4532e87eb1f4a3c4563a8895fba9cc6f9039522538bc31269a7b0171c418230df20a8a31915d1ba71a0e939a5118f939d284068d590fdba0ee5fdea9fe1'
const databaseId = '670d2a39001a601412d8' // Replace with your actual database ID
const collectionId = '670d2a7b000d41aa4892' 
const bucketId = '670e6c4b00360d34a518' // Your bucket ID

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('670d0506003d499f0268') // Your project ID
    .setKey(APPWRITE_API_KEY) // Your secret API key

const users = new Users(client)
const storage = new Storage(client)
const databases = new Databases(client)

export default defineEventHandler(async (event) => {
    const { email, fileId } = await readBody(event)

    if (!email || !fileId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and cardId are required'
        })
    }

    try {
        // Step 1: Check if the user exists and get their ID
        const userResponse = await users.list([
            Query.equal('email', email),
            Query.limit(1)
        ])

        if (userResponse.total === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        const userId = userResponse.users[0].$id

        
        //Step 2: Update shared_with array in database

        const documentResponse = await databases.listDocuments(
                    databaseId,
                    collectionId,
                    [
                        Query.equal('card_id', fileId),
                        Query.limit(1), // Adjust the limit as needed
                    ]
        );

        if (documentResponse.documents.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Card not found in the database'
            });
        }

        const document = documentResponse.documents[0];
        const sharedWith = document.shared_with || [];

        if (!sharedWith.includes(userId)) {
            sharedWith.push(userId);
        }

        await databases.updateDocument(databaseId, collectionId, document.$id, {
            shared_with: sharedWith
        });



        // Step 3: Update file permissions
        
        const currentFile = await storage.getFile(bucketId, fileId)

        const permissions = currentFile.$permissions
        await storage.updateFile(
            bucketId,
            fileId,
            undefined, // name (unchanged)
            [   
                ...permissions,
                Permission.read(Role.user(userId))
            ]
        )

        return {
            success: true,
            message: 'File shared successfully'
        }
    } catch (error) {
        console.error('Error sharing file:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Error sharing file'
        })
    }
})