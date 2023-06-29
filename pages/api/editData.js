import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async (req,res) => {
    try {
        
        const client = await clientPromise
        const db = client.db('school')
        const {id} = req.query
        const {stdID,stdName,gender,age} = req.body

        const data = await db.collection('student').updateOne(
            {_id:ObjectId(id)},
            {
                $set:{
                    stdID:stdID,
                    stdName:stdName,
                    gender:gender,
                    age:age
                }
            }
        )

        res.json(data)

    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}