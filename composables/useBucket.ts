import { ID, Storage, Query } from 'appwrite'
import type { Models } from 'appwrite'

export default function useBucket() {
    const config = useAppwriteConfig()
    const { client } = useAppwrite()
    const storage = new Storage(client)

    const uploadFile = async (file: File): Promise<Models.File> => {
        if (!file) {
            throw new Error('No file provided for upload')
        }

        try {
            return await storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error('Error uploading file:', error)
            throw error
        }
    }

    const getFilesByUser = async (userId: string): Promise<Models.FileList> => {
        try {
            return await storage.listFiles(
                config.bucketId,
                [
                    Query.equal('$permissions.read', `user:${userId}`),
                    Query.limit(20) // Adjust this limit as needed
                ]
            )
        } catch (error) {
            console.error('Error fetching files:', error)
            throw error
        }
    }

    const getFileViewUrl = (fileId: string): string => {
        return `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${config.projectId}&mode=user`
    }

    const getFilesWithViewUrls = async (userId: string): Promise<(Models.File & { viewUrl: string })[]> => {
        try {
            const response = await getFilesByUser(userId)
            return response.files.map(file => ({
                ...file,
                viewUrl: getFileViewUrl(file.$id)
            }))
        } catch (error) {
            console.error('Error fetching files with view URLs:', error)
            throw error
        }
    }

   const deleteFile = async (fileId: string): Promise<void> => {
        if (!fileId) {
            throw new Error('No file ID provided for deletion')
        }

        try {
            await storage.deleteFile(
                config.bucketId,
                fileId
            )
            console.log(`File with ID ${fileId} deleted successfully`)
        } catch (error) {
            console.error('Error deleting file:', error)
            throw error
        }
    }

    return {
        uploadFile,
        deleteFile,
        getFilesByUser,
        getFileViewUrl,
        getFilesWithViewUrls,
    }
}