import {
  ChipIcon,
  CreditCardIcon,
  DuplicateIcon,
  GlobeAltIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import HeaderItem from './HeaderItem'
import { useState, useEffect, useRef } from 'react'
import { useMoralis } from 'react-moralis'
import WalletPopover from './WalletPopover'

export default function Header() {
  const router = useRouter()

  const [walletModal, setWalletModal] = useState(false)
  const dropdownWallet = useRef(null)

  const [auth, setAuth] = useState()

  const { authenticate, user, isAuthenticated } = useMoralis()
  const [userEthAdd, setUserEthAdd] = useState('')

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (isAuthenticated) {
      setAuth(true)
      if (user) {
        setUserEthAdd(
          user.get('ethAddress').slice(0, 4).concat('...') +
            user.get('ethAddress').slice(38, 42)
        )
      }
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
    <header className="sticky top-0 z-50 flex w-full flex-row items-center">
      <div className="fixed ml-8 hidden items-center lg:inline-grid">
        <Image src="/avasound-white.svg" width={100} height={25} />
      </div>
      <div className="fixed right-8 mr-8 flex flex-row  items-center justify-evenly space-x-4">
        <div className="hidden items-center lg:inline-grid">
          <div className="flex flex-row items-center justify-center rounded-full p-1 px-3 text-sm font-medium tracking-widest text-white ring-1 ring-white">
            <p>Avalanche</p>
          </div>
        </div>
        <div className="hidden items-center lg:inline-grid">
          <div
            onClick={() => {
              navigator.clipboard.writeText(user.get('ethAddress'))
            }}
            className={`group flex cursor-pointer flex-row items-center justify-center rounded-full p-1 px-3 text-sm font-medium tracking-widest text-white ring-1 ring-white hover:underline active:text-teal-400`}
          >
            <p>{userEthAdd}</p>
            <div className="hidden group-active:flex">
              <DuplicateIcon className="h-3" />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex h-20 w-full flex-row items-center justify-center border-b-2 border-teal-500 bg-black text-white shadow-xl">
        <div className="flex w-11/12 flex-row items-center justify-evenly lg:w-6/12">
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
            <HeaderItem title="Playlist" Icon={GlobeAltIcon} />
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
