import { useEffect, useState } from 'react'
import {
  CheckCircleIcon,
  CloudUploadIcon,
  CogIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis'
import Albumcard from '../Album/Albumcard'
import Spotlight from './Spotlight'

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Collection', href: '#', current: false },
  // { name: 'Community', href: '#', current: false },
  // { name: 'Revenue', href: '#', current: false },
  { name: 'Insights', href: '#', current: false },
]
const profile = {
  name: 'FPX',
  imageUrl: '/fpxlogo.png',
  // coverImageUrl: '/SCHeader.png',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Website: '1985music.com',
    Booker: 'clive@evolutionartists.com',
  },
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, Moralis } = useMoralis()

  // TAB SELECTION
  const [selectedTab, setSelectedTab] = useState('Profile')

  const [isArtist, setIsArtist] = useState(true)

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
    userId: '',
    userAddress: '',
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
        userId: user.get('objectId'),
        userAddress:
          user.get('ethAddress').slice(0, 4).concat('...') +
          user.get('ethAddress').slice(38, 42),
        imageUrl: user.get('userImg'),
        coverImageUrl: user.get('coverImg'),
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
      <div className="z-40 flex h-full w-full rounded-xl bg-white shadow-xl">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img
                      className="h-32 w-full rounded-t-xl object-cover lg:h-48"
                      src={
                        profile.coverImageUrl
                          ? profile.coverImageUrl
                          : '/avasound-blk.svg'
                      }
                    />
                  </div>
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={userInfo.imageUrl || '/avso-logo.png'}
                          alt=""
                        />
                      </div>
                      <div className="mt-12 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1  2xl:block">
                          <div className="flex w-3/12 flex-row items-center justify-between">
                            <h1 className="mb-2 truncate pt-2 text-2xl font-bold text-gray-900">
                              {userInfo.username
                                ? userInfo.username
                                : userInfo.userId}
                            </h1>
                            {isArtist ? (
                              <div className="flex flex-row items-center space-x-1 rounded-md bg-teal-100 px-1 text-sm font-medium text-teal-800">
                                <p>Artist</p>
                                <CheckCircleIcon className="h-4" />
                              </div>
                            ) : (
                              <div className="flex flex-row items-center space-x-1 rounded-md bg-cyan-100 px-1 text-sm font-medium text-cyan-800">
                                <p>Label</p>
                                <CheckCircleIcon className="h-4" />
                              </div>
                            )}
                          </div>
                          <h1 className="truncate text-xs font-medium text-gray-900">
                            {userInfo.userAddress}
                          </h1>
                        </div>
                        <div className="justify-stretch mt-6 flex flex-col space-y-3 text-sm font-medium sm:flex-row sm:space-y-0 sm:space-x-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                            onClick={() => router.push('/upload')}
                          >
                            <CloudUploadIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Upload</span>
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
                    {/* <div className="mt-6 min-w-0 flex-1 sm:block ">
                      <h1 className="truncate text-2xl font-bold text-gray-900">
                        {profile.name}
                      </h1>
                    </div> */}
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
                  className="mx-auto mt-6 w-full max-w-5xl px-4 sm:px-6 lg:px-8"
                >
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 ">
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
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>

                      <dd
                        className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                        dangerouslySetInnerHTML={{ __html: userInfo.about }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Spotlight
                      </dt>
                      <Spotlight />
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        New Items
                      </dt>

                      <div className="my-4 mb-8 flex w-full flex-row flex-wrap items-center justify-center sm:flex-nowrap">
                        <Albumcard />
                        <Albumcard />
                        <Albumcard />
                      </div>
                    </div>
                  </dl>
                </div>
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
