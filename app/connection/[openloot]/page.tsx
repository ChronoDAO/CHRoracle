import AddNameComponent from "@/components/Add/AddName";
import styles from "./page.module.scss";

export default function Connection() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MY ACCOUNT</h1>
      <div className={styles.userList}>
        <AddNameComponent />
      </div>
    </div>
  );
}
