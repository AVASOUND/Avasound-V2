import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'

export default function ProfileSettings() {
  const router = useRouter()
  const { user } = useMoralis()
  const { saveFile } = useMoralisFile()

  const [userName, setUserName] = useState(user.get('username'))
  const [userBio, setUserBio] = useState(user.get('userbio'))
  const [artistName, setArtistName] = useState(user.get('artistName'))
  const [userUrl, setUserUrl] = useState(user.get('userUrl'))
  const [userEmail, setUserEmail] = useState(user.get('email'))
  const [userImg, setUserImg] = useState(user.get('userImg'))

  async function saveProfile(e) {
    e.preventDefault()
    //profile
    const userName = document.getElementById('userName').value
    const userBio = document.getElementById('userBio').value
    // const artistName = document.getElementById('artistName').value
    const userUrl = document.getElementById('userUrl').value
    // const userEmail = document.getElementById('email').value
    const userImg = document.getElementById('userImg').files[0]
    const coverImg = document.getElementById('coverImg').files[0]

    let ipfsProfile = ''
    let ipfsCover = ''

    if (userImg) {
      console.log('uploading profile picture')
      await saveFile('userImg', userImg, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsProfile = hash._ipfs
        }
      )
    }
    if (coverImg) {
      console.log('uploading file')
      await saveFile('coverImg', coverImg, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsCover = hash._ipfs
        }
      )
    }
    // save user info
    user.set('username', userName)
    user.set('artistName', artistName)
    user.set('userbio', userBio)
    user.set('email', userEmail)
    user.set('userUrl', userUrl)
    user.set('userImg', ipfsProfile)
    user.set('coverImg', ipfsCover)
    // if (ipfsCover) user.set('coverImg', ipfsCover)

    // user.set('profileId', profileID)
    //saving
    user.save().then((object) => {
      setNotificationSaved(true)
      // router.push('/profile')
    })
  }

  const [notificationSaved, setNotificationSaved] = useState(false)

  const handleNotif = () => {
    if (notificationSaved) {
      setNotificationSaved(false)
    } else {
      setNotificationSaved(true)
    }
  }

  return (
    <div className="px-4 py-6 sm:p-6">
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                avasound.io/
              </span>
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="username"
                className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                defaultValue={user.handle}
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About
            </label>
            <div className="mt-1">
              <textarea
                id="userBio"
                name="userBio"
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Brief description for your profile.
            </p>
          </div>

          {/* Cover Art */}
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Header
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="coverImg"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload Header</span>
                      <input
                        id="coverImg"
                        name="coverImg"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Foto */}

        <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
          <p className="text-sm font-medium text-gray-700" aria-hidden="true">
            Photo
          </p>
          <div className="mt-1 lg:hidden">
            <div className="flex items-center">
              <div
                className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <img
                  className="h-full w-full rounded-full"
                  src={userImg}
                  alt=""
                />
              </div>
              <div className="ml-5 rounded-md shadow-sm">
                <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:bg-gray-50">
                  <label
                    htmlFor="mobile-user-photo"
                    className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                  >
                    <span>Change</span>
                    <span className="sr-only">Change photo</span>
                  </label>
                  <input
                    id="userImg"
                    name="userImg"
                    type="file"
                    className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-full lg:block">
            <img
              className="relative h-40 w-40 rounded-full"
              src={userImg}
              alt=""
            />
            <label
              htmlFor="desktop-user-photo"
              className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
            >
              <span>Change</span>
              <span className="sr-only"> user photo</span>
              <input
                type="file"
                id="userImg"
                name="userImg"
                className="absolute inset-0 z-50 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Artist Name
          </label>
          <input
            type="text"
            name="artistName"
            id="artistName"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            autoComplete="given-name"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          />
        </div> */}

        <div className="col-span-12">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <input
            type="text"
            name="userUrl"
            id="userUrl"
            value={userUrl}
            onChange={(e) => setUserUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          />
        </div>

        {/* <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            autoComplete="organization"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          />
        </div> */}
      </div>
      <div className="pb-8 pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className={`rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
            onClick={() => {
              router.push('/profile')
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            onClick={saveProfile}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
