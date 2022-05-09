import { Listbox, Transition } from '@headlessui/react'
import { PlusCircleIcon, SelectorIcon } from '@heroicons/react/outline'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import InfoPanel from '../../Settings/InfoPanel'
import { TokenABI, TokenAddress } from '../../../../contracts/TokenContract'
import { marketplaceAddress } from '../../../../contracts/MarketplaceContract'

export default function TicketStep1(props) {
  // Moralis Hooks
  const { user, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  // State Variables for Info Icons
  const [showPriceInfo, setShowPriceInfo] = useState(false)
  const [showTotalCopies, setShowTotalCopies] = useState(false)

  // STEP 1: Upload Details to Moralis DB & IPFS
  async function completeStep(e) {
    e.preventDefault()
    const eventTitle = document.getElementById('eventTitle').value
    const eventDate = document.getElementById('eventDate').value
    const eventLocation = document.getElementById('eventLocation').value
    const eventPoster = document.getElementById('eventPoster').files[0]
    const ticketPrice = document.getElementById('ticketPrice').value
    const ticketNumber = document.getElementById('ticketNumber').value
    const eventDetails = document.getElementById('eventDetails').value

    // IPFS
    let ipfsCover = ''

    if (eventPoster) {
      console.log('uploading Event Poster')
      await saveFile('eventPoster', eventPoster, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsCover = hash._ipfs
        }
      )
    }
    // Moralis Database Extension
    const Tickets = new Moralis.Object.extend('Tickets')
    const ticket = new Tickets()

    ticket.set('eventTitle', eventTitle)
    ticket.set('eventDate', eventDate)
    ticket.set('eventLocation', eventLocation)
    ticket.set('eventPoster', ipfsCover)
    ticket.set('ticketPrice', ticketPrice)
    ticket.set('ticketNumber', ticketNumber)
    ticket.set('eventDetails', eventDetails)
    ticket.save().then((object) => {
      //   setNotificationSaved(true)
      contractCall(object)
    })
  }

  // STEP 1.2: CONTRACT CALL MINT ITEM

  async function contractCall(object) {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contract = new ethers.Contract(
      TokenAddress,
      TokenABI,
      web3Provider.getSigner()
    )

    const price = ethers.utils.parseEther(object.get('ticketPrice').toString())

    // change to Ticket Contract / Function
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
        props.handleStep('2')
      })
  }

  return (
    <div className="px-4 py-4 lg:pb-8">
      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          <div>
            <label
              htmlFor="eventTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="eventTitle"
                id="eventTitle"
                className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="date"
                name="eventDate"
                id="eventDate"
                className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="eventLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="eventLocation"
                id="eventLocation"
                className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
          </div>

          {/* EVENT ARTWORK */}
          <div className="mt-6 grid grid-cols-12 items-center gap-6">
            <div className="col-span-12">
              <label
                htmlFor="eventPoster"
                className="block text-sm font-medium text-gray-700"
              >
                Flyer
              </label>
              <div className="flex w-full  flex-row items-center space-x-4">
                <label
                  htmlFor="eventPoster"
                  className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                >
                  <span className="flex w-full flex-row items-center justify-between">
                    <PlusCircleIcon className="h-5" />
                    <p>Upload PNG or JPG</p>
                  </span>
                  <input
                    id="eventPoster"
                    name="eventPoster"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* PRICE PER TICKET */}
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="ticketPrice"
              className="flex flex-row text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Price
              <InformationCircleIcon
                className="ml-2 h-3 cursor-pointer text-teal-500"
                onClick={() => {
                  setShowPriceInfo(true)
                }}
              />
            </label>
            <div>
              {showPriceInfo && (
                <InfoPanel
                  handleModal={setShowPriceInfo}
                  title={'Price per Ticket'}
                  description={'Ticket price in USD'}
                />
              )}
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="ticketPrice"
                  id="ticketPrice"
                  placeholder="USD"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* NUMBER OF TICKETS */}
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:pt-5">
            {/*  CONSIDER ADDING A SWITCH TO SHOW COPIES AVAILABLE PUBLICLY OR NOT */}
            <label
              htmlFor="ticketNumber"
              className="flex flex-row text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Number of Tickets
              <InformationCircleIcon
                className="ml-2 h-3 cursor-pointer text-teal-500"
                onClick={() => {
                  setShowTotalCopies(true)
                }}
              />
            </label>
            <div>
              {showTotalCopies && (
                <InfoPanel
                  handleModal={setShowTotalCopies}
                  title={'Ticket Number'}
                  description={
                    'The total number of tickets available on the marketplace.'
                  }
                />
              )}
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="ticketNumber"
                  id="ticketNumber"
                  min="1"
                  max="100000"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Event Details
            </label>
            <div className="mt-1">
              <textarea
                id="eventDetails"
                name="eventDetails"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">LineUp, Time, & More</p>
          </div>

          <div className="pt-2">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  onClick={completeStep}
                >
                  Mint Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
