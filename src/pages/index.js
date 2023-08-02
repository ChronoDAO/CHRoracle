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
          <Link href="/materialtable">
            Go to Material Table
          </Link>
        </li>
      </ul>
    </div>
  );
}
