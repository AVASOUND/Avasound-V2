import { useEffect, useState } from 'react'
import { useMoralis, useNativeBalance } from 'react-moralis'

export default function HeaderAccount(props) {
  const { data: balance } = useNativeBalance(props)

  const { user } = useMoralis()

  const [userEthAdd, setUserEthAdd] = useState('')
  const [userBalance, setUserBalance] = useState('')

  useEffect(() => {
    if (user) {
      setUserEthAdd(
        user.get('ethAddress').slice(0, 4).concat('...') +
          user.get('ethAddress').slice(38, 42)
      )
      setUserBalance(balance.formatted)
    }
  }, [])

  return (
    <div
      onClick={() => {
        navigator.clipboard.writeText(user.get('ethAddress'))
      }}
      className={` group flex cursor-pointer flex-row items-center justify-center rounded-full p-2 px-3 text-xs font-semibold ring-1 ring-black hover:underline active:text-zinc-800`}
    >
      <p className="">{userEthAdd}</p>
      &nbsp;
      <p>|</p>&nbsp;
      <p>{userBalance}</p> &nbsp;
    </div>
  )
}
