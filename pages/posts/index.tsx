/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PostType } from '../../type/types';
import styles from '../../styles/ListPost.module.css'
import Link from 'next/link';
import LayoutClient from '../../component/Layout';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, GetStaticProps } from 'next';

import { getPostList } from '../../serviceClient/post';
import Info from '../../component/Info';
import TopViewPost from '../../component/TopViewPost';
type PostProps = {
    posts: PostType
}
const ListPostHomePage = () => {
    const [listPost, setListPost] = useState<any>([]);
    const [pageNow, setPageNow] = useState<number>(0);
    const [mang, setMang] = useState<any>({ page: 0, title: "undefined", categoryPost: "undefined" });
    // if (posts) {
    //     console.log(posts);

    // }
    const fetchData = async () => {
        // const { data } = await axios.get(`/api/post?allPost=1`)
        const { data } = await axios.get(`/api/post`)

        console.log(data.listPost);

        setListPost(data)
    }

    useEffect(() => {

        fetchData();

        // dispatch(getListPost(0))
    }, [])

    let mangCount = [];
    for (let i = 0; i < listPost.count / 3; i++) {
        // console.log(i);
        mangCount.push(i)
    }
    console.log(mangCount);

    // page
    const changePage = async (index: number) => {
        setPageNow(index)
        mang.page = index
        setMang({ ...mang })
        console.log(mang);
        const { data } = await getPostList(mang);
        setListPost(data)
    }

    return (
        <div className='bg-[#F7F7F7]'>
            <div className={styles.container}>
                <NextSeo
                    title='Danh sách sản phẩm'
                    description="A short description goes here."
                    key={'MyBlog'}
                />

                <div className={styles.row}>

                    <div className={styles.col3}>
                        {listPost?.listPost?.map((item: PostType, index: Number) => {
                            return (
                                <div key={Number(index)} className={styles.col} >

                                    <p className={styles.title}> {item.title}</p>
                                    <h2 className={styles.categoryPost}> Loại bài viết / {item.categoryPost}</h2>
                                    <img src="https://picsum.photos/1000/600" width={"100%"} alt="" />
                                    <p className={styles.contentPost}>{item.content}</p>
                                    <div className={styles.tacGiaAndViews}>
                                        <p >Tác giả: {item.user.name} </p>

                                        <p className='flex gap-8'>
                                            <span className='flex gap-2 text-red-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>

                                                {item.views}
                                            </span>
                                            <span className='flex gap-2 text-blue-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                                </svg>

                                                {item.likes}
                                            </span></p>
                                    </div>

                                    <Link href={`/posts/${item.id}`}><a> <button className={styles.btnDetailPost}>Xem thêm</button></a></Link>
                                </div>
                            )
                        })}
                        <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                            id='pagination'
                        >
                            {/* <Link href={'/'}> */}
                                <a className={`${pageNow == 0 ? "hidden" : ""} relative inline-flex items-center  cursor-pointer px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                    onClick={() => changePage(Number(pageNow) - 1)}
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            {/* </Link> */}

                            {mangCount?.map((item: any, index: number) => {
                                // console.log(item);

                                return (
                                    // <Link href={'/'} key={index}>
                                        <a key={index}
                                            className={`${pageNow === index
                                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                                } relative inline-flex items-center px-4 py-2 border text-sm font-medium font-semibold cursor-pointer`}
                                            onClick={() => changePage(index)}
                                        >
                                            {index + 1}
                                        </a>
                                   // </Link>
                                )
                            })}
                            {/* <Link href={'/'} > */}
                                <a className={`${pageNow + 1 >= Number(listPost.count / 3) ? "hidden" : ""} relative inline-flex items-center  cursor-pointer px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                                    onClick={() => changePage(Number(pageNow) + 1)}
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            {/* </Link> */}
                        </nav>
                    </div>

                    {/* end col3 */}


                    <div className={styles.col1}>
                       
                        <Info/>

                        <TopViewPost/>

                    </div>


                </div>
            </div>
        </div>
    )
}



// export const getStaticProps: GetStaticProps<PostProps> = async () => {

//     const { data } = await axios.get(`/api/post?allPost=1`)
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
