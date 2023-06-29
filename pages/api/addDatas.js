import clientPromise from '../../lib/mongodb'

export default async(req,res) => {
    try {
        
        const client = await clientPromise
        const db = client.db('school')
        const {stdID,stdName,gender,age} = req.body

        const datas = await db.collection('student').insertOne({
            stdID,stdName,gender,age
        })
        res.json(datas)

    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}