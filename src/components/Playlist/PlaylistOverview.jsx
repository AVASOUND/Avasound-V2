import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'

import AlbumcardSmall from '../Album/AlbumcardSmall'
import { useMoralis } from 'react-moralis'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  DownloadIcon,
  PlayIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import PlaylistItem from './PlaylistItem'
import CollectionTabs from './CollectionTabs'

export default function Trending() {
  const { Moralis, user } = useMoralis()

  // CONTENT / ITEMS
  const [content, setContent] = useState([])
  const [likedBy, setLikedBy] = useState(false)

  useEffect(() => {
    if (user) {
      const Album = Moralis.Object.extend('Album')
      const query = new Moralis.Query(Album)
      // query.equalTo('address', user.get('ethAddress'))
      query.limit(8)
      query.find().then((results) => {
        let result = []
        results.forEach((content) => {
          result.push(content)
        })
        setContent(result)
      })
    }
  }, [user])

  return (
    <section aria-labelledby="trending-heading" className="w-full">
      <div className="pt-6">
        <div className="flex">
          <h2 className="ml-8 mb-4 text-lg font-semibold tracking-wide text-teal-700">
            Collection
          </h2>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CollectionTabs />
        </div>
        <div className="px-8 ">
          <div className="overflow-x-auto">
            <ul
              role="list"
              className="flex w-full flex-col items-center rounded-xl bg-[#f5f5f5] px-8 shadow-inner "
            >
              {content.map((data, index) => (
                <li className="w-full" key={index}>
                  <PlaylistItem />
                </li>
              ))}
            </ul>
            {/* <div className="mt-4 flex w-full flex-row items-center justify-center space-x-4">
              <ChevronLeftIcon className="h-5" />
              <p className="underline">1</p>
              <ChevronRightIcon className="h-5" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
