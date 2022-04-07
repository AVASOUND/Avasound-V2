// import useIPFS from '../hooks/useIPFS'

import {
  FastForwardIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'

export default function AudioPlayer() {
  return (
    <footer className="fixed bottom-0 h-20 w-full items-center justify-center bg-black bg-opacity-80">
      <a className="flex h-full w-full items-center justify-evenly gap-2">
        <div className="flex w-3/12 items-center justify-center">
          <div className="flex w-full items-center justify-evenly lg:w-6/12">
            <FastForwardIcon className="h-5 rotate-180 cursor-pointer text-white hover:text-teal-300" />
            <PlayIcon className="h-8 cursor-pointer text-white hover:text-teal-300" />
            {/* <PauseIcon className="h-8 cursor-pointer text-teal-300 hover:text-white" /> */}
            <FastForwardIcon className="h-5 cursor-pointer text-white hover:text-teal-300 " />
          </div>
        </div>
        <div className="w-6/12 cursor-pointer bg-white p-4 hover:text-teal-300">
          wfull
        </div>
        {/* <Image
          src="/avasound-blk.svg"
          alt="Vercel Logo"
          width={72}
          height={16}
        /> */}
        <div className="flex w-3/12 items-center justify-center">
          <div className="flex w-full items-center justify-evenly">
            <HeartIcon className="h-7 cursor-pointer text-white hover:text-teal-500" />
            <XIcon className="h-7 cursor-pointer text-white hover:text-teal-500" />
          </div>
        </div>
      </a>
    </footer>
  )
}
