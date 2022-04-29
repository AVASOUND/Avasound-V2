import { useEffect, useRef, useState } from 'react'
import { Popover } from '@headlessui/react'
import { ChipIcon, PlayIcon, GlobeAltIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import HeaderItem from './HeaderItem'
import { useRouter } from 'next/router'
import HeaderRight from './Right/HeaderRight'

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

  const { authenticate, isAuthenticated } = useMoralis()

  useEffect(() => {
    // only add the event listener when the dropdown is opened

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
    router.push('/playlist')
  }
  function openProfile() {
    router.push('/profile')
  }

  return (
    <div>
      <Popover as="header" className="relative">
        <div className="ring-b z-50 flex h-20 w-full flex-row items-center justify-between bg-[#f5f5f5] text-black shadow-md ring-teal-700">
          <nav
            className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex w-full items-center justify-evenly">
              <div className="flex w-full items-center justify-between text-xs font-semibold tracking-wide md:w-auto">
                <a href="#" className="fixed left-8 hidden sm:flex">
                  <span className="sr-only">Avasound</span>
                  <img className="h-3 w-auto" src="/avasound-blk.svg" alt="" />
                </a>
                <a href="#" className="fixed left-8 flex sm:hidden">
                  <span className="sr-only">Avasound</span>
                  <Image
                    src={'/avso-logo.png'}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                </a>
                <div className="fixed right-8 flex flex-row items-center space-x-4">
                  <HeaderRight />
                </div>
              </div>
              <div className="flex w-full items-center justify-evenly space-x-8 lg:space-x-24">
                <div
                  onClick={openHomepage}
                  className={`cursor-pointer ${
                    router.pathname === '/' ? 'animate-pulse text-teal-700' : ''
                  }`}
                >
                  <HeaderItem title="Discover" Icon={GlobeAltIcon} />
                </div>

                <div
                  onClick={openCommunity}
                  className={`cursor-pointer ${
                    router.pathname == '/community'
                      ? 'animate-pulse text-teal-700'
                      : ''
                  }`}
                >
                  <HeaderItem title="Playlist" Icon={PlayIcon} />
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
              </div>
            </div>
          </nav>
        </div>
      </Popover>
    </div>
  )
}
