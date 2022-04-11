import { CheckCircleIcon } from '@heroicons/react/outline'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import Albumcard from '../../Album/Albumcard'

export default function ProfileSettings(props) {
  const router = useRouter()
  const [approve, setApprove] = useState(true)

  const [done, setDone] = useState(false)

  useEffect(() => {
    setApprove(true)
    setDone(false)
  }, [])

  // STEP 1 APPROVE ITEM FOR MARKETPLACE

  async function approveItem(e) {
    e.preventDefault()

    // contractCall

    setApprove(false)
  }

  // STEP 2 LIST ITEM
  async function listItem(e) {
    e.preventDefault()
    // contractcall

    setDone(true)
    //   .then(() => {
  }
  function allDone(e) {
    e.preventDefault()

    // props.handleStep('5')
    router.push('/profile')
  }
  return (
    <div className="w-11/12 py-6 px-4 sm:p-6 lg:pb-8">
      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          {!done && (
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
                {/* <div className="absolute top-60 ml-40 mt-3 h-52 w-52 rounded-full border-2 border-[#f5f5f5] bg-black opacity-100 shadow-xl"></div> */}
              </div>
            </div>
          )}
          {done && (
            <div>
              <div className="mt-1 flex flex-col items-center justify-center space-y-4 rounded-md bg-[#f5f5f5] py-4 shadow-sm">
                <label
                  htmlFor="cover-photo"
                  className="block text-xl font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  You are all set!
                </label>
                <CheckCircleIcon className="h-8 text-teal-500 " />
                <div
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  // add ${Key} for exact routing
                  onClick={() => router.push('/album')}
                >
                  Check your Item
                </div>
              </div>
            </div>
          )}

          <div className="pb-16 pt-5">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                {!done && (
                  <div>
                    {approve ? (
                      <button
                        className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        onClick={approveItem}
                      >
                        Approve Items
                      </button>
                    ) : (
                      <button
                        className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        onClick={listItem}
                      >
                        List Items
                      </button>
                    )}
                  </div>
                )}
                {done && (
                  <button
                    className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    onClick={allDone}
                  >
                    Done
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
