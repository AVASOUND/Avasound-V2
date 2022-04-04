/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Popover, Transition } from '@headlessui/react'
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'

const navigation = {
  categories: [
    {
      name: 'MUSIC',
      clothing: [
        [
          { name: 'Electro', href: '#' },
          { name: 'Dance', href: '#' },
          { name: 'Drum & Bass', href: '#' },
          { name: 'Dubstep', href: '#' },
          { name: 'Hardcore', href: '#' },
          { name: 'Hip Hop', href: '#' },
        ],
        [
          { name: 'Techno', href: '#' },
          { name: 'Tech-House', href: '#' },
          { name: 'Pop', href: '#' },
          { name: 'Alternative', href: '#' },
          { name: 'Avant Garde', href: '#' },
        ],
      ],
      accessories: [
        { name: 'Aiden', href: '#' },
        { name: 'FLMM', href: '#' },
        { name: 'FPX', href: '#' },
        { name: 'Gestalt', href: '#' },
        { name: 'ScreamArts', href: '#' },
        { name: 'Browse All', href: '#' },
      ],
      categories: [
        { name: 'EBB', href: '#' },
        { name: 'PLS UK', href: '#' },
        { name: 'Casual Gabberz', href: '#' },
        { name: 'More', href: '#' },
      ],
    },
    // {
    //   name: 'Royalty Drops',
    //   clothing: [
    //     [
    //       { name: 'Dress Shirts', href: '#' },
    //       { name: 'Pants', href: '#' },
    //       { name: 'Jackets', href: '#' },
    //       { name: 'T-Shirts', href: '#' },
    //       { name: 'Jeans', href: '#' },
    //       { name: 'Hoodies', href: '#' },
    //     ],
    //     [
    //       { name: 'Vests', href: '#' },
    //       { name: 'Kilts', href: '#' },
    //       { name: 'Outdoors', href: '#' },
    //       { name: 'Capes', href: '#' },
    //       { name: 'Browse All', href: '#' },
    //     ],
    //   ],
    //   accessories: [
    //     { name: 'Watches', href: '#' },
    //     { name: 'Boots', href: '#' },
    //     { name: 'Fanny Packs', href: '#' },
    //     { name: 'Sunglasses', href: '#' },
    //     { name: 'Browse All', href: '#' },
    //   ],
    //   categories: [
    //     { name: 'Just Added', href: '#' },
    //     { name: 'Clearance', href: '#' },
    //     { name: 'Graphic Tees', href: '#' },
    //   ],
    // },
  ],
  other: [
    { name: 'ART', href: '#' },
    { name: 'MEMBERS', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MarketNav() {
  function searchItems() {
    //execute search
  }
  return (
    <div className="w-full">
      <Disclosure as="div" className="relative bg-teal-700">
        {({ open }) => (
          <>
            <div
              aria-hidden="true"
              className={classNames(
                open ? 'bottom-0' : 'inset-y-0',
                'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
              )}
            >
              <div className="absolute inset-0 flex">
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: '#00bfa5' }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: '#00796b' }}
                />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                    fill="#4db6ac"
                  />
                  <path
                    d="M1465.84 308L16.816 0H1750v308h-284.16z"
                    fill="#00796b"
                  />
                  <path
                    d="M1733.19 0L284.161 308H0V0h1733.19z"
                    fill="#00bfa5"
                  />
                  <path
                    d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                    fill="#009688"
                  />
                </svg>
              </div>
            </div>

            <header className="relative py-4">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* <h1 className="text-3xl font-bold text-white">Discover</h1> */}

                <header className="relative">
                  <nav
                    aria-label="Top"
                    className="mx-auto max-w-7xl sm:px-6 lg:px-8"
                  >
                    <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
                      <div className="flex h-16 items-center justify-center">
                        <div className="flex flex-1 lg:hidden">
                          <a href="#">
                            <span className="sr-only">Marketplace</span>
                            <p className="font-bold text-white">Discover</p>
                            {/* <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                              alt=""
                            /> */}
                          </a>
                        </div>

                        {/* Flyout menus */}
                        <Popover.Group className="absolute inset-x-0 bottom-0 z-40 sm:static sm:flex-1 sm:self-stretch">
                          <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                            {navigation.categories.map(
                              (category, categoryIdx) => (
                                <Popover key={categoryIdx} className="flex">
                                  {({ open }) => (
                                    <>
                                      <div className="relative flex">
                                        <Popover.Button
                                          className={classNames(
                                            open
                                              ? 'border-teal-600 text-gray-800'
                                              : 'border-transparent text-white hover:text-gray-800',
                                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                          )}
                                        >
                                          {category.name}
                                        </Popover.Button>
                                      </div>

                                      <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                      >
                                        <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                          <div
                                            className="absolute inset-0 top-1/2 bg-white shadow"
                                            aria-hidden="true"
                                          />

                                          <div className="relative bg-white">
                                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                              <div className="grid grid-cols-1 items-start gap-y-10 gap-x-6 pt-10 pb-12 md:grid-cols-2 lg:gap-x-8">
                                                <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:gap-x-8">
                                                  <div>
                                                    <p
                                                      id="clothing-heading"
                                                      className="font-medium text-gray-900"
                                                    >
                                                      Genres
                                                    </p>
                                                    <div className="mt-4 border-t border-gray-200 pt-6 sm:grid sm:grid-cols-2 sm:gap-x-6">
                                                      <ul
                                                        role="list"
                                                        aria-labelledby="clothing-heading"
                                                        className="space-y-6 sm:space-y-4"
                                                      >
                                                        {category.clothing[0].map(
                                                          (item) => (
                                                            <li
                                                              key={item.name}
                                                              className="flex"
                                                            >
                                                              <a
                                                                href={item.href}
                                                                className="hover:text-gray-800"
                                                              >
                                                                {item.name}
                                                              </a>
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                      <ul
                                                        role="list"
                                                        aria-label="More clothing"
                                                        className="mt-6 space-y-6 sm:mt-0 sm:space-y-4"
                                                      >
                                                        {category.clothing[1].map(
                                                          (item) => (
                                                            <li
                                                              key={item.name}
                                                              className="flex"
                                                            >
                                                              <a
                                                                href={item.href}
                                                                className="hover:text-gray-800"
                                                              >
                                                                {item.name}
                                                              </a>
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:gap-x-8">
                                                  <div>
                                                    <p
                                                      id="accessories-heading"
                                                      className="font-medium text-gray-900"
                                                    >
                                                      Artists
                                                    </p>
                                                    <ul
                                                      role="list"
                                                      aria-labelledby="accessories-heading"
                                                      className="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                                                    >
                                                      {category.accessories.map(
                                                        (item) => (
                                                          <li
                                                            key={item.name}
                                                            className="flex"
                                                          >
                                                            <a
                                                              href={item.href}
                                                              className="hover:text-gray-800"
                                                            >
                                                              {item.name}
                                                            </a>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  </div>
                                                  <div>
                                                    <p
                                                      id="categories-heading"
                                                      className="font-medium text-gray-900"
                                                    >
                                                      Labels
                                                    </p>
                                                    <ul
                                                      role="list"
                                                      aria-labelledby="categories-heading"
                                                      className="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                                                    >
                                                      {category.categories.map(
                                                        (item) => (
                                                          <li
                                                            key={item.name}
                                                            className="flex"
                                                          >
                                                            <a
                                                              href={item.href}
                                                              className="hover:text-gray-800"
                                                            >
                                                              {item.name}
                                                            </a>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Popover.Panel>
                                      </Transition>
                                    </>
                                  )}
                                </Popover>
                              )
                            )}

                            {navigation.other.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center text-sm font-medium text-white hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </Popover.Group>

                        <form
                          className="flrw-row flex flex-1 items-center justify-end"
                          onSubmit={searchItems}
                        >
                          <input
                            type="text"
                            placeholder="Search"
                            className="border-none bg-transparent text-white placeholder-white active:outline-none"
                          />
                          <a
                            href="#"
                            className="p-2 text-white  hover:text-gray-500"
                          >
                            <span className="sr-only">Search</span>
                            <SearchIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </a>
                          {/* <div className="ml-4 flow-root lg:ml-8">
                            <a
                              href="#"
                              className="group -m-2 flex items-center p-2"
                            >
                              <ShoppingBagIcon
                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                0
                              </span>
                              <span className="sr-only">
                                items in cart, view bag
                              </span>
                            </a>
                          </div> */}
                        </form>
                      </div>
                    </div>
                  </nav>
                </header>
              </div>
            </header>
          </>
        )}
      </Disclosure>
    </div>
  )
}
