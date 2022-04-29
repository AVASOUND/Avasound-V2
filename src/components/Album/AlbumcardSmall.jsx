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
    <div className="relative my-8 mx-2 flex h-36 w-36 flex-col items-center justify-start overflow-hidden rounded-lg bg-[#f5f5f5] shadow-xl sm:mx-2 lg:mx-4">
      <div className="relative w-full"></div>
      <Image width={90} height={90} src={'/avso-logo.png'} />
      <div className="flex w-11/12 flex-col space-y-2">
        <div className="mt-2 flex flex-row items-center justify-between text-xs">
          <h1
            className="mx-4 mt-1 mb-2 flex cursor-pointer items-start text-xs font-bold hover:text-black"
            onClick={openAlbum}
          >
            Aiden - Seek Discomfort
          </h1>
        </div>
      </div>
    </div>
  )
}
