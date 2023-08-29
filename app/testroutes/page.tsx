import styles from './loading.module.scss'
import React from 'react'

export default function Loading () {
  return(
    <div className={styles["loading"]}>
			<div className={styles["pyramid-loader"]}>
				<div className={styles["wrapper"]}>
					<span className={styles["side side1"]}></span>
					<span className={styles["side side2"]}></span>
					<span className={styles["side side3"]}></span>
					<span className={styles["side side4"]}></span>
					<span className={styles["shadow"]}></span>
				</div>
			</div>
			<div className={styles["text-container"]}>
				<p>Chargement en cours</p>
			</div>
    </div>
  )
}