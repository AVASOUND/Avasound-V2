import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import HeroLanding from '../src/Test/HeroLanding'
import LandingTest from '../src/Test/LandingTest'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroLanding />
      {/* <LandingTest /> */}
    </div>
  )
}

export default Home
