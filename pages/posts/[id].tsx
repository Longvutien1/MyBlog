/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LayoutClient from '../../component/Layout';
import { getUser } from '../../features/user/userSlice';
import styles from '../../styles/ListPost.module.css'
import { PostType } from '../../type/types';
type Props = {
  props: PostType
} 
// { props }: Props
const DetailPost = () => {
  const user = useSelector((item: any) => item.user.value)
  const dispatch = useDispatch();
  const [post, setPost] = useState<PostType>();
  const [liked, setLiked] = useState<String>();
  const route = useRouter();
  const { id } = route.query

  useEffect(() => {
    const userDetail = async () => {
      const { payload } = await dispatch(getUser())
      console.log(payload);


    }
    userDetail();
    // if (props) {
    //   console.log(props.views);

    //   const addView = async () => {
    //     const { data } = await axios.patch(`/api/post/${id}?views=${props?.views}`)
    //     setPost(data)
    //   }
    //   addView()
    //   console.log(props);

    // } else {
      const listProduct = async (id: Number) => {
        const detailPost = await axios.get(`/api/post/${id}`)

        const { data } = await axios.patch(`/api/post/${id}?views=${detailPost.data.views}`)
        setPost(data)
        // setPost(data);
      }
      listProduct(Number(id));

    // }

  }, [])

  const likePost = async () => {
    console.log("check like");

    const { data } = await axios.patch(`/api/post/${id}?likes=${post?.likes}&userId=${user?.id}`)
    setPost(data.data)
    setLiked(data.message)


  }

  return (
    <div className={styles.container}>
      <NextSeo
        title={post?.title}
        description="A short description goes here."
        key={'MyBlog'}
      />
      <h1> Chi tiết bài viết: {id}</h1>
      <div className={styles.rowDetail}>
        <div><img src="https://picsum.photos/300/200" alt="" /></div>
        <div>
          <p className={styles.title}>{post?.title}</p>

          <p className={styles.viewAndLikes}><span>Lượt thích: {post?.likes}</span><span>Lượt xem: {post?.views}</span></p>

          <div >
            <button className={`${styles.btnLike} ${liked && liked == "Đã thích" ? "text-blue-700 border-blue-700" : "text-gray-600 border-gray-600"}`} onClick={() => likePost()}>Thích</button>
          </div>

          {/* Start Share */}
          <div className={styles.share}>
            <h1>Social Share </h1>
            <div>
              <FacebookShareButton
                url={`/posts/${id}`} >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <PinterestShareButton
                media={''}
                description={"Printerest Long"}
                url={`/posts/${id}`} >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <RedditShareButton
                 url={`/posts/${id}`} >
                <RedditIcon size={32} round />
              </RedditShareButton>
              <WhatsappShareButton
                 url={`/posts/${id}`} >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>

      <div className='my-8 '>
        <h2 className='font-bold pb-2 border-b'>BÌNH LUẬN</h2>
        {/* <p>{post?.comments}</p> */}
        <div className={styles.content}>
          <div className={styles.info}>
            <a ><img src="https://res.cloudinary.com/chanh-thon/image/upload/v1645342604/upload_preset/wkbpd6xv38ugjexk6dri.png" width={40} /></a>
            <div>
              <p>username</p>
            </div>
          </div>
          <div className="content-comment flex justify-between ">
            <p style={{ paddingLeft: '4%' }}>${'{'}item.content{'}'}</p>
            <p className="float-right my-auto line">${'{'}item.time{'}'}</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <a ><img src="https://res.cloudinary.com/chanh-thon/image/upload/v1645342604/upload_preset/wkbpd6xv38ugjexk6dri.png" width={40} /></a>
            <div>
              <p>username</p>
            </div>
          </div>
          <div className="content-comment flex justify-between">
            <p style={{ paddingLeft: '4%' }}>${'{'}item.content{'}'}</p>
            <p className="float-right my-auto">${'{'}item.time{'}'}</p>
          </div>
        </div>
        {user ? <form id="formComment" style={{ border: '1px solid #E8E8E8', backgroundColor: '#E8E8E8', padding: '5px 10px' }}>

          <input type="text" id="commentInput" style={{ width: "100%", outline: "none" }} className="shadow-sm border-solid px-2 py-1 w-full mt-1 border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block  rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Comment's here" />
        </form>
          : <p style={{ color: 'red', background: '#ddd', padding: '5px 10px' }}>Đăng nhập để bình luận về sản phẩm này</p>

        }
      </div>

    </div>
  )
}
DetailPost.Layout = LayoutClient
export default DetailPost




// export const getStaticPaths: GetStaticPaths = async () => {


//   const { data } = await axios.get(`/api/post?allPost=1`)
//   console.log("data,listPost: ", data.lisstAllPosts);
//   const paths = data.lisstAllPosts?.map((product: any) => ({ params: { id: String(product.id) } }));
//   console.log(paths);
//   // paths: [{ params: { id: '1' }, } { params: { id: '2' } }],

//   return {
//     paths,
//     fallback: true, // blocking or true
//   };
// };

// export const getStaticProps: GetStaticProps<Props> = async (
//   context: GetStaticPropsContext
// ) => {
//   console.log("context", context);
//   const { data } = await axios.get(`/api/post/${context.params?.id}`);
//   console.log("data chi tiết: ", data);

//   return {
//     props: {
//       props: data
//     },
//     revalidate: 5,
//   };
// };