/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PostType } from '../../type/types';
import styles from '../../styles/ListPost.module.css'
import Link from 'next/link';
import LayoutClient from '../../component/Layout';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, GetStaticProps } from 'next';
type PostProps = {
    posts: PostType
  }
const ListPostHomePage = () => {
    const [listPost, setListPost] = useState<PostType[]>([]);
    // if (posts) {
    //     console.log(posts);
        
    // }
    const fetchData = async () => {
        const { data } = await axios.get(`http://localhost:3000/api/post?allPost=1`)
        // console.log(data);

        setListPost(data.lisstAllPosts)
    }

    useEffect(() => {

        fetchData();

        // dispatch(getListPost(0))
    }, [])

    return (
        <div className={styles.container}>
            <NextSeo
                title='Danh sách sản phẩm'
                description="A short description goes here."
                key={'MyBlog'}
           />
                <div className={styles.row}>
                    {listPost?.map((item: PostType, index: Number) => {
                        return (
                            <div key={Number(index)} className={styles.col}>
                                <Link href={`/posts/${item.id}`}><a> <img src="https://picsum.photos/300/200" alt="" /></a></Link>
                                <Link href={`/posts/${item.id}`}><a>  <p className={styles.title}> {item.title}</p></a></Link>
                                <p>Cre: {item.user.name} </p>
                                <p><span>Lượt xem: {item.views}</span> <span>Lượt thích: {item.likes}</span></p>
                            </div>
                        )
                    })}

                </div>
            {/* </NextSeo> */}
        </div>
    )
}



// export const getStaticProps: GetStaticProps<PostProps> = async () => {
    
//     const { data } = await axios.get(`http://localhost:3000/api/post?allPost=1`)
//     // const posts = await res.json();
//     console.log("call API data: ",data);
    
//     return {
//         props:{
//             posts:data
//         }
//     }
// }

ListPostHomePage.Layout = LayoutClient
export default ListPostHomePage
