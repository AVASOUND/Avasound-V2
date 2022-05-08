import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import PlaylistItem from '../../Test/PlaylistItem'

export default function Spotlight() {
  const { Moralis, user } = useMoralis()

  // CONTENT / ITEMS
  const [content, setContent] = useState([])

  useEffect(() => {
    if (user) {
      const Album = Moralis.Object.extend('Album')
      const query = new Moralis.Query(Album)
      // query.equalTo('address', user.get('ethAddress'))
      query.limit(4)
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
    <div className="my-8">
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
    </div>
  )
}
