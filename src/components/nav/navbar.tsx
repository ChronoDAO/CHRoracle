import Link from "next/link";
import navbar from "./navbar.module.scss";

const nav = () => {
  return (
    <nav id={navbar.navbar}>
      <div className={navbar.navContainer}>
        <Link href="/" className={navbar.links}>
          <div className="logo">Home!</div>
        </Link>
        <ul className={navbar.linksList}>
          <li>
            {/* Link to the /dashboard page */}
            <Link href="/dashboard" className={navbar.links}>
              {" "}
              Dashboard
            </Link>
          </li>
          <li>
            {/* Link to the /materialtable page */}
            <Link href="/users" className={navbar.links}>
              Users{" "}
            </Link>
          </li>
          <li>
            {/* Link to the /materialtable page */}
            <Link href="/items" className={navbar.links}>
              Items
            </Link>
          </li>
          <li>
            {/* Link to the /materialtable page */}
            <Link href="/nft" className={navbar.links}>
              NFT
            </Link>
          </li>
          <li>
            {/* Link to the /materialtable page */}
            <Link href="/3dgraph" className={navbar.links}>
              Force Graph
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default nav;
