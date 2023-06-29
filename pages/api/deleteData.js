import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req,res) => {
    try {

        const client = await clientPromise
        const db = client.db('school')
        const {id} = req.query
         
        const data = await db.collection('student').deleteOne({_id:ObjectId(id)})

        res.json(data)
        
    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}