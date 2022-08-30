import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { ProductType } from './type/Product'
import prisma from '../lib/prisma'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import jwt from "jsonwebtoken";
import { getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/router'
import Header from '../component/Header'
import ListPost from './admin/post'
import AdminLayout from '../component/Layout/admin'
import LayoutClient from '../component/Layout'
import ListPostHomePage from './posts'
import { PostType } from '../type/types'
// import prisma from '../lib/prisma';

type Props = {
  posts: PostType
}
const Home = ({posts}:Props) => {

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


export const getStaticProps: GetStaticProps<Props> = async () => {
  // console.log("abc");
  
  const { data } = await axios.get(`http://localhost:3000/api/post?allPost=1`)
  // const posts = await res.json();
  console.log("getStaticProps: ",data);
  
  return {
      props:{
          posts:data
      }
  }
}
