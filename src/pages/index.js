<<<<<<< HEAD
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Hello Home!</p>
      <ul>
        <li>
          {/* Link to the /dashboard page */}
          <Link href="/dashboard">Go to Dashboard</Link>
        </li>
        <li>
          {/* Link to the /materialtable page */}
          <Link href="/users">Go to Users List</Link>
        </li>
        <li>
          {/* Link to the /materialtable page */}
          <Link href="/items">Go to Items List</Link>
        </li>
        <li>
          {/* Link to the /materialtable page */}
          <Link href="/nft">Go to User's Nft</Link>
        </li>
      </ul>
    </div>
  );
}
=======
import styles from './home.module.scss'

const Home = () => {
  return <>
  <div className={styles.home}>
  Work in progress !
  </div>
  </>;
};

export default Home;
>>>>>>> 27ae3bae74e75e5c54f91130517685d0ddb4b931
