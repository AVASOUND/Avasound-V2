import { Listbox, Transition } from '@headlessui/react'
import { PlusCircleIcon, SelectorIcon } from '@heroicons/react/outline'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import InfoPanel from './InfoPanel'

export default function ProfileSettings(props) {
  // Moralis Hooks
  const { user, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  // State Variables for Info Icons
  const [showArtistInfo, setShowArtistInfo] = useState(false)
  const [showPriceInfo, setShowPriceInfo] = useState(false)
  const [showTotalCopies, setShowTotalCopies] = useState(false)

  // State Variables for Genre
  const [selectedGenre, setSelectedGenre] = useState()
  const [selectGenreId, setSelectGenreId] = useState(new Map())

  const [genre, setGenre] = useState([])

  // Genre Selector UseEffect
  useEffect(() => {
    const Genres = Moralis.Object.extend('Genres')
    const query = new Moralis.Query(Genres)
    query.find().then((results) => {
      let r = []
      let rmap = new Map()
      results.forEach((result) => {
        r.push({ id: result.id, Genre: result.get('genre') })
        rmap[result.get('Genre')] = result.id
      })
      setGenre(r)
      setSelectGenreId(rmap)
      console.log(r)
    })
  }, [])

  // STEP 1
  async function completeStep(e) {
    e.preventDefault()
    const recordTitle = document.getElementById('recordTitle').value
    const owner = user.get('ethAddress')
    const recordCover = document.getElementById('recordCover').files[0]
    const recordPrice = document.getElementById('recordPrice').value
    const recordNumber = document.getElementById('recordNumber').value

    let ipfsCover = ''

    if (recordCover) {
      console.log('uploading Record Cover')
      await saveFile('recordCover', recordCover, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsCover = hash._ipfs
        }
      )
    }

    const Genres = Moralis.Object.extend('Genres')
    const gen = new Genres()
    gen.set('objectId', selectGenreId[selectedGenre])

    const Record = new Moralis.Object.extend('Record')
    const record = new Record()
    record.set('recordTitle', recordTitle)
    record.set('recordCover', ipfsCover)
    record.set('owner', owner)
    record.set('genre', gen)
    record.set('recordPrice', recordPrice)
    record.set('recordNumber', recordNumber)
    record.save().then(() => {
      // setNotificationSaved(true)
      props.handleStep('2')
    })
  }

  //   useEffect(() => {
  //     if (stepDone) {
  //       handleStep(true)
  //     }
  //   })

  //  STEP BACK

  return (
    <div className="w-11/12 py-6 px-4 sm:p-6 lg:pb-8">
      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Record Title
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="recordTitle"
                id="recordTitle"
                autoComplete="recordtitle"
                className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="flex flex-row text-sm font-medium text-gray-700"
            >
              Artist
              <InformationCircleIcon
                className="ml-2 h-3 cursor-pointer text-teal-500"
                onClick={() => {
                  setShowArtistInfo(true)
                }}
              />
              {showArtistInfo && (
                <InfoPanel
                  handleModal={setShowArtistInfo}
                  title={'Artist'}
                  description={'Provide the name of the Artist.'}
                />
              )}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="recordTitle"
                id="recordTitle"
                autoComplete="recordtitle"
                className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
          </div>

          {/* COVER */}
          <div className="mt-6 grid grid-cols-12 items-center gap-6">
            <div className="col-span-12">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Artwork
              </label>
              <div className="flex w-full  flex-row items-center space-x-4">
                <label
                  htmlFor="recordCover"
                  className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-teal-600 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                >
                  <span className="flex w-full flex-row items-center justify-between">
                    <PlusCircleIcon className="h-5" />
                    <p>Upload PNG or JPG</p>
                  </span>
                  <input
                    id="recordCover"
                    name="recordCover"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="cover-photo"
              className="flex flex-row text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Price per Record
              <InformationCircleIcon
                className="ml-2 h-3 cursor-pointer text-teal-500"
                onClick={() => {
                  setShowPriceInfo(true)
                }}
              />
            </label>
            <div>
              {showPriceInfo && (
                <InfoPanel
                  handleModal={setShowPriceInfo}
                  title={'Price per Record'}
                  description={
                    'A USD amount for each copy sold on the marketplace'
                  }
                />
              )}
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="recordPrice"
                  id="recordPrice"
                  placeholder="USD"
                  autoComplete="recordtitle"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* Number of Copies */}
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            {/*  CONSIDER ADDING A SWITCH TO SHOW COPIES AVAILABLE PUBLICLY OR NOT */}
            <label
              htmlFor="cover-photo"
              className="flex flex-row text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Number of Records
              <InformationCircleIcon
                className="ml-2 h-3 cursor-pointer text-teal-500"
                onClick={() => {
                  setShowTotalCopies(true)
                }}
              />
            </label>
            <div>
              {showTotalCopies && (
                <InfoPanel
                  handleModal={setShowTotalCopies}
                  title={'Record Copies'}
                  description={
                    'The total number of records available on the marketplace.'
                  }
                />
              )}
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="recordNumber"
                  id="recordNumber"
                  autoComplete="recordtitle"
                  className="block w-full min-w-0 flex-grow rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* Genre Pick */}
          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Genre
            </label>
            <div className="mt-1">
              <div className="w-full">
                <Listbox value={selectedGenre} onChange={setSelectedGenre}>
                  <div className="relative mt-1 border-gray-500">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#f5f5f5] bg-opacity-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-500 sm:text-sm">
                      <span className="block truncate">
                        {selectedGenre ? selectedGenre : 'Choose Genre'}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {genre.map((gen, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-teal-100 text-teal-900'
                                  : 'text-gray-900'
                              }`
                            }
                            value={gen.Genre}
                          >
                            {({ selectedGenre }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selectedGenre
                                      ? 'font-medium'
                                      : 'font-normal'
                                  }`}
                                >
                                  {gen.Genre}
                                </span>
                                {selectedGenre ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="recordDescription"
                name="recordDescription"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Record description</p>
          </div>

          <div className="pb-16 pt-5">
            <div className="flex justify-end">
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  className=" ml-3 inline-flex rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  onClick={completeStep}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
