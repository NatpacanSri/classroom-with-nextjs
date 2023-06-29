import clientPromise from '../../lib/mongodb'

export default async(req,res) => {
    try {
        
        const client = await clientPromise
        const db = client.db('school')

        const data = await db.collection('student').find({}).toArray()

        res.json(data)

    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}