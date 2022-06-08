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
    setInterval(() => {
      updateWidth()
    }, 300)

    function updateWidth() {
      if (sound.playing()) {
        let width = (sound.seek() / sound.duration()) * 100
      }
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
    const seekPart = document.getElementById('progressBar').value
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
      <a className="flex h-full w-full items-center justify-center gap-2">
        <div className="ml-2 flex w-4/12 flex-row items-center justify-evenly lg:w-2/12">
          <div className="hidden sm:flex">
            <Image
              src="/wmex.png"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
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
        <div className="flex w-full flex-col items-center justify-center  text-gray-800">
          <div className="flex w-9/12 items-center justify-evenly">
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
            id="progressBar"
            min="0"
            max="100"
            onChange={skipThroughTrack}
            className="range range-xs hidden w-6/12 sm:flex"
          />
        </div>

        <div className="mr-2 flex w-4/12 items-center justify-evenly space-x-2 text-gray-800 lg:w-2/12">
          <VolumeOffIcon className="h-6 cursor-pointer" onClick={mute} />

          <input
            type="range"
            id="volumeBar"
            min="0"
            max="100"
            onChange={volume}
            className="range range-xs fill-green-500"
          />
          <VolumeUpIcon className="h-6 " />
          {/* <XIcon className="h-6 cursor-pointer " onClick={stopPlaying} /> */}
        </div>
      </a>
    </footer>
  )
}
