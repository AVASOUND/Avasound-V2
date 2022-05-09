import { InformationCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import Albumcard from '../../../Album/Albumcard'
import InfoPanel from '../../Settings/InfoPanel'
import TicketCard from '../../../Ticket/TicketCard'
import { TokenABI, TokenAddress } from '../../../../contracts/TokenContract'
import { marketplaceAddress } from '../../../../contracts/MarketplaceContract'

export default function ProfileSettings(props) {
  // Moralis Hooks
  const { user, Moralis } = useMoralis()

  // State Variables for Info Icons
  const [showMasterInfo, setShowMasterInfo] = useState(false)
  const [showRoyaltyInfo, setShowRoyaltyInfo] = useState(false)

  // CONTRACT CALL MINT ITEM
  async function contractCall(object) {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contract = new ethers.Contract(
      TokenAddress,
      TokenABI,
      web3Provider.getSigner()
    )

    const price = ethers.utils.parseEther(object.get('ticketPrice').toString())

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

  const [ticket, setTicket] = useState([])

  useEffect(() => {
    if (user) {
      const Tickets = Moralis.Object.extend('Ticktets')
      const query = new Moralis.Query(Tickets)
      query.equalTo('owner', user.get('ethAddress'))
      query.find().then((results) => {
        setTicket(results)
      })
    }
  }, [user])

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
                {ticket.map((data, index) => (
                  <TicketCard data={data} key={index} />
                ))}
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
