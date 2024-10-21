export default defineEventHandler(async (event) => {
    const { email, fileId } = await readBody(event)

    if (!email || !fileId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and card\'s ID are required'
        })
    }

    try {
        return await $fetch('https://67163756b85d4531d94b.appwrite.global/', {
            method: 'POST',
            body: { email,  fileId}
        })

    } catch (e: any) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Error sharing file'
        })
    }
})