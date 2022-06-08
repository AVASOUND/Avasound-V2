import { ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import ERC20Balances from '../../hooks/useERC20Balance'
import NativeBalance from '../Balances/NativeBalance'

export default function AccountSettings() {
  const { user } = useMoralis()

  const [userAddress, setUserAddress] = useState()
  const [copyClicked, setCopyClicked] = useState(false)

  useEffect(() => {
    if (user) setUserAddress(user.get('ethAddress'))
  }, [])

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">Account</h2>
        <p className="mt-1 text-sm text-gray-500">
          This is where you see your wallet address and currency balances.
        </p>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>

            <div className="flex flex-row space-x-4">
              <p
                className="mt-1 cursor-pointer text-sm text-gray-500"
                onClick={() => navigator.clipboard.writeText(userAddress)}
              >
                {userAddress}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(userAddress)}
                className="mt-1 cursor-pointer text-sm text-gray-500 hover:text-teal-500"
              >
                {!copyClicked ? (
                  <ClipboardCopyIcon
                    onClick={() => setCopyClicked(true)}
                    className="h-4"
                  />
                ) : (
                  <ClipboardCheckIcon className="h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <p className="mt-1 text-sm text-gray-500">{user.get('username')}</p>
          </div>

          {/* BAlances */}
          <div className="flex flex-col">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Balances
            </label>
            <div className="flex flex-col items-start">
              {/*  NATIVE BALANCE */}
              <NativeBalance />

              <ERC20Balances />

              {/* AVSO Balance */}
              <div className="mt-2 flex w-6/12 flex-row items-center space-x-8 text-sm text-gray-500">
                <div className="ml-4 flex w-6/12 flex-row items-center">
                  <div className="text-sm text-gray-500">AVSX</div>
                </div>
                <div className="text-sm text-gray-500">1,000,000,000.00</div>
              </div>
              {/* AVSO Balance */}
              <div className="mt-2 flex w-6/12 flex-row items-center space-x-8 text-sm text-gray-500">
                <div className="ml-4 flex w-6/12 flex-row items-center">
                  <div className="text-sm text-gray-500">UST</div>
                  {/* <Image
                    src={'/avso-logo.png'}
                    height={15}
                    width={15}
                    className="rounded-full"
                  /> */}
                </div>
                <div className="text-sm text-gray-500">2,000.00</div>
              </div>
            </div>
          </div>

          {/* FIAT ONRAMP PLUGIN */}
          {/* <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Fiat Onramp
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Buy Crypto with your Creditcard.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
