/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Info from '../../component/Info';
import LayoutClient from '../../component/Layout';
import TopViewPost from '../../component/TopViewPost';
import { getUser } from '../../features/user/userSlice';
import styles from '../../styles/ListPost.module.css'
import { PostType } from '../../type/types';
type Props = {
  props: PostType
}
type FormComment = {
  content: String
}
// { props }: Props
const DetailPost = () => {
  const user = useSelector((item: any) => item.user.value)
  const dispatch = useDispatch();
  const [post, setPost] = useState<PostType>();
  const [liked, setLiked] = useState<String>();
  const [comments, setComments] = useState<any>();
  const { register, handleSubmit, formState: { errors } } = useForm<FormComment>();
  const route = useRouter();
  const { id } = route.query
  console.log("idididid", id);

  useEffect(() => {

    const userDetail = async () => {
      const { payload } = await dispatch(getUser())
      // console.log(payload);


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
      // console.log(data);

      setPost(data)
      // setPost(data);
    }
    listProduct(Number(id));

    // }

    const listComments = async () => {
      const { data } = await axios.get(`/api/comments/${id}`);
      console.log("listComment", data);
      setComments(data)
    }
    listComments();
  }, [id])

  const likePost = async () => {
    console.log("check like");

    if (user.message == "Hết hạn cookie") {
      alert("Đăng nhập để có thể thích bài viết !")
    }else{
      const { data } = await axios.patch(`/api/post/${id}?likes=${post?.likes}&userId=${user?.id}`)
      setPost(data.data)
      setLiked(data.message)
    }
  }

  const onComment = async (value: any) => {
    console.log(value);
    const { data } = await axios.post("/api/comments", { content: value.content, userId: user?.id, idPost: post?.id })
    console.log("dataComment", data);

    setComments([...comments, data]);
  }
  console.log(user);

  return (
    <div className='bg-[#F7F7F7]'>
      <div className={styles.container}>
        <NextSeo
          title={post?.title}
          description="A short description goes here."
          key={'MyBlog'}
        />
        {/* <h1> Chi tiết bài viết: {id}</h1> */}
        <div className={styles.row}>
          <div className={styles.col3}>



            <div className={styles.col} >

              <Link href={`/posts/${post?.id}`}><a>  <p className={styles.title}> {post?.title}</p></a></Link>
              <h2 className={styles.categoryPost}> Loại bài viết / {post?.categoryPost}</h2>
              <Link href={`/posts/${post?.id}`}><a> <img src="https://picsum.photos/800/600" width={"100%"} className='max-w-full' alt="" /></a></Link>
              <p className={styles.contentPost}>{post?.content}</p>


              <div className={styles.tacGiaAndViews}>
                <p ><i>Tác giả: {post?.user.name}</i> </p>

                <p className='flex gap-8'>
                  <span className='flex gap-2 text-red-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    {post?.views}
                  </span>
                  {/* className='flex gap-2 text-blue-600' */}
                  <span className={`flex gap-2 cursor-pointer hover:text-blue-700 ${liked && liked == "Đã thích" ? "text-blue-700 " : "text-gray-600 "}`} onClick={() => likePost()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>

                    {post?.likes}
                  </span></p>
              </div>

              <div className={styles.share}>
                <h1 className='my-auto'><b>Share on:</b> </h1>
                <div>
                  <FacebookShareButton
                    url={`https://my-blog-eight-blush.vercel.app/posts/${id}`} >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <PinterestShareButton
                    media={''}
                    description={"Printerest Long"}
                    url={`https://my-blog-eight-blush.vercel.app/posts/${id}`} >
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                  <RedditShareButton
                    url={`https://my-blog-eight-blush.vercel.app/posts/${id}`} >
                    <RedditIcon size={32} round />
                  </RedditShareButton>
                  <WhatsappShareButton
                    url={`https://my-blog-eight-blush.vercel.app/posts/${id}`} >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>

              {/* end share */}

              {/* <Link href={`/posts/${post?.id}`}><a> <button className={styles.btnDetailPost}>Xem thêm</button></a></Link> */}
            </div>
            <div className={styles.comment}>
              <h2 className='font-bold pb-6  text-left text-lg'>BÌNH LUẬN</h2>
              {/* <p>{post?.comments}</p> */}
              {comments?.map((item: any, index: any) => {
                return (
                  <div className={styles.content} key={index}>
                    <div className={styles.info}>
                      <a ><img src="https://res.cloudinary.com/chanh-thon/image/upload/v1645342604/upload_preset/wkbpd6xv38ugjexk6dri.png" width={40} /></a>
                      <div>
                        <p>{item.user?.name}</p>
                      </div>
                    </div>
                    <div className="content-comment flex justify-between ">
                      <p >{item.content}</p>
                      <p className="float-right my-auto line">{item.createdAt}</p>
                    </div>
                  </div>
                )
              })

              }


              {user.message != "Hết hạn cookie" ?

                <form id="formComment" onSubmit={handleSubmit(onComment)} style={{ border: '1px solid #E8E8E8', backgroundColor: '#E8E8E8', padding: '5px 10px' }}>
                  <input type="text" {...register("content", { required: "Không được để trống" })} id="commentInput" style={{ width: "100%", outline: "none" }} className="shadow-sm border-solid px-2 py-1 w-full mt-1 border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block  rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Comment's here" />
                </form>

                : <p style={{ color: 'red', background: '#ddd', padding: '5px 10px', margin: "24px 0" }}>Đăng nhập để bình luận về sản phẩm này</p>

              }
            </div>

          </div>
          <div className={styles.col1}>

            <div className='mb-8'>
              <Info />
            </div>

            <TopViewPost />

          </div>
        </div>
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