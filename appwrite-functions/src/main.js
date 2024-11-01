import { Client, Users, Databases, Storage, Query, Permission, Role } from 'node-appwrite';
const endpoint = 'https://cloud.appwrite.io/v1'
const projectId = '670d0506003d499f0268'
const databaseId = '670d2a39001a601412d8' // Replace with your actual database ID
const collectionId = '670d2a7b000d41aa4892' 
const bucketId = '670e6c4b00360d34a518' // Your bucket ID

function createError({ statusCode, statusMessage }) {
    const error = new Error(statusMessage);
    error.statusCode = statusCode;
    return error;
}

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(process.env.APPWRITE_FUNCTION_API_SECRET_KEY);
  
  const users = new Users(client);
  const storage = new Storage(client);
  const databases = new Databases(client);

  try {
        const { email, fileId } = req.body

        // Step 1: Check if the user exists and get their ID
        const userResponse = await users.list([Query.equal("email", email), Query.limit(1)]);

        if (userResponse.total === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: "User not found",
            });
        }

        const userId = userResponse.users[0].$id;

        //Step 2: Update shared_with array in database

        const documentResponse = await databases.listDocuments(databaseId, collectionId, [
            Query.equal("card_id", fileId),
            Query.limit(1), // Adjust the limit as needed
        ]);

        if (documentResponse.documents.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: "Card not found in the database",
            });
        }

        const document = documentResponse.documents[0];
        const sharedWith = document.shared_with || [];

        if (!sharedWith.includes(userId)) {
            sharedWith.push(userId);
        }

        await databases.updateDocument(databaseId, collectionId, document.$id, {
            shared_with: sharedWith,
        });

        // Step 3: Update file permissions

        const currentFile = await storage.getFile(bucketId, fileId);

        const permissions = currentFile.$permissions;
        await storage.updateFile(
            bucketId,
            fileId,
            undefined, // name (unchanged)
            [...permissions, Permission.read(Role.user(userId))]
        );

        return res.json({
            success: true,
            message: "File shared successfully",
        })
   
  } catch(err) {
    error("Error sharing file" + err.message);

    throw createError({
        statusCode: 500,
        statusMessage: "Error sharing file: " + err.message,
    });
  }
};
