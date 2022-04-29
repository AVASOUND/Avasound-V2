import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import Login from '../src/components/Login'
import Header from '../src/components/Header/Header'
import MarketNav from '../src/components/Market/MarketNav'
import TrendingSection from '../src/Test/TrendingSection'
import AltHeader from '../src/Test/AltHeader'
import Features from '../src/components/Market/Features'
import AudioPlayer from '../src/components/Footer/AudioPlayer'

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
      <div className="sticky top-0 z-50 w-full shadow-lg">
        <AltHeader />
      </div>
      {/* Navigation Section for Marketplace */}
      {/* <div className="sticky top-16 z-30 w-full">
        <MarketNav />
      </div> */}
      {/* Add Selling Right Now Section */}
      <section className="mt-8 flex w-full items-center justify-center rounded-lg bg-white shadow-xl xl:w-9/12 ">
        <TrendingSection />
        {/* Featured on the Frontpage */}
      </section>
      <section className="mt-8 flex w-full items-center justify-center rounded-lg bg-white shadow-xl xl:w-9/12 ">
        <Features />
      </section>

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
      <AudioPlayer />
    </div>
  )
}

export default Home
