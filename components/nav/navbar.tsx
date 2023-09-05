"use client";
import Link from "next/link";
import styles from "./navbar.module.scss";
import {
  MdOutlineSpaceDashboard,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { LiaDragonSolid } from "react-icons/lia";
import { HiUsers } from "react-icons/hi";
import { GiAxeSword } from "react-icons/gi";
import { BiSolidCastle, BiSearchAlt } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";

const nav = () => {
  const [isBarCollapsed, setIsBarCollapsed] = useState(true);

  const toggleSideBarHandler = () => {
    setIsBarCollapsed((prev) => !prev);
  };

  return (
    <div className={styles["sidebar-wrapper"]} data-collapse={isBarCollapsed}>
      <button className={styles.btn} onClick={toggleSideBarHandler}>
        <MdOutlineKeyboardArrowLeft />
      </button>
      <aside className={styles.sidebar} id="navbar">
        <div className={styles["top-sidebar"]} onClick={toggleSideBarHandler}>
          <span className={styles.logo}>
            <LiaDragonSolid size={36} />
          </span>
          <span className={styles.title}>Chrono Data</span>
        </div>

        <div className={styles["list-container"]}>
          <ul className={styles["list-items"]}>
            <Link href="/">
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <BiSolidCastle />
                </span>
                <span className={styles["item-title"]}>home</span>
              </li>
            </Link>

            <Link href="/dashboard">
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <MdOutlineSpaceDashboard />
                </span>
                <span className={styles["item-title"]}>Dashboard</span>
              </li>
            </Link>

            <Link href="/users">
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <HiUsers />
                </span>
                <span className={styles["item-title"]}>Users</span>
              </li>
            </Link>

            <Link href="/items">
              <li className={styles.item}>
                <span className={styles["item-icon"]}>
                  <GiAxeSword />
                </span>
                <span className={styles["item-title"]}>Items</span>
              </li>
            </Link>

            <li className={styles.item}>
              <span className={styles["item-icon"]}>
                <BiSearchAlt2 />
              </span>
              {!isBarCollapsed && (
                <>
                  <input
                    type="text"
                    placeholder="Search..."
                    className={styles["search-input"]}
                  />
                  <Link href="/searchresult" className={styles.links}>
                    <button className={styles["search-btn"]}>
                    <BiSearchAlt2 />
                    </button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default nav;
