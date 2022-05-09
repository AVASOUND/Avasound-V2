import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import Albumcard from '../../Album/Albumcard'

export default function ProfileSettings(props) {
  const { user, Moralis } = useMoralis()

  const [approve, setApprove] = useState(true)

  // STEP 1 APPROVE ITEM FOR MARKETPLACE

  async function approveItem(e) {
    e.preventDefault()

    // contractCall

    setApprove(false)
  }

  async function listItem(e) {
    e.preventDefault()
    // contractcall

    //   .then(() => {
    setApprove(true)
    props.handleStep('1')
  }

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

          {/* Cover Art */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Details
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:text-teal-500"
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

          <div className="pb-16 pt-5">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                {approve ? (
                  <button
                    type="submit"
                    className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    onClick={approveItem}
                  >
                    Approve Items
                  </button>
                ) : (
                  <button
                    type="submit"
                    className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    onClick={listItem}
                  >
                    List Items
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
