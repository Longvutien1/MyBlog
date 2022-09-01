/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styles from '../styles/ListPost.module.css'
import Image from 'next/image';
import my from '../asset/image/longHaNoiMoi.jpg'
const Info = () => {
    return (
        <div className='bg-white mb-8'>
            <Image className={styles.avatar}
                src={my}
            >
            </Image>
            {/* <h1>Longchanhf thôn</h1> */}
            <div className=' py-4 pb-8 text-center'>
                <p> <b>VU TIEN LONG</b></p>
                <p>Frontend Developer</p>
                <p>05/02/2002</p>
                <p> Phu Xuyen, Ha Noi</p>

                <p> <a href="">facebook.com/longvt02</a></p>
            </div>
        </div>
    )
}

export default Info