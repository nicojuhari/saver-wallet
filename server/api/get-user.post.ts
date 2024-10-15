import { Client, Users, Query } from 'node-appwrite'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('670d0506003d499f0268') // Your project ID
    .setKey('your-api-key') // Your secret API key

const users = new Users(client)

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event)

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email is required'
        })
    }

    try {
        const response = await users.list([
            Query.equal('email', email),
            Query.limit(1)
        ])

        if (response.users.length > 0) {
            return {
                userId: response.users[0].$id
            }
        } else {
            return {
                userId: null
            }
        }
    } catch (error) {
        console.error('Error fetching user ID by email:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Error fetching user ID'
        })
    }
})