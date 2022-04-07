import { useEffect, useState } from 'react'
import { CogIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import Albumcard from '../Album/Albumcard'
import { Disclosure } from '@headlessui/react'

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Collection', href: '#', current: false },
  { name: 'Community', href: '#', current: false },
  { name: 'Revenue', href: '#', current: false },
  // { name: 'Insights', href: '#', current: false },
]
const profile = {
  name: 'FPX',
  imageUrl: '/fpxlogo.png',
  coverImageUrl: '/SCHeader.png',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Website: '1985music.com',
    Booker: 'clive@evolutionartists.com',
  },
}

const team = [
  {
    name: 'AIDEN',
    handle: 'aiden',
    role: 'Techno / USA',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Gestalt',
    handle: 'gestalt',
    role: 'Drum & Bass / AT',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Pech + Schwefel',
    handle: 'pechplusschwefel',
    role: 'Techno, AT',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Two Feet',
    handle: 'twofeet',
    role: 'Pop / USA',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, Moralis } = useMoralis()

  // TAB SELECTION
  const [selectedTab, setSelectedTab] = useState('Profile')

  // CONTENT / ITEMS
  const [content, setContent] = useState([])

  useEffect(() => {
    if (user) {
      const Album = Moralis.Object.extend('Album')
      const query = new Moralis.Query(Album)
      // query.equalTo('address', user.get('ethAddress'))
      query.find().then((results) => {
        let result = []
        results.forEach((content) => {
          result.push(content)
        })
        setContent(result)
      })
    }
  }, [user])

  const [userInfo, setUserInfo] = useState({
    username: '',
    name: '',
    imageUrl: '',
    coverImageUrl: '',
    about: '',
    fields: {
      Website: '',
      Contact: '',
    },
  })

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.get('username'),
        name: user.get('artistName'),
        imageUrl: user.get('userImg'),
        coverImageUrl: user.get('userCover'),
        about: user.get('userbio'),
        fields: {
          Website: user.get('userUrl'),
          Contact: user.get('userEmail'),
        },
      })
    }
  }, [])

  return (
    <>
      {' '}
      <Disclosure
        as="div"
        className="absolute top-20 w-full overflow-hidden bg-teal-700 pb-32"
      >
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
            {/* <header className="relative py-10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
            </header> */}
          </>
        )}
      </Disclosure>
      <div className="z-40 flex h-full w-11/12 rounded-b-xl bg-white shadow-xl lg:w-9/12">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img
                      className="h-32 w-full object-cover lg:h-48"
                      src={profile.coverImageUrl}
                      alt=""
                    />
                  </div>
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={userInfo.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="mt-12 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                          <h1 className="mb-4 truncate pt-2 text-2xl font-bold text-gray-900">
                            {userInfo.name}
                          </h1>

                          <div className="flex w-full flex-row items-center justify-evenly space-x-4 rounded-xl bg-[#f5f5f5]">
                            <p>78 Items</p>
                            <p>1000 Followers</p>
                            <p>100 Following</p>
                          </div>
                        </div>
                        <div className="justify-stretch mt-6 flex flex-col space-y-3 text-sm font-medium sm:flex-row sm:space-y-0 sm:space-x-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          >
                            <PlusCircleIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Follow</span>
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                            onClick={() => router.push('/profilesettings')}
                          >
                            <CogIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Settings</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 className="truncate text-2xl font-bold text-gray-900">
                        {profile.name}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className=" mt-6 sm:mt-2 2xl:mt-5">
                  <div className="w-full border-b border-gray-200">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            onClick={() => setSelectedTab(tab.name)}
                            className={classNames(
                              selectedTab == tab.name
                                ? 'border-teal-500 text-gray-900'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                              'cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Description list */}
                <div
                  hidden={selectedTab != 'Profile'}
                  className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8"
                >
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {/* {Object.keys(userInfo.fields).map((field) => (
                      <div key={field} className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          {field}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {userInfo.fields[field]}
                        </dd>
                      </div>
                    ))} */}
                    <div className="pb-8 sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd
                        className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                        dangerouslySetInnerHTML={{ __html: userInfo.about }}
                      />
                    </div>
                  </dl>
                </div>

                {/* Team member list */}
                {/* <div className="mx-auto mt-8 max-w-5xl px-4 pb-8 sm:px-6 lg:px-8">
                  <h2 className="text-sm font-medium text-gray-500">
                    Fans also Like
                  </h2>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {team.map((person) => (
                      <div
                        key={person.handle}
                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-teal-200 focus-within:ring-offset-2 hover:border-gray-400"
                      >
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={person.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <a href="#" className="focus:outline-none">
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              {person.name}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {person.role}
                            </p>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

                <div
                  hidden={selectedTab != 'Collection'}
                  className="mx-auto  mt-8 max-w-5xl px-4 pb-4 sm:px-6 lg:px-8"
                >
                  <div className="mt-8">
                    {/* <ul
                      role="list"
                      className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 flex-wrap lg:grid-cols-3 xl:gap-x-8"
                    > */}
                    <ul className="mt-8 flex w-full max-w-6xl flex-wrap items-center justify-evenly">
                      {content.map((data, index) => (
                        <Albumcard data={data} key={index} />
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
