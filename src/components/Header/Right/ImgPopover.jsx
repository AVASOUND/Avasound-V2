/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  CashIcon,
  CogIcon,
  CreditCardIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useMoralis } from 'react-moralis'
import HeaderAccount from './HeaderAccount'
import Image from 'next/image'

const solutions = [
  {
    name: 'Fiat Onramp',
    description: 'Buy any cryptocurrency with your credit card. 100% safe.',
    href: '#',
    icon: CreditCardIcon,
  },
  {
    name: 'Settings',
    description: 'Edit your Account.',
    href: '/profilesettings',
    icon: CogIcon,
  },
]
const callsToAction = [{ name: 'Logout', href: '#', icon: LogoutIcon }]

export default function WalletPopover() {
  const { logout, user } = useMoralis()

  const [walletSolution, setWalletSolution] = useState([
    {
      name: '',
      description: '',
      href: '',
      icon: CashIcon,
    },
  ])

  useEffect(() => {
    setWalletSolution([
      {
        name: user.get('username'),
        description: user.get('ethAddress'),
        href: '/profile',
        icon: UserIcon,
      },
    ])
  }, [])
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`cursor-pointer ${open ? 'text-teal-800' : ''}`}
          >
            <Image
              src={user.get('userImg')}
              width={30}
              height={30}
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
            <Popover.Panel className="absolute z-50 mt-3">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {walletSolution.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-teal-500"
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
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-teal-500"
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
                <div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                  <button
                    className="flex flex-row items-center text-black"
                    onClick={logout}
                  >
                    <div className="flow-root">
                      <a className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100">
                        <LogoutIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Logout</span>
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
