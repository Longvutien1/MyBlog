import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminLayout from '../../../component/Layout/admin';
import styles from '../../../styles/Post.module.css'
type FormInput = {
  title: string,
  userId: number,
  comments: string,
  categoryPost: string
}
const DetailPost = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
  const router = useRouter(); 
  const { id } = router.query;
  // console.log(id);
  useEffect(() => {
    if (id) {
      const getPostById = async (id: number) => {
        const { data } = await axios.get(`http://localhost:3000/api/post/${id}`)
        console.log("data post: ", data);
        reset(data)
      }
      getPostById(Number(id));
    }
  }, [])

  const onSubmit = async (value: any) => {
    console.log(value);
    const  {data} = await axios.patch(`http://localhost:3000/api/post/${id}`, { title:value.title, comments: value.comments,categoryPost:value.categoryPost  })
    if (data) {
      console.log(data);
      
      alert("Sửa thành công")
      router.push("/admin/post")
    }
  }

  return (
    <div className={styles.form}>
      <h2 className='text-2xl font-bold my-8'>Thêm bài viết</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="title">Tiêu đề:</label><br />
        <input type="text" id="title"  {...register("title", { required: "Không được để trống!" })} /><br />
        {errors.title?.message && <span style={{ color: "Red" }}>{errors.title?.message}</span>}

        <p>
          <label htmlFor="comments">Comment:</label><br />
          <input type="text" id="comments" {...register("comments", { required: "Không được để trống!" })} /><br />
          {errors.comments?.message && <span style={{ color: "Red" }}>{errors.comments?.message}</span>}
        </p>
        <p>
          <label htmlFor="categoryPost">Chọn loại bài viết:</label>
          <select id="categoryPost"  {...register("categoryPost", { required: "Không được để trống!" })}>

            <option value="Thiên nhiên">Thiên nhiên</option>
            <option value="Thể thao">Thể thao</option>
            <option value="Giáo dục">Giáo dục</option>
            <option value="Tin tức">Tin tức</option>
          </select>
          {errors.categoryPost?.message && <span style={{ color: "Red" }}>{errors.categoryPost?.message}</span>}
        </p>

        <button>Sửa </button>
      </form>

    </div>
  )
}
DetailPost.Layout = AdminLayout
export default DetailPost