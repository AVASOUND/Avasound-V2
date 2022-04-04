import { CashIcon, PlayIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Albumcard from '../Album/Albumcard'

export default function Features() {
  const { Moralis, user } = useMoralis()

  // CONTENT / ITEMS
  const [content, setContent] = useState([])
  const [likedBy, setLikedBy] = useState(false)

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

  function likeAction() {
    // lens like
    setLikedBy(true)
  }

  function playAction() {
    // howler.js play functionality
  }

  function buyAction() {
    // buyItem Call
  }
  function disLike() {
    setLikedBy(false)
    // revert Like
  }

  return (
    <div className="w-full py-8 sm:py-24 lg:py-8 lg:px-8">
      <div className="flex items-center justify-between px-4 sm:px-4 lg:px-4">
        <h2
          id="trending-heading"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Featured Albums
        </h2>
      </div>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex ">
          <ul className="mt-8 flex w-full max-w-6xl flex-wrap items-center justify-evenly">
            {content.map((data, index) => (
              <li
                key={index}
                className="relative m-1 mb-4  rounded-lg bg-white p-1 px-4 shadow-lg sm:px-0"
              >
                <Albumcard data={data} key={index} />
                <div className="flex w-full flex-row items-center justify-evenly ">
                  {likedBy ? (
                    <HeartIcon
                      className="mb-2 h-5 cursor-pointer text-red-500"
                      onClick={disLike}
                    />
                  ) : (
                    <HeartIcon
                      className="mb-2 h-5 cursor-pointer text-gray-500"
                      onClick={likeAction}
                    />
                  )}
                  <PlayIcon
                    className="mb-2 h-5 cursor-pointer"
                    onClick={playAction}
                  />
                  <CashIcon
                    className="mb-2 h-5 cursor-pointer"
                    onClick={buyAction}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
