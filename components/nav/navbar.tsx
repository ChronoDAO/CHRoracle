'use client'
import Link from "next/link";
import styles from "./navbar.module.scss";
import { MdOutlineSpaceDashboard, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LiaDragonSolid } from "react-icons/lia";
import { HiUsers, HiUserCircle } from "react-icons/hi";
import { GiAxeSword } from "react-icons/gi";
import { BiSolidCastle } from "react-icons/bi";
import { useState } from "react";
import { useSession } from "next-auth/react";


const nav = () => {
  const [isBarCollapsed, setIsBarCollapsed] = useState(true);

  const toggleSideBarHandler = () => {
    setIsBarCollapsed((prev) => !prev)
  }

  const session = useSession()

  return (
    <div className={styles["sidebar-wrapper"]} data-collapse={isBarCollapsed} >
      <button className={styles.btn} onClick={toggleSideBarHandler }>
        <MdOutlineKeyboardArrowLeft/>
      </button>
      <aside className={styles.sidebar} id="navbar">
        <div className={styles["top-sidebar"]} onClick={toggleSideBarHandler }>
          <span className={styles.logo}><LiaDragonSolid size={36}/></span>
          <span className={styles.title}>Chrono Data</span>
        </div>

        <div className={styles["list-container"]}>
          <ul className={styles["list-items"]}>
            <Link href="/" className={styles.links}>
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <BiSolidCastle />
                </span>
                <span className={styles["item-title"]}>home</span>
              </li>
            </Link>

            <Link href="/dashboard" className={styles.links}>
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <MdOutlineSpaceDashboard />
                </span>
                <span className={styles["item-title"]}>Dashboard</span>
              </li>
            </Link>
            <Link href="/users" className={styles.links}>
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <HiUsers />
                </span>
                <span className={styles["item-title"]}>Users</span>
              </li>
            </Link>
            <Link href="/items" className={styles.links}>
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <GiAxeSword />
                </span>
                <span className={styles["item-title"]}>Items</span>
              </li>
            </Link>
            {/* <LoginButton />
            <LogoutButton /> */}
            {/* { session ? (
              <>
              <Link href="/api/auth/signout" className={styles.links}>
                <li className={styles.item}>
                  <span className={styles["item-icon"]}>
                    <HiUserCircle />
                  </span>
                  <span className={styles["item-title"]}>Log out !</span>
                </li>
              </Link>
            </>
            ) : (
              <>
                <Link href="/api/auth/signin" className={styles.links}>
                  <li className={styles.item}>
                    <span className={styles["item-icon"]}>
                      <HiUserCircle />
                    </span>
                    <span className={styles["item-title"]}> Log in </span>
                  </li>
                </Link>
              </>
            )} */}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default nav;

// HiUserCircle