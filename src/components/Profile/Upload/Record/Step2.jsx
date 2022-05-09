import { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { useMoralis, useMoralisFile } from 'react-moralis'

export default function Step2(props) {
  const { user, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  // STEP 2
  async function uploadFiles(e) {
    e.preventDefault()
    const trackA = document.getElementById('trackATitle').value
    const trackB = document.getElementById('trackBTitle').value
    const trackC = document.getElementById('trackCTitle').value
    const trackD = document.getElementById('trackDTitle').value
    const trackAFile = document.getElementById('trackAFile').files[0]
    const trackBFile = document.getElementById('trackBFile').files[0]
    const trackCFile = document.getElementById('trackCFile').files[0]
    const trackDFile = document.getElementById('trackDFile').files[0]
    const recordZipFile = document.getElementById('recordZipFile').files[0]

    let ipfsTrackA = ''
    let ipfsTrackB = ''
    let ipfsTrackC = ''
    let ipfsTrackD = ''
    let ipfsZipFile = ''

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
    if (trackCFile) {
      console.log('uploading Track C')
      await saveFile('trackCFile', trackCFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsTrackC = hash._ipfs
        }
      )
    }
    if (trackDFile) {
      console.log('uploading Track D')
      await saveFile('trackDFile', trackDFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsTrackD = hash._ipfs
        }
      )
    }
    if (recordZipFile) {
      console.log('uploading Zip ')
      await saveFile('recordZipFile', recordZipFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsZipFile = hash._ipfs
        }
      )
    }
    const Tracks = new Moralis.Object.extend('Tracks')
    const track = new Tracks()

    track.set('trackATitle', trackA)
    track.set('trackAFile', ipfsTrackA)
    track.set('trackBTitle', trackB)
    track.set('trackBFile', ipfsTrackB)
    track.set('trackCTitle', trackC)
    track.set('trackCFile', ipfsTrackC)
    track.set('trackDTitle', trackD)
    track.set('trackDFile', ipfsTrackD)
    track.set('recordZipFile', ipfsTrackD)
    track.save().then(() => {
      props.handleStep('3')
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
      {notificationSaved && <Notifications handleNotif={handleNotif} />}

      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          {/* ZIP FILE */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Tracks
              </label>

              <p className="mt-2 text-sm text-gray-500">
                Up to 4 MP3s and a zip file including WAVs or exclusives.
              </p>
            </div>
          </div>
          {/* TRACK A */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="trackATitle"
                className="block text-sm font-medium text-gray-700"
              >
                Track 1
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="trackATitle"
                  id="trackATitle"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />

                <label
                  htmlFor="trackAFile"
                  className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
          {/* TRACK B */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="trackBTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Track 2
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="trackBTitle"
                  id="trackBTitle"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />

                <label
                  htmlFor="trackBFile"
                  className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
          {/* TRACK C */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="trackCTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Track 3
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="trackCTitle"
                  id="trackCTitle"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />

                <label
                  htmlFor="trackCFile"
                  className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
          {/* TRACK D */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="trackDTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Track 4
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="trackDTitle"
                  id="trackDTitle"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />

                <label
                  htmlFor="trackDFile"
                  className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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

          {/* ZIP FILE */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="recordZipFile"
                className="block text-sm font-medium text-gray-700"
              >
                Exclusive Content
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <label
                  htmlFor="recordZipFile"
                  className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
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
                  className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  onClick={uploadFiles}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
