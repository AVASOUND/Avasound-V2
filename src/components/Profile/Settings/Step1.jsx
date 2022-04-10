import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'

const steps = [
  { id: 'Step 1', name: 'Upload Tracks', href: '#', status: 'complete' },
  { id: 'Step 2', name: 'Mint Item', href: '#', status: 'current' },
  { id: 'Step 3', name: 'Approve & List Item', href: '#', status: 'upcoming' },
]

export default function ProfileSettings(props) {
  const { user, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  // STEP 1
  async function completeStep(e) {
    e.preventDefault()

    props.handleStep('true')
    // const recordTitle = document.getElementById('recordTitle').value
    // const owner = user.get('ethAddress')
    // const recordCover = document.getElementById('recordCoverFile').files[0]
    // const recordPrice = document.getElementById('recordPrice').value

    // let ipfsCover = ''

    // if (recordCover) {
    //   console.log('uploading Record Cover')
    //   await saveFile('recordCover', recordCover, { saveIPFS: true }).then(
    //     async (hash) => {
    //       console.log(hash)
    //       ipfsCover = hash._ipfs
    //     }
    //   )
    // }
    // const Record = new Moralis.Object.extend('Record')
    // const record = new Record()
    // record.set('recordTitle', recordTitle)
    // record.set('recordCover', ipfsCover)
    // record.set('owner', owner)
    // record.set('recordPrice', recordPrice)
    // record.save().then(() => {
    //   setNotificationSaved(true)
    // })
  }

  //   useEffect(() => {
  //     if (stepDone) {
  //       handleStep(true)
  //     }
  //   })

  return (
    <div className="w-11/12 py-6 px-4 sm:p-6 lg:pb-8">
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
                  name="recordPrice"
                  id="recordPrice"
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
                  name="recordCopies"
                  id="recordCopies"
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
                id="recordDescription"
                name="recordDescription"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Record description</p>
          </div>

          <div className="pb-16 pt-5">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={completeStep}
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
