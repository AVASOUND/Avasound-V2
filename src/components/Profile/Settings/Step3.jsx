import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import Albumcard from '../../Album/Albumcard'

const steps = [
  { id: 'Step 1', name: 'Upload Tracks', status: 'complete' },
  { id: 'Step 2', name: 'Mint Item', status: 'current' },
  { id: 'Step 3', name: 'Approve & List Item', status: 'upcoming' },
]

export default function ProfileSettings(props) {
  const { user, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  // STEP 1
  // async
  function completeStep(e) {
    e.preventDefault()
    props.handleStep('4')
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
              Overview
            </label>
            <div className="mt-1 flex items-center justify-center rounded-md bg-[#f5f5f5] shadow-sm">
              <div className="z-30">
                <Albumcard />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Royalty Shares (Max. 100)
            </label>
            <div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="royaltyShares"
                  id="royaltyShares"
                  autoComplete="recordtitle"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
              Number of Records
            </label>
            <div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="recordCopies"
                  id="recordCopies"
                  autoComplete="recordtitle"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pb-16 pt-5">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  onClick={completeStep}
                >
                  Mint Items
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
