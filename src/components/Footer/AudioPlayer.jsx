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
import { useEffect, useState } from 'react'
import { Howl } from 'howler'

export default function AudioPlayer(props) {
  const router = useRouter()

  const [isPlaying, setIsPlaying] = useState(false)

  const [closedPlayer, setClosedPlayer] = useState(false)

  // STATE VAR TRACK
  const [track, setTrack] = useState([
    new Howl({
      src: [
        'https://ipfs.moralis.io:2053/ipfs/QmTDdBFUL8XSK3EzmYrN1YaaTpyQZz8LozPhzey732qd3c',
      ],
      format: ['mp3'],
      volume: 0.5,
      seek: 0.2,
      // mute: false,
    }),
  ])

  // PLAY & PAUSE TRACK
  function playTrack() {
    if (!track[0].playing()) {
      track[0].play()
      setIsPlaying(true)
    } else {
      track[0].pause()
      setIsPlaying(false)
    }
  }
  // STOP TRACK
  function stopPlaying() {
    if (track[0].playing()) {
      track[0].stop()
      setClosedPlayer(true)
    } else return
  }

  function volume() {
    const value = document.getElementById('volumeBar').value / 100
    track[0].volume(value)
  }

  function skipThroughTrack() {
    const seekPart = document.getElementById('seekPart').value
    track[0].seek(seekPart)
  }

  // track[0].onpos(function () {
  //   console.log('Finished!')
  // })

  function mute() {
    // if (track[0].mute(false)) {
    //   track[0].mute(true)
    // } else {
    //   track[0].mute(false)
    // }
  }

  return (
    <footer
      hidden={closedPlayer}
      className="fixed bottom-0 h-16 w-full items-center justify-center border-2 border-t-gray-100 bg-white bg-opacity-80 shadow-inner"
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
            <div className="flex flex-col items-start pl-2 text-gray-800">
              <h1
                onClick={() => {
                  router.push('/album')
                }}
                className="cursor-pointer whitespace-nowrap  text-sm"
              >
                Empress
              </h1>
              <h1
                onClick={() => {
                  router.push('/profile')
                }}
                className="cursor-pointer  text-xs text-gray-500"
              >
                FPX
              </h1>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center text-gray-800">
          <div className="flex w-full items-center justify-evenly lg:w-6/12">
            <FastForwardIcon className="h-5 rotate-180 cursor-pointer  hover:text-teal-300" />
            <div onClick={playTrack}>
              {!isPlaying && (
                <PlayIcon className="h-8 cursor-pointer  hover:text-teal-300" />
              )}
              {isPlaying && (
                <PauseIcon className="h-8 cursor-pointer text-teal-300 hover:text-white" />
              )}
            </div>
            <FastForwardIcon className="h-5 cursor-pointer hover:text-teal-300 " />
          </div>
          <input
            type="range"
            id="seekPart"
            min="0"
            max="100"
            onChange={skipThroughTrack}
            className="range range-xs w-6/12"
          />
        </div>

        <div className="mr-4 flex w-4/12 items-center justify-center space-x-2 text-gray-800 lg:w-2/12">
          <VolumeOffIcon className="h-6 cursor-pointer" onClick={mute} />
          {/* <input
            type="range"
            min="0"
            max="100"
            className="cursor-pointer in-range:border-teal-500 out-of-range:border-red-500"
          /> */}
          <input
            type="range"
            id="volumeBar"
            min="0"
            max="100"
            onChange={volume}
            className="range range-xs fill-green-500"
          />
          <VolumeUpIcon className="h-6 " />
          <XIcon className="h-6 cursor-pointer " onClick={stopPlaying} />
        </div>
      </a>
    </footer>
  )
}
