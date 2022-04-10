import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  CloudUploadIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  PlusCircleIcon,
  UserCircleIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useMoralis, useMoralisFile } from 'react-moralis'
import Notifications from '../NotificationSaved'

const tabs = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Upload', href: '#', icon: CloudUploadIcon, current: false },
  // { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  // { name: 'Wallet', href: '#', icon: CreditCardIcon, current: false },
  // { name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileSettings() {
  const [availableToHire, setAvailableToHire] = useState(true)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowCommenting, setAllowCommenting] = useState(true)
  const [allowMentions, setAllowMentions] = useState(true)

  const router = useRouter()
  const { user, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  const [userName, setUserName] = useState(user.get('username'))
  const [userBio, setUserBio] = useState(user.get('userbio'))
  const [artistName, setArtistName] = useState(user.get('artistName'))
  const [userUrl, setUserUrl] = useState(user.get('userUrl'))
  const [userEmail, setUserEmail] = useState(user.get('email'))
  const [userImg, setUserImg] = useState(user.get('userImg'))

  const [selectedTab, setSelectedTab] = useState('Profile')

  async function saveProfile(e) {
    e.preventDefault()
    //profile
    const recordTitle = document.getElementById('recordTitle').value
    const trackA = document.getElementById('trackA').value
    const trackB = document.getElementById('trackB').value
    const trackC = document.getElementById('trackC').value
    const trackD = document.getElementById('trackD').value
    const artistName = document.getElementById('artistName').value
    const mintAddress = user.get('ethAddress')
    const recordPrice = document.getElementById('recordPrice').value
    const recordCover = document.getElementById('recordCover').files[0]
    // const coverImg = document.getElementById('coverImg').files[0]

    let ipfsCover = ''

    if (recordCover) {
      console.log('uploading profile picture')
      await saveFile('recordCover', recordCover, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsCover = hash._ipfs
        }
      )
    }

    // save user info
    record.set('recordTitle', recordTitle)
    record.set('artistName', artistName)
    record.set('mintAddress', mintAddress)
    record.set('recordPrice', recordPrice)
    record.set('recordCover', ipfsCover)
    record.save().then((object) => {
      setNotificationSaved(true)
      // router.push('/profile')
    })
  }

  const [notificationSaved, setNotificationSaved] = useState(false)

  const handleNotif = () => {
    if (notificationSaved) {
      setNotificationSaved(false)
    } else {
      setNotificationSaved(true)
    }
  }
  return (
    <div hidden={selectedTab != 'Profile'} className="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Upload Record
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload a record with up to four songs.
        </p>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Record Title
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="recordTitle"
                id="recordTitle"
                autoComplete="recordtitle"
                className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Tracks */}

          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Track 1
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="artistName"
                  id="artistName"
                  onChange={(e) => setArtistName(e.target.value)}
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />

                <label
                  htmlFor="file-upload"
                  className=" mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                >
                  <span className="flex w-full flex-row items-center justify-between">
                    <PlusCircleIcon className="h-5" />
                    <p>Upload MP3</p>
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* ADD Tracks  */}
          <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
            <div className="sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                <button
                  type="button"
                  className=" rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Track
                </button>
              </div>
            </div>
          </div>
          {/* ZIP FILE */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Zip File
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <label
                  htmlFor="file-upload"
                  className=" mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                >
                  <span className="flex w-full flex-row items-center justify-between">
                    <PlusCircleIcon className="h-5" />
                    <p>Upload ZIP (Wavs, exclusive content & more)</p>
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* Cover Art */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Cover Artwork
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  {/* <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg> */}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="userBio"
                name="userBio"
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Record description</p>
          </div>
        </div>

        {/* <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
          <p className="text-sm font-medium text-gray-700" aria-hidden="true">
            Photo
          </p>
          <div className="mt-1 lg:hidden">
            <div className="flex items-center">
              <div
                className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <img
                  className="h-full w-full rounded-full"
                  src={userImg}
                  alt=""
                />
              </div>
              <div className="ml-5 rounded-md shadow-sm">
                <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:bg-gray-50">
                  <label
                    htmlFor="mobile-user-photo"
                    className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                  >
                    <span>Change</span>
                    <span className="sr-only">Change photo</span>
                  </label>
                  <input
                    id="userImg"
                    name="userImg"
                    type="file"
                    className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-full lg:block">
            <img
              className="relative h-40 w-40 rounded-full"
              src={userImg}
              alt=""
            />
            <label
              htmlFor="desktop-user-photo"
              className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
            >
              <span>Change</span>
              <span className="sr-only"> user photo</span>
              <input
                type="file"
                id="userImg"
                name="userImg"
                className="absolute inset-0 z-50 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </label>
          </div>
        </div> */}

        {/* <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div> */}
      </div>
    </div>
  )
}
