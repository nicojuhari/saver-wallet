import { Client, Users, Databases } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  
  const users = new Users(client);
  const storage = new Storage(client);
  const databases = new Databases(client);

  const { email, fileId } = req.body
  if (!email || !fileId) {
    res.json({
        statusCode: 400,
        statusMessage: "Email and cardId are required",
    });
  }

  try {
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

        res.json({
            success: true,
            message: "File shared successfully",
        })
   
  } catch(err) {
    error("Could not list users: " + err.message);

    res.json({
        statusCode: 500,
        statusMessage: "Error sharing file",
    });
  }
};
