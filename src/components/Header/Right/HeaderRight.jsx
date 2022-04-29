import HeaderNetwork from './HeaderNetwork'
import WalletPopover from './WalletPopover'
import ImgPopover from './ImgPopover'
import Image from 'next/image'
import { useChain, useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import { XCircleIcon, XIcon } from '@heroicons/react/outline'

export default function HeaderRight() {
  const { user, chainId, isAuthenticated, enableWeb3, isWeb3Enabled } =
    useMoralis()
  const { switchNetwork } = useChain()

  const [wrongNetwork, setWrongNetwork] = useState('')

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3()
    if (isAuthenticated && chainId != null) {
      if (chainId == '0xa869') {
        setWrongNetwork(false)
      } else if (chainId != '0xa869') {
        setWrongNetwork(true)
      }
    }
  }, [isAuthenticated, chainId])

  function setNetwork() {
    switchNetwork('0xa869')
  }
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <div
        onClick={setNetwork}
        className="hidden cursor-pointer rounded-full p-1 md:flex lg:hidden"
      >
        {wrongNetwork ? (
          <Image
            src={'/avso-logo.png'}
            width={25}
            height={25}
            className="rounded-full"
          />
        ) : (
          <Image
            src={'/avaxlogo.png'}
            width={20}
            height={20}
            className="rounded-full"
          />
        )}
      </div>
      <div className="hidden lg:flex">
        <HeaderNetwork />
      </div>
      <div className="hidden md:flex">
        <WalletPopover />
      </div>
      <div className="flex cursor-pointer rounded-full p-1 md:hidden">
        <ImgPopover />
        {/* <Image
          src={user.get('userImg')}
          width={35}
          height={35}
          className="rounded-full"
        /> */}
      </div>
    </div>
  )
}
