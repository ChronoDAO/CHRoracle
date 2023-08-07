import Link from "next/link";
import navbar from './navbar.module.scss'


const nav = () => {
    return (
<nav id={navbar.navbar}>
      <div className={navbar.navContainer}>
        <div className="logo">Hello Home!</div>
        <ul className={navbar.linksList}>
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
            <Link href="/3dgraph">Go to Force Graph</Link>
          </li>
        </ul>
      </div>
    </nav>
    );
};

export default nav;