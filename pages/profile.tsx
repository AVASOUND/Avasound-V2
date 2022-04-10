import type { NextPage } from 'next'
import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Login from '../src/components/Login'
import Header from '../src/components/Header/Header'
import ProfilePage from '../src/components/Profile/ProfilePage'

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis()

  // if (!isAuthenticated) return <Login />

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Head>
        <title>AVSO Profile</title>
        <link rel="icon" href="/avso-teal.png" />
      </Head>
      {/* Header Section App */}
      <Header />
      {/* Profile Section */}
      <ProfilePage />

      {/* <footer className="flex h-12 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/avasound-blk.svg"
            alt="Vercel Logo"
            width={72}
            height={16}
          />
        </a>
      </footer> */}
    </div>
  )
}

export default Home
