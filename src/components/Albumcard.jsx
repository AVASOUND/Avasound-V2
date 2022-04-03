import { ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'

export default function Albumcard() {
  const router = useRouter()
  function openAlbum() {
    // router.push(`/album/${albumId}`);
    router.push(`/album/`)
  }
  function openProfile() {
    // router.push(`/profile/${userId}`);

    router.push('/profile')
  }

  function itemAction() {
    alert('purchase in action')
    //either buy item
    // or add to cart
  }
  return (
    <div className="relative my-4 flex h-60 w-56 flex-col items-center justify-start overflow-hidden rounded-lg bg-white shadow-xl sm:mx-4 lg:mx-8">
      <div className="relative w-full">
        {/* <div className="absolute flex items-end left-1 top-1 z-50 bg-[#f5f5f5] w-5 h-5">
          <ShoppingCartIcon className="w-5 h-5" />
        </div> */}
      </div>
      <Image width={175} height={175} src={'/avso-logo.png'} />
      <div className="flex w-11/12 flex-col space-y-2">
        <div className="mt-2 flex flex-row items-center justify-between text-xs">
          <h1
            className="mx-4 mt-1 flex cursor-pointer items-start text-xs font-bold hover:text-black"
            onClick={openAlbum}
          >
            Aiden - Seek Discomfort
          </h1>
          {/* <div className="flex cursor-pointer" onClick={itemAction}>
            <ShoppingCartIcon className="mr-4 h-4 w-4" />
          </div> */}
        </div>

        <div className="mx-4 mt-1 flex flex-row items-center justify-between text-xs">
          <p
            className="cursor-pointer text-xs hover:text-black"
            onClick={openProfile}
          >
            Casual Gabberz
          </p>
          <p className="flex whitespace-nowrap">10 USDC</p>
        </div>
      </div>
    </div>
  )
}
