import Navbar from "../components/nav/navbar";
import type { Metadata } from 'next'
import "../styles/globals.scss";


export const metadata: Metadata = {
  title: 'Chrono App',
  description: 'A ChronoDAO App to analyze the Big Time marketplace.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Navbar />
      {children}</body>
    </html>
  )
}
