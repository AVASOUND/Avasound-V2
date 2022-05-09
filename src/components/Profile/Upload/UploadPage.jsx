import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import {
  FingerPrintIcon,
  MusicNoteIcon,
  TicketIcon,
} from '@heroicons/react/outline'
// import Notifications from './NotificationSaved'
import UploadRecord from './Record/UploadRecord'
import UploadTicket from './Ticket/UploadTicket'
import AccountSettings from '../Settings/AccountSettings'
import ProfileSettings from '../ProfileSettings'

const tabs = [
  { name: 'Record', href: '#', icon: MusicNoteIcon, current: true },
  { name: 'Ticket', href: '#', icon: TicketIcon, current: false },
  { name: 'Token', href: '#', icon: FingerPrintIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState('Record')
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
      <main className="relative">
        <div
          className="mx-auto max-w-7xl px-4 py-4 sm:px-6
        lg:px-8"
        >
          <h1 className="text-2xl font-bold text-teal-500">Upload</h1>
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
                <div hidden={selectedTab != 'Record'}>
                  <UploadRecord />
                </div>
                <div hidden={selectedTab != 'Ticket'}>
                  <UploadTicket />
                </div>
                <div hidden={selectedTab != 'Token'}>
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
