import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../component/Layout/admin'
import { getUser } from '../../../features/user/userSlice'
import styles from '../../../styles/Post.module.css'
// import { getUser } from '../../features/user/userSlice'
type FormInput = {
    title: string,
    userId: number,
    comments: string,
    categoryPost: string
}

const AddPost = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((item: any) => item.user.value)
    // console.log(user);

    useEffect(() => {
        const userDetail = async () => {
            const { payload } = await dispatch(getUser())
            console.log(payload);
            // setUser(payload)

        }
        userDetail();
    }, [])
    const onSubmit = async (value: any) => {
        console.log(value);
        const { data } = await axios.post("http://localhost:3000/api/post/", { ...value, userId: user?.id })
        if (data) {
            alert("Thêm thành công")
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

                <button>Thêm </button>
            </form>

        </div>
    )
}
AddPost.Layout = AdminLayout
export default AddPost