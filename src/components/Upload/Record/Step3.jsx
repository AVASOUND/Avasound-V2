import { InformationCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import Albumcard from '../../Album/Albumcard'
import InfoPanel from '../../Settings/InfoPanel'
import { TokenABI, TokenAddress } from '../../../contracts/TokenContract'
import { marketplaceAddress } from '../../../contracts/MarketplaceContract'

const steps = [
  { id: 'Step 1', name: 'Upload Tracks', status: 'complete' },
  { id: 'Step 2', name: 'Mint Item', status: 'current' },
  { id: 'Step 3', name: 'Approve & List Item', status: 'upcoming' },
]

export default function ProfileSettings(props) {
  // Moralis Hooks
  const { user, Moralis } = useMoralis()

  // State Variables for Info Icons
  const [showMasterInfo, setShowMasterInfo] = useState(false)
  const [showRoyaltyInfo, setShowRoyaltyInfo] = useState(false)

  // CONTRACT CALL MINT ITEM
  async function contractCall(object) {
    const masterOwner = document.getElementById('masterOwner').value
    const share1 = document.getElementById('shares1').value
    const share2 = document.getElementById('shares2').value

    if (share1 + share2 != 100) {
      alert('Must be 100%!')
      console.log(share1 * share2)
      return
    }

    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contract = new ethers.Contract(
      TokenAddress,
      TokenABI,
      web3Provider.getSigner()
    )

    const price = ethers.utils.parseEther(object.get('recordPrice').toString())

    contract
      .createAlbum(
        object.id,
        object.get('recordCount'),
        '4',
        price,
        object.get('royaltyPrice')
      )
      .then((result) => {
        contract.setApprovalForAll(marketplaceAddress, true)
        alert(
          'successful, please confirm direct approval for marketplace via metamask'
        )
        setUploadDone(true)
        alert(
          "You find the item in your collection. From there you'll be able to list it on the marketplace"
        )
        props.handleStep('4')
      })
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
          {/* Master Owner */}
          <div className=" sm:items-start  sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            {/*  CONSIDER ADDING A SWITCH TO SHOW COPIES AVAILABLE PUBLICLY OR NOT */}
            <label
              htmlFor="cover-photo"
              className="flex flex-row text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Master Owner
              <InformationCircleIcon
                className="ml-2 h-3 cursor-pointer text-teal-500"
                onClick={() => {
                  setShowMasterInfo(true)
                }}
              />
            </label>
            <div className="w-full">
              {showMasterInfo && (
                <InfoPanel
                  handleModal={setShowMasterInfo}
                  title={'Master Record'}
                  description={
                    'The unique creator of this token who owns the rights to the masters'
                  }
                />
              )}
              <div className="mt-1 flex w-full rounded-md shadow-sm">
                <input
                  type="text"
                  name="masterOwner"
                  id="masterOwner"
                  disabled={true}
                  value={user.get('ethAddress')}
                  autoComplete="recordtitle"
                  className={`block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm`}
                />
              </div>
            </div>
          </div>
          {/* Royalty Owner A */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="flex flex-row text-sm font-medium text-gray-700"
              >
                Royalty Owner 1
                <InformationCircleIcon
                  className="ml-2 h-3 cursor-pointer text-teal-500"
                  onClick={() => {
                    setShowRoyaltyInfo(true)
                  }}
                />
              </label>
              <div>
                {showRoyaltyInfo && (
                  <InfoPanel
                    handleModal={setShowRoyaltyInfo}
                    title={'Royalty Tokens'}
                    description={
                      'Distribute shares between you and other creators who might be part of this project.'
                    }
                  />
                )}
              </div>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="royalties1"
                  id="royalties1"
                  value={user.get('ethAddress')}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />

                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    %
                  </span>
                  <input
                    type="number"
                    name="shares1"
                    id="shares1"
                    placeholder="100"
                    max="100"
                    className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    // defaultValue={user.handle}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Royalty Owner B */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Royalty Owner 2
              </label>
              <div className="flex w-full flex-row items-center space-x-4">
                <input
                  type="text"
                  name="royalties2"
                  id="royalties2"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />

                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    %
                  </span>
                  <input
                    type="number"
                    name="shares2"
                    id="shares2"
                    className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    // defaultValue={user.handle}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-16 pt-5">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  onClick={contractCall}
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
