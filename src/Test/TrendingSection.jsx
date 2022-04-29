import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'

import AlbumcardSmall from '../components/Album/AlbumcardSmall'
import { useMoralis } from 'react-moralis'

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
      query.limit(7)
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
          <h2 className="text-md ml-8 font-bold tracking-wide text-teal-700">
            TRENDING RIGHT NOW
          </h2>
        </div>
        <div className="">
          <div className="overflow-x-auto">
            <ul
              role="list"
              className="flex flex-row items-center justify-center "
            >
              {content.map((data, index) => (
                <li key={index}>
                  <AlbumcardSmall />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
