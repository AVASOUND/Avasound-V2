import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'

import AlbumcardSmall from '../components/AlbumcardSmall'

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
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Trending() {
  return (
    <section aria-labelledby="trending-heading" className="w-full">
      <div className="w-full py-8 sm:py-24 lg:py-8 lg:px-8">
        <div className="flex items-center justify-between px-8 sm:px-4 lg:px-4">
          <h2
            id="trending-heading"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Recently sold
          </h2>
        </div>

        <div className="relative mt-4 sm:mx-28">
          <div className="relative w-full items-center overflow-x-auto">
            <ul role="list" className=" mx-4 inline-flex space-x-2 sm:mx-4">
              {trendingProducts.map((product) => (
                <li
                  key={product.id}
                  className="inline-flex w-full flex-row
                 text-center lg:w-full "
                >
                  <AlbumcardSmall />
                  <AlbumcardSmall />
                  <AlbumcardSmall />
                  <AlbumcardSmall />
                  <AlbumcardSmall />
                  <AlbumcardSmall />
                  <AlbumcardSmall />
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