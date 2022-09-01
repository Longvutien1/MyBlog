import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from '../styles/Header.module.css'
const Header = () => {
  const [user, setUser] = useState<any>();
  const route = useRouter();
  // const dispatch = useDispatch();
  useEffect(() => {
    // console.log(user.role);
    const userDetail = async () => {
      const  {data}  = await axios.get("/api/auth/signin");
      console.log(data);
      setUser(data)

    }
    userDetail();
  }, [route.pathname])
  const logout= () => {
    const confirm = window.confirm("Bạn có chắc muốn đăng xuất không ?")
    if (confirm) {
      deleteCookie('cookieUser');
      setUser(undefined)
      route.push('/login')
    }
  }
  // console.log(user);
  
  return (
    <div className={styles.header}>
      <ul className={styles.ul}>
        <li className={styles.li}><Link href="/">Trang chủ</Link></li>
        {user?.role == 'ADMIN' ? <li className={styles.li}><Link href="/admin/post">Admin</Link></li> : ""}
      </ul>
      
      <ul className={styles.ul}>
        <li className={styles.li}>Hello {user != null ? user?.name : ""}</li>
        {!user ? <li className={styles.li}><Link href="/login">Đăng nhập</Link></li> : ""} 
        {!user ? <li className={styles.li}><Link href="/register">Đăng kí</Link></li> : ""} 
        {user?.message !== "Hết hạn cookie"  ? <li className={styles.li}><button onClick={() => logout()}>Đăng xuất</button> </li> : ""} 
        
      </ul>
    </div>
  )
}

export default Header