import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export default function HeaderAccount() {
  const { user } = useMoralis()

  const [userEthAdd, setUserEthAdd] = useState('')
  const [userBalance, setUserBalance] = useState('200')

  useEffect(() => {
    if (user) {
      setUserEthAdd(
        user.get('ethAddress').slice(0, 4).concat('...') +
          user.get('ethAddress').slice(38, 42)
      )
    }
  }, [])

  return (
    <div
      onClick={() => {
        navigator.clipboard.writeText(user.get('ethAddress'))
      }}
      className={` group flex cursor-pointer flex-row items-center justify-center rounded-full p-1 px-3 ring-1 ring-black hover:underline active:text-zinc-800`}
    >
      <p className="">{userEthAdd}</p>
      &nbsp;
      <p>|</p>&nbsp;
      <p>{userBalance}</p> &nbsp;
      <p>{''}USDC</p>
    </div>
  )
}