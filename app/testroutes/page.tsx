import styles from './loading.module.scss'
import React from 'react'

export default function Loading () {
  return(
    <div className={styles["parent"]}>
      <div className={styles["demo"]}></div>
    </div>
  )
}