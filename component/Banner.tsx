/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image';
import styles from '../styles/Banner.module.css'
const Banner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
               
                <h1>Welcome To My Blog</h1>
            </div>
        </div>
    )
}

export default Banner

