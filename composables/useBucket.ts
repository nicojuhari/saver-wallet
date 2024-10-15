import { ID, Storage, Query } from 'appwrite'
import type { Models } from 'appwrite'

export default function useBucket() {
    const { client, APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } = useAppwrite()
    const bucketId = '670d2810001e92b9356c'
    const storage = new Storage(client)

    const uploadFile = async (file: File, newFileName?: string): Promise<Models.File> => {
        if (!file) {
            throw new Error('No file provided for upload')
        }

        try {
            let fileToUpload = file
            if (newFileName) {
                const originalExtension = file.name.split('.').pop() || ''
                const newNameWithExtension = newFileName.includes('.')
                    ? newFileName
                    : `${newFileName}.${originalExtension}`
                
                fileToUpload = new File([file], newNameWithExtension, { type: file.type })
            }

            return await storage.createFile(
                bucketId,
                ID.unique(),
                fileToUpload
            )
        } catch (error) {
            console.error('Error uploading file:', error)
            throw error
        }
    }

    const getFilesByUser = async (userId: string): Promise<Models.FileList> => {
        try {
            return await storage.listFiles(
                bucketId,
                [
                    Query.equal('$permissions.read', `user:${userId}`),
                    Query.limit(10) // Adjust this limit as needed
                ]
            )
        } catch (error) {
            console.error('Error fetching files:', error)
            throw error
        }
    }

    const getFileViewUrl = (fileId: string): string => {
        return `${APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}&mode=user`
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

    const updateFileName = async (fileId: string, newFileName: string): Promise<Models.File> => {
        try {
            const file = await storage.getFile(bucketId, fileId)
            const currentExtension = file.name.split('.').pop() || ''
            const newNameWithExtension = newFileName.includes('.')
                ? newFileName
                : `${newFileName}.${currentExtension}`

            return await storage.updateFile(
                bucketId,
                fileId,
                newNameWithExtension
            )
        } catch (error) {
            console.error('Error updating file name:', error)
            throw error
        }
    }

    return {
        uploadFile,
        getFilesByUser,
        getFileViewUrl,
        getFilesWithViewUrls,
        updateFileName
    }
}