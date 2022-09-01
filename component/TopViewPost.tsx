/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../styles/ListPost.module.css'
import { PostType } from '../type/types';
const TopViewPost = () => {
    const [postTopViews, setPostTopViews] = useState<PostType[]>([]);

    const listTopViewPost = async () => {
         const {data} = await axios.get("/api/post?topview=3");
         console.log(data);
         setPostTopViews(data)
    }
    
    useEffect(() => {
        listTopViewPost();
    },[])
    return (
        <div className={styles.topViews}>
            <p><b>TOP VIEW POSTS</b></p>

            {postTopViews?.map((item:PostType, index:Number) => {
                return (
                    <div className='my-8 mb-16' key={Number(index)}>
                    <img src="https://picsum.photos/300/200" width={"100%"} alt="" />
                    <div className='text-left my-2'>
                        <h3 className='font-medium mb-2'>{item.title}</h3>
                        <p className='text-sm'>{item.content}</p>
                    </div>
                </div>
                )
            })
                
            }
          

        </div>
    )
}

export default TopViewPost