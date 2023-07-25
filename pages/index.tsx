import Head from 'next/head'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


type ConnectionStatus = {
  isConnected: boolean
}

type Props = {
  datas:[Data]
}

type Data = {
  _id:string
  stdID:string
  stdName:string
  gender:string
  age:string
}

export const getServerSideProps = async () => {
  try {

    let response = await fetch('http://localhost:3000/api/getDatas')
    let datas = await response.json()
    
    return {
      props: { datas:JSON.parse(JSON.stringify(datas)) }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { datas: [] },
    }
  }
}

export default function Home(props:Props) {

  const [datas,setDatas] = useState<[Data]>(props.datas)

  const handleDelete =async (id:String) => {
    try {
      
      let response = await fetch('http://localhost:3000/api/deleteData?id='+id, {
        method:"POST",
        headers:{
          Accept:'application/json, text/plain, */*',
          "Content-Type":'application/json'
        }
      })
      let data = await response.json()

      window.location.reload()

    } catch (e) {
      console.error('An error occured while deleting ',e)

    }
  }

  return (
      <div className='container'>
        
      <Head>
        <title>Student</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='body'>
        <div className="header">
          <div className="title">
            <h1>All Student ...</h1>
            <p>There are <b>{datas?.length>0?(datas.length):("No fucking")}</b> students in the classroom.</p>
          </div>
        
        <a href="/addStd"><b>+</b>Add Student</a>
        </div>
        {datas?.length > 0 ? (
          <ul>
            {datas.map((data,index)=>{
              return(
                <li>
                  <div className='info'>
                    <p className='stdid'>{data.stdID}</p>
                    <h3>{data.stdName}</h3>
                    <p><span>gender: <i>{data.gender}</i></span> age: <i>{data.age}</i></p>
                  </div>
                  <div className='action'>
                    <a href={`/${data._id}`} className='icon'><FontAwesomeIcon className='_icon' icon={faEdit} /></a>
                    <button className='icon' 
                      onClick={()=> handleDelete(data._id as String)}
                    ><FontAwesomeIcon className='_icon' icon={faTrash} /></button>
                  </div>
                </li>
              ) 
            })}
          </ul>
        ):(
          <h2>No Student in you class</h2>
        ) }
      </div>

      <style jsx global>
      {`

       *{
        font-family:sans-serif;
        margin:0;
        padding:0;
        color:white;
       }
       
       .container{
        display:flex;
        background-color:#282c34;
        min-height:100vh;
        
       }

       .body{
        width:50vw;
        margin:40px auto;
        // background-color:#2f333d;
        padding:5px 23px;
        border-radius:15px;
       }
       .body h1{
        // margin:20px 0;
       }

       .header{
        display:flex;
        padding:20px 0;
       }
      
       .header a {
        margin:auto 0 auto auto;
        padding-right:20px;
       }

       ul{
        background-color:#2f333d;
        border-radius:15px;
        min-height:80vh;
        padding:20px 23px;
       }

       li{
        list-style:none;
        display:flex;
        background-color:#414655;
        border-radius:15px;
        margin-bottom:10px;
       }

       .info{
        // border:1px solid red;
        margin:7px 10px;
        padding:7px 10px;
       }
       .info .stdid{
        opacity: 0.5;
       }
       .info h3{
        margin:7px 0;
       }
       .info p{
        display:flex;
       }
       .info p i{
        margin-left:5px;
       }
       .info span{
        display:flex;
        width:120px;
       }
       .action{
        margin:auto 0 auto auto;
        padding:20px;
        display:flex;
        border:none;
       }

       .action button{
        background:none;
        border:none;
        margin-left:15px
       }

       .action .icon{
        display:block;
        width:20px;
        height:20px;
        cursor:pointer;
       }

       .action FontAwesomeIcon{
        fill:black;
       }

       ._icon{
        
       }
       
      `}
      </style>  
    </div>
  )
}
