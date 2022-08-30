import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'
const Header = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const user = localStorage.getItem("user") ? JSON.parse(String(localStorage.getItem("user"))) : null
    // console.log(user);
    
    setUser(user)
  }, [])
  return (
    <div className={styles.header}>
      <ul className={styles.ul}>
        <li className={styles.li}><Link href="/">Trang chủ</Link></li>
        {user != null ? <li className={styles.li}><Link href="/admin/post">Admin</Link></li> : ""}
        <li className={styles.li}><Link href="/login">Đăng nhập</Link></li>
        <li className={styles.li}><Link href="/register">Đăng kí</Link></li>
      </ul>
      <p className='text-white'>Hello {user != null ? user?.name : ""}</p>
    </div>
  )
}

export default Header