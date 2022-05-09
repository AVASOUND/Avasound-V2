import { useState } from 'react'
import {
  ChartSquareBarIcon,
  CreditCardIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import Notifications from './NotificationSaved'
import AccountSettings from '../Settings/AccountSettings'
import ProfileSettings from './ProfileSettings'
import { useRouter } from 'next/router'

const tabs = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Insights', href: '#', icon: ChartSquareBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingsPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState('Profile')
  const [notificationSaved, setNotificationSaved] = useState(false)

  const handleNotif = () => {
    if (notificationSaved) {
      setNotificationSaved(false)
    } else {
      setNotificationSaved(true)
    }
  }

  return (
    <div className="w-full">
      {/* <Disclosure as="div" className="relative bg-teal-700">
        {({ open }) => (
          <>
            <div
              aria-hidden="true"
              className={classNames(
                open ? 'bottom-0' : 'inset-y-0',
                'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
              )}
            >
              <div className="absolute inset-0 flex">
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: '#00bfa5' }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: '#00796b' }}
                />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                    fill="#4db6ac"
                  />
                  <path
                    d="M1465.84 308L16.816 0H1750v308h-284.16z"
                    fill="#00796b"
                  />
                  <path
                    d="M1733.19 0L284.161 308H0V0h1733.19z"
                    fill="#00bfa5"
                  />
                  <path
                    d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                    fill="#009688"
                  />
                </svg>
              </div>
            </div>
            <header className="relative py-10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
            </header>
          </>
        )}
      </Disclosure> */}

      <main className="relative">
        <div
          className="mx-auto max-w-7xl px-4 pt-4 pb-2 sm:px-6
        lg:px-8"
        >
          <h1 className="text-2xl font-bold text-teal-500">Dashboard</h1>
        </div>
        {notificationSaved && <Notifications handleNotif={handleNotif} />}
        <div className=" w-full">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="cursor-pointer space-y-1">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      onClick={() => {
                        setSelectedTab(tab.name)
                      }}
                      className={classNames(
                        selectedTab == tab.name
                          ? 'border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                          : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      <tab.icon
                        className={classNames(
                          selectedTab == tab.name
                            ? 'text-teal-500 group-hover:text-teal-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{tab.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>

              <div className="divide-y divide-gray-200 lg:col-span-9">
                <div hidden={selectedTab != 'Profile'}>
                  <ProfileSettings />
                </div>
                <div hidden={selectedTab != 'Account'}>
                  <AccountSettings />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
