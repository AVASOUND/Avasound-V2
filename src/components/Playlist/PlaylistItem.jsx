import {
  DotsHorizontalIcon,
  DownloadIcon,
  PlayIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'

export default function PlaylistItem() {
  return (
    <div className="flex h-16 items-center justify-between border-b-2">
      <div className="flex w-9/12 flex-row items-center justify-around lg:w-6/12">
        <Image
          src={'/avaxlogo.png'}
          width={50}
          height={50}
          className="cursor-pointer"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Empress</p>
          <p className="text-xs">FPX</p>
        </div>
        <PlayIcon className="h-6 cursor-pointer" />
        <p className="text-xs">4:32</p>
      </div>
      <div className="flex flex-row space-x-4">
        <DownloadIcon className="h-5 cursor-pointer" />
        <ShareIcon className="h-5 cursor-pointer" />
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
    </div>
  )
}
