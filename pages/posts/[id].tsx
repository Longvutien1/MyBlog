import axios from 'axios';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import LayoutClient from '../../component/Layout';
import styles from '../../styles/ListPost.module.css'
import { PostType } from '../../type/types';
type Props = {
  props: PostType
}
const DetailPost = (props: Props) => {
  const [post, setPost] = useState<any>();
  const route = useRouter();
  const { id } = route.query


  // console.log(posts);

  useEffect(() => {
    if (props) {
      setPost(props);
      console.log(props);

    }
  }, [])
  return (
    <div className={styles.container}>
      <NextSeo
        title={post?.title}
        description="A short description goes here."
        key={'MyBlog'}
      />
      <h1> Chi tiết sản phẩm: {id}</h1>
      <div className={styles.rowDetail}>
        <div><img src="https://picsum.photos/300/200" alt="" /></div>
        <div>
          <p className={styles.title}>{post?.title}</p>

          <p className={styles.viewAndLikes}><span>Lượt thích: {post?.likes}</span><span>Lượt xem: {post?.views}</span></p>

          <div >
            <button className={styles.btnLike}>Thích</button>
          </div>

        </div>
      </div>

      <div className='my-8'>
        <h2 className='font-bold'>BÌNH LUẬN</h2>
        <p>{post?.comments}</p>
      </div>

    </div>
  )
}
DetailPost.Layout = LayoutClient
export default DetailPost


// export const getStaticProps: GetStaticProps<Props> = async (
//   context: GetStaticPropsContext
// ) => {
//   console.log("context", context);
//   const {data} = await axios.get(`http://localhost3000/api/post/${context.params?.id}`)
//   console.log(data);

//   return {
//     props: { post2: data },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {


  const { data } = await axios.get(`http://localhost:3000/api/post?allPost=1`)
  console.log("data,listPost: ", data.lisstAllPosts);
  const paths = data.lisstAllPosts?.map((product: any) => ({ params: { id: String(product.id) } }));
  console.log(paths);
  // paths: [{ params: { id: '1' }, } { params: { id: '2' } }],

  return {
    paths,
    fallback: true, // blocking or true
  };
};

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  console.log("context", context);
  const { data } = await axios.get(`http://localhost:3000/api/post/${context.params?.id}`);
  console.log("data chi tiết: ", data);

  return {
    props: data,
    revalidate: 5,
  };
};