import axios from 'axios'
import Link from 'next/link'
import { type } from 'os'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../component/Layout/admin'
import { getPostList } from '../../../serviceClient/post'
import styles from '../../../styles/Post.module.css'
import { PostType } from '../../../type/types'
type FormInputs = {
  title: string,

}
const ListPost = () => {
  const dispatch = useDispatch();
  // const listPost = useSelector((item: any) => item.post.value)
  const [listPost, setListPost] = useState<any>([]);
  const [pageNow, setPageNow] = useState<number>(0);
  const [mang, setMang] = useState<any>({page:0, title:"undefined", categoryPost:"undefined"});

  const { register, handleSubmit } = useForm<FormInputs>();

  useEffect(() => {
    const list = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/post`)

      setListPost(data)
    }
    list();
    // dispatch(getListPost(0))
  }, [])

  const removePost = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa bài viết này không ?")
    if (confirm) {
      const { data } = await axios.delete(`http://localhost:3000/api/post/${id}`)
      // console.log(data);
      alert(data.message)
      // dispatch(getListPost(0))
    }
  }

  // page
  const changePage = async (index: number) => {
     setPageNow(index)
    mang.page = index
    setMang({...mang})
    console.log(mang);
    const { data } = await getPostList(mang);
    setListPost(data)
  }


  const changeColor = () => {
    return "className='bg-red-500'"
  }


  const onSubmit: SubmitHandler<FormInputs> = async (value: FormInputs) => {
    mang.title = value.title
    // console.log(mang);
    mang.page = 0
    setMang({...mang})  
        const { data } = await getPostList(mang);
        console.log(data.listPost);       
        setListPost(data)

  }

  const changeName = async (categoryPost: any) => {
    mang.page = 0
    mang.categoryPost = categoryPost
    setMang({...mang})
    const { data } = await getPostList(mang);  
    setListPost(data)

  }

  let mangCount = [];
  for (let i = 0; i < listPost.count / 3; i++) {
  // console.log(i);
  mangCount.push(i)
  }
  console.log(mangCount);
  
  

  return (

    <div>
      <section className={styles.container} >
        <div className={styles.headerPost}>
          <Link href="/admin/post/add" ><button className={styles.linkAdd}>Thêm bài viết mới</button></Link>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.inputSearch} >
            <input type="search" {...register("title")} placeholder='Search here...' />
            <button>Search</button>
          </form>

        </div>
        <table className={styles.customers} >
          <tbody className='text-center'>
            <tr>
              <th>STT</th>
              <th>Tiêu đề</th>
              <th className='flex space-x-2 justify-between'><span>Loại bài viết</span>
                <form>
                  <select id="categoryPost" name="categoryPost" onChange={(e) => changeName(e.target.value)} defaultValue={'Tất cả'} className={styles.selectCate} >
                    <option value="Tất cả" key={1}>Tất cả</option>
                    <option value="Thiên nhiên" >Thiên nhiên</option>
                    <option value="Thể thao">Thể thao</option>
                    <option value="Giáo dục">Giáo dục</option>
                    <option value="Tin tức">Tin tức</option>
                  </select>
                </form>
              </th>
              <th>Người đăng bài</th>
              <th>Comments</th>
              <th>Lượt xem</th>
              <th>Thích</th>
              <th>Hành động</th>
            </tr>
            {listPost?.listPost?.map((item: PostType, index: number) => {
              return (<tr key={index + 1}>
                <td>{index + 1}</td>
                <td  style={{maxWidth:"200px"}}>{item.title}</td>
                <td>{item.categoryPost}</td>
                <td>{item.user.name}</td>
                <td style={{maxWidth:"300px", textAlign:"left"}}>{item.comments}</td>
                <td>{item.views}</td>
                <td>{item.likes}</td>
                <td className='space-x-4 text-center'>
                  <button className='bg-yellow-400 px-4 py-1 rounded'>  <Link href={`/admin/post/${item.id}`} >Sửa</Link></button>
                  <button className='bg-red-500 px-4 py-1 rounded' onClick={() => removePost(Number(item.id))}>Xóa</button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>

        <div className={styles.page}>
          <div className={`pre ${pageNow == 0 ? "hidden" : ""}`} onClick={() => changePage(Number(pageNow) - 1)} > Pre</div>
          {mangCount?.map((item: Number, index: number) => {
            if (index -1 < Number(listPost.count / 3)) {
              return (<p key={index} onChange={changeColor} onClick={() => changePage(index)}>{index + 1}</p>)
            }
          })
          }
      
          <div className={`next ${pageNow + 1 >=  Number(listPost.count / 3) ? "hidden" : ""}`} onClick={() => changePage(Number(pageNow) + 1)}> Next </div>
        </div>

      </section>
    </div>
  )
}
ListPost.Layout = AdminLayout
export default ListPost