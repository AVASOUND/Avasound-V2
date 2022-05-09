import { useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useMoralis, useMoralisFile } from 'react-moralis'
import TicketNavbar from './TicketNavbar'
import TicketStep1 from './TicketStep1'
import TicketStep2 from './TicketStep2'
// import TicketStep3 from './TicketStep3'
// import TicketStep4 from './TicketStep4'
// import TicketStep5 from './TicketStep5'

export default function UploadTicket() {
  const router = useRouter()

  const [step, setStep] = useState('1')
  //   const [notificationSaved, setNotificationSaved] = useState(false)

  const handleStep = () => {
    if (step == '1') {
      setStep('2')
    } else if (step == '2') {
      setStep('3')
    } else {
      setStep('1')
    }
  }

  //   const handleNotif = () => {
  //     if (notificationSaved) {
  //       setNotificationSaved(false)
  //     } else {
  //       setNotificationSaved(true)
  //     }
  //   }

  return (
    <div className="flex w-full flex-col py-4 px-4 sm:p-6 lg:pb-8">
      <div className=" flex w-full flex-col justify-center sm:items-center">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Upload Ticket
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload your Event Tickets. All input fields are required.
        </p>
        <TicketNavbar />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-full sm:w-9/12" hidden={step != '1'}>
          <TicketStep1 handleStep={handleStep} />
        </div>
        <div className="w-full sm:w-9/12" hidden={step != '2'}>
          <TicketStep2 handleStep={handleStep} />
        </div>

        {/* <div hidden={step != '3'}>
        <TicketStep3 handleStep={handleStep} />
        </div>
        <div hidden={step != '4'}>
        <TicketStep4 handleStep={handleStep} />
        </div>
        <div hidden={step != '5'}>
        <TicketStep5 handleStep={handleStep} />
    </div> */}
      </div>
    </div>
  )
}
