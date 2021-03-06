/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  CashIcon,
  ChipIcon,
  CloudUploadIcon,
  CogIcon,
  CreditCardIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useMoralis, useNativeBalance } from 'react-moralis'
import Image from 'next/image'

const solutions = [
  {
    name: 'Dashboard',
    description: 'Edit your Account.',
    href: '/profilesettings',
    icon: CogIcon,
  },
  {
    name: 'Upload',
    description: 'Records, Tickets & Access Tokens.',
    href: '/upload',
    icon: CloudUploadIcon,
  },
  // {
  //   name: 'Fiat Onramp',
  //   description: 'Buy crypto with your credit card.',

  //   href: '#',
  //   icon: CreditCardIcon,
  // },
]
const callsToAction = [{ name: 'Logout', href: '#', icon: LogoutIcon }]

export default function ImgPopover(props) {
  const { data: balance } = useNativeBalance(props)

  const { logout, account, user, isAuthenticated } = useMoralis()

  const [walletSolution, setWalletSolution] = useState([
    {
      name: '',
      description: '',
      href: '',
      icon: CashIcon,
    },
  ])

  const [userAddress, setUserAddress] = useState()

  const [userImg, setUserImg] = useState('/avaxlogo.png')
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserImg(user.get('userImg'))
      setUserAddress(
        user.get('ethAddress').slice(0, 4).concat('...') +
          user.get('ethAddress').slice(38, 42)
      )
      setWalletSolution([
        {
          name: user.get('username'),
          address: userAddress,
          balance: balance.formatted, //MAX 10 signs including. and decimals
          href: '/profile',
          icon: ChipIcon,
        },
      ])
    }
  }, [])
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`cursor-pointer ${open ? 'text-teal-800' : ''}`}
          >
            <Image
              src={userImg || '/avso-logo.png'}
              width={35}
              height={35}
              className="rounded-full"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="relative top-44 z-50 max-w-sm transform  px-2  sm:px-0  lg:left-0 ">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-4 bg-white p-6 py-6 ">
                  {walletSolution.map((user) => (
                    <a
                      key={user.name}
                      href={user.href}
                      className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <user.icon
                        className="h-6 w-6 flex-shrink-0 text-gray-800"
                        aria-hidden="true"
                      />
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {user.name}
                        </p>
                        <div className="mt-1 flex w-72 flex-row items-start justify-between text-sm text-gray-500">
                          <div>{user.address}</div>
                          <div className="flex w-full flex-col items-end justify-end">
                            <div className="flex w-9/12 flex-row items-center justify-evenly">
                              <div>{user.balance}</div>
                              {/* <Image
                                src={'/avaxlogo.png'}
                                width={15}
                                height={15}
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-start rounded-lg p-4 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-gray-800"
                        aria-hidden="true"
                      />
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="justify-center space-y-6 bg-gray-50 sm:flex sm:space-y-0 sm:space-x-10 ">
                  <button
                    className="flex w-full flex-row items-center justify-center py-4 px-4 text-black hover:bg-gray-100"
                    onClick={logout}
                  >
                    <div className="flow-root">
                      <a className="-m-3 flex items-center rounded-md p-2 text-base font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100">
                        <span className="ml-3">Disconnect</span>
                      </a>
                    </div>
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
