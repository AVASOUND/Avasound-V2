/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {
  ChartBarIcon,
  CogIcon,
  CreditCardIcon,
  CursorClickIcon,
  LogoutIcon,
  PhoneIcon,
} from '@heroicons/react/outline'
import HeaderItem from '../components/Header/HeaderItem'
import { useMoralis } from 'react-moralis'

const solutions = [
  {
    name: 'Wallet',
    description:
      'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Fiat Onramp',
    description: 'Buy any cryptocurrency with your credit card. 100% safe.',
    href: '#',
    icon: CursorClickIcon,
  },
  {
    name: 'Settings',
    description: "Your customers' data will be safe and secure.",
    href: '/profilesettings',
    icon: CogIcon,
  },
  //   {
  //     name: 'Integrations',
  //     description: "Connect with third-party tools that you're already using.",
  //     href: '#',
  //     icon: ViewGridIcon,
  //   },
  //   {
  //     name: 'Automations',
  //     description:
  //       'Build strategic funnels that will drive your customers to convert',
  //     href: '#',
  //     icon: RefreshIcon,
  //   },
]
const callsToAction = [
  { name: 'Logout', href: '#', icon: LogoutIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { logout } = useMoralis()
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`cursor-pointer ${
              open ? 'animate-pulse text-teal-300' : ''
            }`}
          >
            <HeaderItem title="Account" Icon={CreditCardIcon} />
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
            <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
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
                    <LogoutIcon className="ml-2 h-5 rotate-180" />
                    Logout
                    {callsToAction.map((item) => (
                      <div key={item.name} className="flow-root">
                        <a
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100"
                        >
                          <item.icon
                            className="h-6 w-6 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3">{item.name}</span>
                        </a>
                      </div>
                    ))}
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
