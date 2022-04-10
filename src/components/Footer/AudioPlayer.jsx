import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AudioPlayer() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState()
  const [closedPlayer, setClosedPlayer] = useState(false)

  function clickPlay() {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
  }

  return (
    <footer
      hidden={closedPlayer}
      className="fixed bottom-0 h-16 w-full items-center justify-center bg-black bg-opacity-80"
    >
      <a className="flex h-full w-full items-center justify-evenly gap-2">
        <div className="flex w-3/12 items-center justify-center">
          <div className="ml-4 flex flex-row items-center justify-between">
            <Image
              src="/wmex.png"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col items-start pl-2 text-white">
              <h1
                onClick={() => {
                  router.push('/album')
                }}
                className="cursor-pointer whitespace-nowrap  text-sm"
              >
                Nymph Catching
              </h1>
              <h1
                onClick={() => {
                  router.push('/profile')
                }}
                className="cursor-pointer  text-xs text-gray-300"
              >
                Aiden
              </h1>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-evenly lg:w-6/12">
            <FastForwardIcon className="h-5 rotate-180 cursor-pointer text-white hover:text-teal-300" />
            <div onClick={clickPlay}>
              {!isPlaying && (
                <PlayIcon className="h-8 cursor-pointer text-white hover:text-teal-300" />
              )}
              {isPlaying && (
                <PauseIcon className="h-8 cursor-pointer text-teal-300 hover:text-white" />
              )}
            </div>
            <FastForwardIcon className="h-5 cursor-pointer text-white hover:text-teal-300 " />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="range range-xs w-6/12"
          />
        </div>

        <div className="mr-4 flex w-4/12 items-center justify-center space-x-2 lg:w-2/12">
          <VolumeOffIcon className="h-6 text-gray-300" />
          {/* <input
            type="range"
            min="0"
            max="100"
            className="cursor-pointer in-range:border-teal-500 out-of-range:border-red-500"
          /> */}
          <input
            type="range"
            min="0"
            max="100"
            className="range range-xs fill-green-500"
          />
          <VolumeUpIcon className="h-6 text-white" />
          <XIcon
            className="h-6 cursor-pointer text-white"
            onClick={() => {
              setClosedPlayer(true)
            }}
          />
        </div>
      </a>
    </footer>
  )
}
