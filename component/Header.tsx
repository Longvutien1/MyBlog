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
    // const userDetail = async () => {
    //   const { payload } = await dispatch(getUser())
    //   console.log(payload);
    //   setUser(payload)

    // }
    // userDetail();
  }, [])
  const logout= () => {
    const confirm = window.confirm("Bạn có chắc muốn đăng xuất không ?")
    if (confirm) {
       getCookie("cookieUser");
      localStorage.removeItem("user");
      deleteCookie('cookieUser');
      route.push('/login')
    }
  }
  return (
    <div className={styles.header}>
      <ul className={styles.ul}>
        <li className={styles.li}><Link href="/">Trang chủ</Link></li>
        {/* {user?.role == 'ADMIN' ? <li className={styles.li}><Link href="/admin/post">Admin</Link></li> : ""} */}
        <li className={styles.li}><Link href="/admin/post">Admin</Link></li>
      </ul>
      <ul className={styles.ul}>
        <li className={styles.li}>Hello {user != null ? user?.name : ""}</li>
        {/* {!user ? <li className={styles.li}><Link href="/login">Đăng nhập</Link></li> : ""} 
        {!user ? <li className={styles.li}><Link href="/register">Đăng kí</Link></li> : ""} 
        {user ? <li className={styles.li}><button onClick={() => logout()}>Đăng xuất</button> </li> : ""}  */}
         <li className={styles.li}><Link href="/login">Đăng nhập</Link></li>
         <li className={styles.li}><Link href="/register">Đăng kí</Link></li>
         <li className={styles.li}><button onClick={() => logout()}>Đăng xuất</button> </li> 
      </ul>
    </div>
  )
}

export default Header