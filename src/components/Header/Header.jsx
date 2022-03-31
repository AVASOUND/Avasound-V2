import {
  ChipIcon,
  CreditCardIcon,
  GlobeAltIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import HeaderItem from './HeaderItem'
import { useState, useEffect, useRef } from 'react'
import { useMoralis } from 'react-moralis'
import WalletPopover from '../../Test/WalletPopover'

export default function Header() {
  const router = useRouter()

  const [walletModal, setWalletModal] = useState(false)
  const dropdownWallet = useRef(null)

  const [auth, setAuth] = useState()

  const { authenticate, logout, isAuthenticated } = useMoralis()

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (isAuthenticated) {
      setAuth(true)
    } else {
      setAuth(false)
    }
    if (!walletModal) return
    function handleClick(event) {
      if (
        dropdownWallet.current &&
        !dropdownWallet.current.contains(event.target)
      ) {
        setWalletModal(false)
      }
    }
    window.addEventListener('click', handleClick)
    // clean up
    return () => window.removeEventListener('click', handleClick)
  }, [walletModal, isAuthenticated])

  function openHomepage() {
    router.push('/')
  }

  function openCommunity() {
    router.push('/community')
  }
  function openProfile() {
    router.push('/profile')
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className=" flex h-20 w-full flex-row items-center border-b-2 border-teal-500 bg-black text-white shadow-xl">
        <div className="fixed ml-8 hidden lg:inline-grid">
          <Image src="/avasound-white.svg" width={100} height={25} />
        </div>
        <div className="my-1 ml-4 flex w-full flex-row justify-evenly">
          <div
            onClick={openHomepage}
            className={`cursor-pointer ${
              router.pathname === '/' ? 'animate-pulse text-teal-300' : ''
            }`}
          >
            <HeaderItem title="Discover" Icon={HomeIcon} />
          </div>
          {isAuthenticated ? (
            <div
              onClick={openProfile}
              className={`cursor-pointer ${
                router.pathname === '/profile'
                  ? 'animate-pulse text-teal-300'
                  : ''
              }`}
            >
              <HeaderItem title="Profile" Icon={ChipIcon} />
            </div>
          ) : (
            ''
          )}

          <div
            onClick={openCommunity}
            className={`cursor-pointer ${
              router.pathname == '/community'
                ? 'animate-pulse text-teal-300'
                : ''
            }`}
          >
            <HeaderItem title="Community" Icon={GlobeAltIcon} />
          </div>
          {auth ? (
            <div
              //   onClick={() => setWalletModal((b) => !b)}
              // onClick={logout}
              className={`cursor-pointer ${
                walletModal ? 'animate-pulse text-teal-300' : ''
              }`}
            >
              {/* <HeaderItem title="Wallet" Icon={CreditCardIcon} /> */}
              <WalletPopover />
            </div>
          ) : (
            <div
              onClick={authenticate}
              className={`
          }`}
            >
              <HeaderItem title="Login" Icon={CreditCardIcon} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
