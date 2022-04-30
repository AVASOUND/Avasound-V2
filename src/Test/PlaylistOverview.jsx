import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'

import AlbumcardSmall from '../components/Album/AlbumcardSmall'
import { useMoralis } from 'react-moralis'
import {
  DotsHorizontalIcon,
  DownloadIcon,
  PlayIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import PlaylistItem from './PlaylistItem'

const trendingProducts = [
  {
    id: 1,
    name: 'Machined Pen',
    color: 'Black',
    price: '$35',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
    imageAlt:
      'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  // More products...
]

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
      query.limit(10)
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
          <h2 className="text-md ml-8 mb-8 font-semibold tracking-wide text-teal-700">
            Collection Playlist
          </h2>
        </div>
        <div className="px-8 ">
          <div className="overflow-x-auto">
            <ul
              role="list"
              className="flex w-full flex-col items-center rounded-xl bg-[#f5f5f5] px-8 shadow-inner "
            >
              {content.map((data, index) => (
                <li className="w-full" key={index}>
                  {/* <div className="flex h-16 items-center justify-between border-b-2">
                    <div className="flex w-9/12 flex-row items-center justify-around lg:w-6/12">
                      <Image src={'/avaxlogo.png'} width={50} height={50} />
                      <div className="flex flex-col">
                        <p className="font-semibold">Empress</p>
                        <p className="text-xs">FPX</p>
                      </div>
                      <PlayIcon className="h-6" />
                      <p className="text-xs">4:32</p>
                    </div>
                    <div className="flex flex-row space-x-4">
                      <DownloadIcon className="h-5" />
                      <ShareIcon className="h-5" />
                      <DotsHorizontalIcon className="h-5" />
                    </div>
                  </div> */}
                  <PlaylistItem />
                  {/* <AlbumcardSmall /> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
