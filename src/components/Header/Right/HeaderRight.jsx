import HeaderNetwork from './HeaderNetwork'
import HeaderAccount from './HeaderAccount'
import WalletPopover from './WalletPopover'
// import ImgPopover from './ImgPopover'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'

export default function Index() {
  const { user } = useMoralis()

  function switchNetwork() {
    alert('network switched')
  }
  return (
    <div className="flex flex-row items-center space-x-2">
      <div onClick={switchNetwork} className="hidden xl:flex">
        <HeaderNetwork />
      </div>
      <div
        onClick={switchNetwork}
        className="flex cursor-pointer rounded-full p-1 xl:hidden"
      >
        <Image src={'/avaxlogo.png'} width={30} height={30} />
      </div>
      <div className="hidden xl:flex">
        <WalletPopover />
      </div>
      <div className="flex cursor-pointer rounded-full p-1 xl:hidden">
        <Image
          src={user.get('userImg')}
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
    </div>
  )
}
