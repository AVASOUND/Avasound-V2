import { Fragment, useEffect, useRef, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  ChipIcon,
  PlayIcon,
  CreditCardIcon,
  DuplicateIcon,
  GlobeAltIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import HeaderItem from '../components/Header/HeaderItem'
import { useRouter } from 'next/router'
import WalletPopover from '../components/Header/WalletPopover'
import HeaderRight from '../components/Header/Right/HeaderRight'

const navigation = [
  { name: 'Discover', href: '#' },
  { name: 'Profile', href: '#' },
  { name: 'Playlist', href: '#' },
  { name: 'Account', href: '#' },
]

export default function AltHeader() {
  const router = useRouter()

  const [walletModal, setWalletModal] = useState(false)
  const dropdownWallet = useRef(null)

  const [auth, setAuth] = useState()

  const { authenticate, isAuthenticated } = useMoralis()

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
    <div>
      <Popover as="header" className="relative">
        <div className="ring-b z-50 flex h-20 w-full flex-row items-center justify-between bg-[#f5f5f5] text-black ring-teal-700">
          <nav
            className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex w-full items-center justify-evenly">
              <div className="flex w-full items-center justify-between text-xs font-semibold tracking-wide md:w-auto">
                <a href="#" className="fixed left-8 flex">
                  <span className="sr-only">Avasound</span>
                  <img className="h-3 w-auto" src="/avasound-blk.svg" alt="" />
                </a>
                <div className="fixed right-8 flex flex-row items-center space-x-4">
                  <HeaderRight />
                </div>
                <div className="-mr-2 md:hidden">
                  <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-transparent text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden w-full items-center justify-evenly space-x-8 md:flex lg:space-x-24">
                <div
                  onClick={openHomepage}
                  className={`cursor-pointer ${
                    router.pathname === '/' ? 'animate-pulse text-teal-700' : ''
                  }`}
                >
                  <HeaderItem title="Discover" Icon={HomeIcon} />
                </div>
                {isAuthenticated ? (
                  <div
                    onClick={openProfile}
                    className={`cursor-pointer ${
                      router.pathname === '/profile'
                        ? 'animate-pulse text-teal-700'
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
                      ? 'animate-pulse text-teal-700'
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
                      walletModal ? 'animate-pulse text-teal-700' : ''
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
            {/* <div className="hidden md:flex md:items-center md:space-x-6">
              <a
                href="#"
                className="flex items-center whitespace-nowrap text-sm font-medium tracking-wide text-black"
              >
                <div className="flex flex-row items-center justify-evenly rounded-full p-1 px-3 ring-1 ring-black">
                  Avalanche
                </div>
              </a>

              <div className="hidden items-center lg:inline-grid">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(user.get('ethAddress'))
                  }}
                  className={` group flex cursor-pointer flex-row items-center justify-center rounded-full p-1 px-3 text-sm font-medium tracking-widest ring-1 ring-black hover:underline active:text-zinc-800`}
                >
                  <p className="">{userEthAdd}</p>
                  <div className="hidden group-active:flex">
                    <DuplicateIcon className="h-3" />
                  </div>
                </div>
              </div>
            </div> */}
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-50 origin-top transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <img
                    className="h-4 w-auto sm:h-10"
                    src="/avasound-blk.svg"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="pt-5 pb-6">
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium tracking-wide text-black hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-6 px-5" onClick={authenticate}>
                  <a
                    href="#"
                    className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
                  >
                    Login with Metamask
                  </a>
                </div>
                <div className="mt-6 px-5">
                  <div className="flex cursor-pointer flex-row items-center justify-center text-center text-base font-medium text-gray-500">
                    <div className="flex flex-row items-center justify-center">
                      <p>Avalanche Network</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
