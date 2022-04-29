import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'

export default function HeaderAccount() {
  const { user, isWeb3Enabled, enableWeb3, isAuthenticated, chainId } =
    useMoralis()
  const { switchNetwork } = useChain()

  const [wrongNetwork, setWrongNetwork] = useState('')

  // FUJI TESTNET 0xa869
  // AVAX MAINNET 0xa86a

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
    console.log('debug')
    switchNetwork('0xa869')
  }

  return (
    <button
      href="#"
      onClick={setNetwork}
      className="flex items-center whitespace-nowrap text-xs font-semibold tracking-wide text-black"
    >
      <div className="hidden flex-row items-center justify-evenly rounded-full p-1 px-3 ring-1 ring-black lg:flex">
        {wrongNetwork ? (
          <div className="text-red-500">Switch Network!</div>
        ) : (
          'Testnet'
        )}
      </div>
    </button>
  )
}
