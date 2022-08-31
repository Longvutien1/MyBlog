import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'
import ListPostHomePage from './posts'
import { PostType } from '../type/types'

type Props = {
  posts: PostType
}
const Home = () => {

  // console.log(posts);

  const route = useRouter();
  useEffect(() => {
    const getToken = async () => {
      const {data} = await axios.get("http://localhost:3000/api/auth/signin")
      
        if (data.message) {
            // alert(data.message)
            route.push('/login')
        }else{
          console.log(data)
          localStorage.setItem("user", JSON.stringify(data))
        }
    }
    
    getToken();
  },[])
  


  return (
    <div>
    
      <ListPostHomePage/>
    </div>
  )
}

export default Home


// export const getStaticProps: GetStaticProps<Props> = async () => {
//   // console.log("abc");
  
//   const { data } = await axios.get(`http://localhost:3000/api/post?allPost=1`)
//   // const posts = await res.json();
//   console.log("getStaticProps: ",data);
  
//   return {
//       props:{
//           posts:data
//       }
//   }
// }
