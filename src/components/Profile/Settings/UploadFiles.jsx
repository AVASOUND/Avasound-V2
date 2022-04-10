import { useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useMoralis, useMoralisFile } from 'react-moralis'
import UploadNavbar from './UploadNavbar'
import Step1 from './Step1'

const steps = [
  { id: 'Step 1', name: 'Upload Tracks', href: '#', status: 'current' },
  { id: 'Step 2', name: 'Mint Item', href: '#', status: 'upcoming' },
  { id: 'Step 3', name: 'Approve & List Item', href: '#', status: 'upcoming' },
  { id: 'Step 4', name: 'Approve & List Item', href: '#', status: 'upcoming' },
]

export default function ProfileSettings() {
  const router = useRouter()
  const { user, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  const [step, setStep] = useState('1')

  const handleStep = () => {
    if (step == '1') {
      setStep('2')
    } else if (step == '2') {
      setStep('3')
    } else if (step == '3') {
      setStep('4')
    } else {
      setStep('1')
    }
  }

  // STEP 1
  async function recordInfo(e) {
    e.preventDefault()
    //profile
    const recordTitle = document.getElementById('recordTitle').value
    const owner = user.get('ethAddress')

    const trackA = document.getElementById('trackATitle').value
    const trackB = document.getElementById('trackBTitle').value
    const trackC = document.getElementById('trackCTitle').value
    const trackD = document.getElementById('trackDTitle').value
    const trackAFile = document.getElementById('trackAFile').files[0]
    const trackBFile = document.getElementById('trackBFile').files[0]
    const trackCFile = document.getElementById('trackCFile').files[0]
    const trackDFile = document.getElementById('trackDFile').files[0]

    const recordPrice = document.getElementById('recordPrice').value
    const recordCover = document.getElementById('recordCoverFile').files[0]

    let ipfsCover = ''
    let ipfsTrackA = ''
    let ipfsTrackB = ''

    if (recordCover) {
      console.log('uploading Record Cover')
      await saveFile('recordCover', recordCover, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsCover = hash._ipfs
        }
      )
    }
    if (trackAFile) {
      console.log('uploading Track A')
      await saveFile('trackAFile', trackAFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsTrackA = hash._ipfs
        }
      )
    }
    if (trackBFile) {
      console.log('uploading Track B')
      await saveFile('trackBFile', trackBFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsTrackB = hash._ipfs
        }
      )
    }

    // save user info
    record.set('recordTitle', recordTitle)
    record.set('recordCover', ipfsCover)
    record.set('owner', owner)
    record.set('recordPrice', recordPrice)

    record.set('trackATitle', trackA)
    record.set('trackAFile', ipfsTrackA)
    record.set('trackBTitle', trackB)
    record.set('trackBFile', ipfsTrackB)
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
    <div className="w-11/12 py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Upload Record
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload a record with up to four songs.
        </p>
      </div>
      <UploadNavbar />
      <div hidden={step != '2'}>
        <Step1 handleStep={handleStep} />
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
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="recordCoverFile"
                        name="recordCoverFile"
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
          {/* Price */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Price per Record in USD
            </label>
            <div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="recordTitle"
                  id="recordTitle"
                  autoComplete="recordtitle"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* Number of Copies */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Total amount of copies
            </label>
            <div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="recordTitle"
                  id="recordTitle"
                  autoComplete="recordtitle"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
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
                id="recordBio"
                name="recordBio"
                // onChange={(e) => setUserBio(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Record description</p>
          </div>

          {/* TRACKS */}

          {/* TRACK A */}
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
                  name="trackATitle"
                  id="trackATitle"
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
                    id="trackAFile"
                    name="trackAFile"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* TRACK 2 */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Track 2
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="trackBTitle"
                  id="trackBTitle"
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
                    id="trackBFile"
                    name="trackBFile"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* TRACK 3 */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Track 3
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="trackCTitle"
                  id="trackCTitle"
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
                    id="trackCFile"
                    name="trackCFile"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* TRACK 4 */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Track 4
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="trackDTitle"
                  id="trackDTitle"
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
                    id="trackDFile"
                    name="trackDFile"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* ADD Tracks  */}
          {/* <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
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
          </div> */}
          {/* ZIP FILE */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Exclusive Content
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <label
                  htmlFor="file-upload"
                  className=" mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                >
                  <span className="flex w-full flex-row items-center justify-between">
                    <PlusCircleIcon className="h-5" />
                    <p>Upload ZIP File</p>
                  </span>
                  <input
                    id="recordZipFile"
                    name="recordZipFile"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Upload a zip file including WAV files of the Record and
                exclusive content if featured.
              </p>
            </div>
          </div>

          <div className="pb-16 pt-5">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Complete Step 1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
