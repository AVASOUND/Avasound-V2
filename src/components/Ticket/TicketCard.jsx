import { PlayIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export default function TicketCard(props) {
  const router = useRouter()
  const { user, Moralis } = useMoralis()
  function openAlbum() {
    // router.push(`/album/${albumId}`);
    router.push(`/event/`)
  }
  function openProfile() {
    // router.push(`/profile/${userId}`);

    router.push('/profile')
  }

  function itemAction() {
    alert('purchase in action')
    //either buy item
    // or add to cart
  }

  return (
    <div className="relative my-4 flex h-60 w-56 flex-col items-center justify-start overflow-hidden rounded-lg bg-white shadow-xl sm:mx-4 lg:mx-8">
      <div className="relative w-full">
        {/* <div className="absolute flex items-end left-1 top-1 z-50 bg-[#f5f5f5] w-5 h-5">
          <ShoppingCartIcon className="w-5 h-5" />
        </div> */}
      </div>

      <div className="h-44 w-44">
        <Image
          width={175}
          height={175}
          src={'/wmex.png'}
          className="hover:opacity-50"
        />
        <label
          htmlFor="desktop-user-photo"
          className=" absolute inset-0 left-6 flex h-44 w-44 items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
        >
          <span>
            <PlayIcon className="h-8 text-white" />
          </span>
          <span className="sr-only">Play</span>
          {/* PLAY BUTTON */}
          <div
            // type="file"
            // id="userImg"
            // name="userImg"
            className="absolute inset-0 z-50 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
            onClick={() => {
              alert('play music')
            }}
          />
        </label>
      </div>
      <div className="flex w-11/12 flex-col space-y-2">
        <div className="mt-2 flex flex-row items-center justify-between text-xs">
          <h1
            className="mx-4 mt-1 flex w-full cursor-pointer items-center justify-center text-xs font-bold hover:text-black hover:underline"
            onClick={openAlbum}
          >
            hello{' '}
          </h1>
        </div>

        <div className="mx-4 mt-1 flex flex-row items-center justify-between text-xs">
          <p className="flex whitespace-nowrap">hello </p>
          <p className="flex whitespace-nowrap">Hello </p>
        </div>
      </div>
    </div>
  )
}
