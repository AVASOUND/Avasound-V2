import type { NextPage } from 'next'
import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Login from '../src/components/Login'
import Header from '../src/components/Header/Header'
import PlaylistPage from '../src/components/Playlist/PlaylistPage'
import AudioPlayer from '../src/components/Footer/AudioPlayer'
import Image from 'next/image'

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis()

  if (!isAuthenticated) return <Login />

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Head>
        <title>AVSO Profile</title>
        <link rel="icon" href="/avso-teal.png" />
      </Head>
      {/* Header Section App */}
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      {/* Profile Section */}
      <section className="mt-8 flex w-full items-center justify-center rounded-lg bg-white shadow-xl xl:w-9/12 ">
        <PlaylistPage />
      </section>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
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
      <AudioPlayer />
    </div>
  )
}

export default Home
