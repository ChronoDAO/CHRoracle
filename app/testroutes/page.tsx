import styles from './loading.module.scss'
import React from 'react'

export default function Loading () {
  return(
    <div className={styles["loading"]}>
			<div className={styles["hourglassBackground"]}>
				<div className={styles["hourglassContainer"]}>
					<div className={styles["hourglassCurves"]}></div>
					<div className={styles["hourglassCapTop"]}></div>
					<div className={styles["hourglassGlassTop"]}></div>
					<div className={styles["hourglassSand"]}></div>
					<div className={styles["hourglassSandStream"]}></div>
					<div className={styles["hourglassCapBottom"]}></div>
					<div className={styles["hourglassGlass"]}></div>
				</div>
			</div>
			<div className={styles["text-container"]}>
				<p>Chargement en cours</p>
			</div>
    </div>
  )
}