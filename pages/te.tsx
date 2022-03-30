import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Testimonial from '../src/Test/Testimonial'
import LandingTest from '../src/Test/LandingTest'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Testimonial /> */}
      <LandingTest />
    </div>
  )
}

export default Home
