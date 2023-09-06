import styles from './loading.module.scss'

interface PageProps {
	page: string;
}

const  loadingComponent:React.FC<PageProps> = ({ page }) => {
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
				<p>Charging</p>
				<p>Loading page {page}</p>
			</div>
    </div>
  )
}

export default loadingComponent