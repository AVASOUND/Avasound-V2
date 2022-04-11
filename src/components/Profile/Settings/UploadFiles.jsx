import { useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useMoralis, useMoralisFile } from 'react-moralis'
import UploadNavbar from './UploadNavbar'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'

const steps = [
  { id: 'Step 1', name: 'Upload Tracks', href: '#', status: 'current' },
  { id: 'Step 2', name: 'Mint Item', href: '#', status: 'upcoming' },
  { id: 'Step 3', name: 'Approve & List Item', href: '#', status: 'upcoming' },
  { id: 'Step 4', name: 'Approve & List Item', href: '#', status: 'upcoming' },
  { id: 'Step 5', name: 'Done', status: 'upcoming' },
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
    } else if (step == '5') {
      setStep('5')
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
        {/* <p className="mt-1 text-sm text-gray-500">Follow the steps.</p> */}
      </div>
      <UploadNavbar />
      <div hidden={step != '1'}>
        <Step1 handleStep={handleStep} />
      </div>
      <div hidden={step != '2'}>
        <Step2 handleStep={handleStep} />
      </div>
      <div hidden={step != '3'}>
        <Step3 handleStep={handleStep} />
      </div>
      <div hidden={step != '4'}>
        <Step4 handleStep={handleStep} />
      </div>
      <div hidden={step != '5'}>
        <Step5 handleStep={handleStep} />
      </div>
    </div>
  )
}
