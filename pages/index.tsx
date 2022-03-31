import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import Login from '../src/components/Login'
import Header from '../src/components/Header'
import Liveticker from '../src/components/Liveticker'
import MarketplaceNav from '../src/Test/MarketplaceNav'
import TrendingSection from '../src/Test/TrendingSection'
import MPFeatures from '../src/components/MPFeatures'

const Home: NextPage = () => {
  const { isAuthenticated, user } = useMoralis()

  if (!isAuthenticated) return <Login />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <Head>
        <title>Avasound Market</title>
        <link rel="icon" href="/avso-teal.png" />
      </Head>
      {/* Header Section in App */}
      <Header />
      {/* Navigation Section for Marketplace */}
      <MarketplaceNav />
      {/* Add Selling Right Now Section */}
      <TrendingSection />
      {/* Featured on the Frontpage */}
      <MPFeatures />

      <footer className="flex h-24 w-full items-center justify-center border-t">
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
      </footer>
    </div>
  )
}

export default Home
