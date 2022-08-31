/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react'
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getCsrfToken } from "next-auth/react"
type FormInputs = {
    email: string,
    password: string,
}

const fromSchema = yup.object().shape({

    email: yup
        .string()
        .required("Không được để trống email"),
    password: yup
        .string()
        .required("Không được để trống mật khẩu")
        .min(6, "Mật khẩu quá ngắn"),


});
const validation = { resolver: yupResolver(fromSchema) };

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>(validation);
    const route = useRouter();
    const onSubmit: SubmitHandler<FormInputs> = async (value) => {
        console.log(value);
        
        const { data } = await axios.post("/api/auth/signin", {
            email: value.email,
            password: value.password,
        });

        if (data.message) {
            alert(data.message)
            if (data.message == "Đăng nhập thành công") {
                // console.log(data);
                // localStorage.setItem("user", JSON.stringify(data))
                route.push("/")
            }
        }

        console.log("data:loginpage: ", data);

    }
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>

                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="  space-y-5">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input id="email-address" {...register("email", { required: "Không được để trống email", minLength: 6 })} type="email" autoComplete="email" className="appearance-none shadow-sm rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            {errors.email?.message && <span style={{ color: "Red" }}>{errors.email?.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mật khẩu</label>
                            <input id="password"  {...register("password", { required: "Không được để trống mật khẩu" })} type="password" autoComplete="current-password" className="appearance-none shadow-sm rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            {errors.password?.message && <span style={{ color: "Red" }}>{errors.password?.message}</span>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* Heroicon name: solid/lock-closed */}
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login

