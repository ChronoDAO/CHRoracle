'use client'
import Link from "next/link";
import styles from "./navbar.module.scss";
import { MdOutlineSpaceDashboard, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LiaDragonSolid } from "react-icons/lia";
import { HiUsers } from "react-icons/hi";
import { GiAxeSword } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";
import { BiSolidCastle } from "react-icons/bi";
import { RiNftFill } from "react-icons/ri";

import { useState } from "react";


const nav = () => {
  const [isBarCollapsed, setIsBarCollapsed] = useState(true);

  const toggleSideBarHandler = () => {
    setIsBarCollapsed((prev) => !prev)
  }

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
            <Link href="/3dgraph" className={styles.links}>
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <VscGraph />
                </span>
                <span className={styles["item-title"]}>Graph</span>
              </li>
            </Link>

            <Link href="/nft" className={styles.links}>
            <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <RiNftFill/>
                </span>
                <span className={styles["item-title"]}>NFT</span>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default nav;
