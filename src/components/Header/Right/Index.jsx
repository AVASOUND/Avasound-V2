import HeaderNetwork from './HeaderNetwork'
import HeaderAccount from './HeaderAccount'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'

export default function Index() {
  const { user } = useMoralis()

  function openWallet() {
    alert('opened')
  }

  function switchNetwork() {
    alert('network switched')
  }
  return (
    <div className="flex flex-row items-center space-x-2">
      <div onClick={switchNetwork} className="hidden lg:flex">
        <HeaderNetwork />
      </div>
      <div
        onClick={switchNetwork}
        className="flex cursor-pointer rounded-full p-1 lg:hidden"
      >
        <Image src={'/avaxlogo.png'} width={25} height={25} />
      </div>
      <div onClick={openWallet} className="hidden lg:flex">
        <HeaderAccount />
      </div>
      <div
        onClick={openWallet}
        className="flex cursor-pointer rounded-full p-1 lg:hidden"
      >
        <Image
          src={user.get('userImg')}
          width={25}
          height={25}
          className="rounded-full"
        />
      </div>
    </div>
  )
}
