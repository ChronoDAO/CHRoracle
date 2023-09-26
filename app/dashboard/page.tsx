import styles from './dashboard.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/prisma/auth';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className={styles["center-title"]}>
      <h1>Work in Progress </h1>
    </div>
  )
}