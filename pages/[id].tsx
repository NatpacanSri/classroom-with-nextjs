import React,{useState} from 'react'
import type { GetStaticPropsContext,GetStaticPropsResult } from 'next'
import Head from 'next/head'
import router from 'next/router'

type PageParams = {
    id:String
}
type ContentPageProps = {
    data:Data
}
type Data = {
    _id:String
    stdID:String
    stdName:String
    gender:String
    age:String
}
type ResponeFromServer = {
    _id:String
    stdID:String
    stdName:String
    gender:String
    age:String
}

export async function getStaticProps({ params }
  : GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
  try {
    let response = await fetch('http://localhost:3000/api/getData?id=' + params?.id);

    let responeFromServer: ResponeFromServer = await response.json();

    return {
      props: {
        data: {
          _id: responeFromServer._id,
          stdID: responeFromServer.stdID,
          stdName: responeFromServer.stdName,
          gender: responeFromServer.gender,
          age: responeFromServer.age,
        },
      },
    };
  } catch (e) {
    console.log('error ', e);
    return {
      props: {
        data: {
          _id: '',
          stdID: '',
          stdName: '',
          gender: '',
          age: '',
        },
      },
    };
  }
}


export async function getStaticPaths() {
  let datas = await fetch('http://localhost:3000/api/getDatas');
  let postFromServer: [Data] = await datas.json();

  return {
    paths: postFromServer.map((data) => {
      return {
        params: {
          id: data._id,
        },
      };
    }),
    fallback: false,
  };
}


function edit({data:{_id,stdID,stdName,gender,age}}:ContentPageProps) {

    const [stdID_n,setStdID_n] = useState(stdID)
    const [stdName_n,setStdName_n] = useState(stdName)
    const [gender_n,setGender_n] = useState(gender)
    const [age_n,setAge_n] = useState(age)
    const [error,setError] = useState('')
    const [message,setMessage] = useState('')
  
    const handleSubmit = async (e:any) => {
      e.preventDefault()
        
      if(stdID && stdName && gender && age){
        console.log(JSON.stringify({ stdID, stdName, gender, age }))
        try {
          
          let response = await fetch('http://localhost:3000/api/editData?id='+_id,{
            method:"POST",
            body:JSON.stringify({
              stdID:stdID_n,
              stdName:stdName_n,
              gender:gender_n,
              age:age_n
            }),
            headers:{
              Accept:"application/json , text/plain, */*",
              "Content-Type":"application/json"
            }
          })
  
          response = await response.json()
  
          // setStdID_n("")
          // setStdName_n("")
          // setGender_n("")
          // setAge_n("")
          // setError("")
          setMessage("Post edited successfully!!")
          router.push('/');
  
        } catch (error:any) {
            setError(error)
        }
      }else{
        return setError("All fields are required!! MotherFUcker idiot")
      }
      
  
    }
  
    return (
      <div className='container'>
  
        <Head>
          <title>Add Student</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div className="_container">
          <div className="head">
            <a href="/">&lt; back</a>
            <h1>Add Student</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="formbox">
                {message ? <div className="alert-message">{message}</div> : null}
                {error ? <div className="alert-error">{error}</div> : null}
            <div className='inputtext'>
              <label htmlFor="stdID" className='label'>Student ID</label>
              <input 
                type="text" 
                id="stdID" 
                name="stdID" 
                placeholder='StudentID'
                onChange={(e) => setStdID_n(e.target.value)}
                value={stdID_n ? stdID_n :''}
              />
            </div>
            <div className='inputtext'>
              <label htmlFor="name" className='label'>Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                placeholder='Name'
                onChange={(e) => setStdName_n(e.target.value)}
                value={stdName_n ? stdName_n : ''}
              />
            </div>
            <div className="genage">
              <div className='selectgender'>
                <label className='label'>Gender</label>
                <select value={gender_n} onChange={(e) => setGender_n(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className='inputage'>
                <label htmlFor="age" className='label'>Age</label>
                <input type="text" id="age" name="age" placeholder='20'
                  value={age_n ? age_n : ''} onChange={(e) => setAge_n(e.target.value)} />
              </div>
              <div className="submit">
                <label htmlFor="submit" className='label'>submit</label>
                <button type="submit">Edit Student</button>
              </div>
            </div>
            
            </div>
            
          </form>
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
          
          ._container{
            width:40vw;
            margin:0 auto;
            margin-top:40px;
            
           }
           ._container .head{
            display:flex;
            margin-bottom:15px;
            
           }
           ._container .head h1{
            font-size:2.5em;
           }
           ._container a{
            margin:auto auto auto 0;
            font-size:1.2em;
            
           }
           ._container a:hover{
            text-decoration:none;
            
           }
  
           form{
            background-color:#414655;
            border-radius:15px;
            padding:20px;
           }
           .formbox{
            width:40em;
            padding:10px;
            margin:auto;
           }
           form .inputtext input[type=text]{
            border-radius:20px;
            padding:7px 20px;
            color:black;
            border:none;
            margin-bottom:10px;
            font-size:1.3em;
            // min-width:20em;
            width:100%;
            box-sizing: border-box;
           }
  
           .label{
              display:block;
              font-size:1.3em;
           }
            .genage{
              display:flex;
            }
           .selectgender select{
            border-radius:20px;
            padding:7px 20px;
            color:black;
            border:none;
            margin-bottom:10px;
            font-size:1.3em;
            min-width:9em;
           }
           .selectgender option{
            color:black;
           }
           .inputage{
            // margin-left:auto;
            margin-left:20px;
            
           }
           .inputage input{
            border-radius:20px;
            padding:7px 20px;
            color:black;
            border:none;
            margin-bottom:10px;
            font-size:1.3em;
            width:3em;
  
           }
           .submit{
            margin:auto;
            width:100%;
            margin-left:20px;
           }
           .submit .label{
            color:#414655;
           }
            button{
              color:darkblue;
              border-radius:20px;
              padding:7px 20px;
              background-color:#98a3c7;
              border:none;
              font-size:1.3em;
              margin-bottom:10px;
              width:100%;
              cursor:pointer;
            font-weight:bold;
            }        
            button:hover{
              color:white;
              transition:.2s;
              background-color:#7a83a0;
            }
  
           .alert-error {
            width:100%;
            color:red;
            margin-bottom:10px;
            font-weight:bold;
          }
          .alert-message{
            width:100%;
            color:green;
            margin-bottom:10px;
            font-weight:bold;
          }
  
  
          `}
        </style>
  
          
      </div>
    )
}

export default edit