import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>Hello Home!</p>
      <ul>
        <li>
          {/* Link to the /dashboard page */}
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </li>
        <li>
          {/* Link to the /materialtable page */}
          <Link href="/users">
            Go to Users List
          </Link>
        </li>
        <li>
          {/* Link to the /materialtable page */}
          <Link href="/items">
            Go to Items List
          </Link>
        </li>
        <li>
          {/* Link to the /materialtable page */}
          <Link href="/3dgraph">
            Go to Force Graph
          </Link>
        </li>
      </ul>
    </div>
  );
}
