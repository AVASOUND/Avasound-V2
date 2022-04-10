import { PlayIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'

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
    // <div className="relative my-4 flex h-60 w-56 flex-col items-center justify-start overflow-hidden rounded-lg bg-white shadow-xl sm:mx-4 lg:mx-8">
    //   <div className="relative w-full">
    //     {/* <div className="absolute flex items-end left-1 top-1 z-50 bg-[#f5f5f5] w-5 h-5">
    //       <ShoppingCartIcon className="w-5 h-5" />
    //     </div> */}
    //   </div>

    //   <div className="h-44 w-44">
    //     <Image
    //       width={175}
    //       height={175}
    //       src={'/wmex.png'}
    //       className="hover:opacity-50"
    //     />
    //     <label
    //       htmlFor="desktop-user-photo"
    //       className=" absolute inset-0 left-6 flex h-44 w-44 items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
    //     >
    //       <span>
    //         <PlayIcon className="h-8 text-white" />
    //       </span>
    //       <span className="sr-only">Play</span>
    //       {/* PLAY BUTTON */}
    //       <div
    //         // type="file"
    //         // id="userImg"
    //         // name="userImg"
    //         className="absolute inset-0 z-50 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
    //         onClick={() => {
    //           alert('play music')
    //         }}
    //       />
    //     </label>
    //   </div>
    //   <div className="flex w-11/12 flex-col space-y-2">
    //     <div className="mt-2 flex flex-row items-center justify-between text-xs">
    //       <h1
    //         className="mx-4 mt-1 flex cursor-pointer items-start text-xs font-bold hover:text-black hover:underline"
    //         onClick={openAlbum}
    //       >
    //         Aiden - Seek Discomfort
    //       </h1>
    //       {/* <div className="flex cursor-pointer" onClick={itemAction}>
    //         <ShoppingCartIcon className="mr-4 h-4 w-4" />
    //       </div> */}
    //     </div>

    //     <div className="mx-4 mt-1 flex flex-row items-center justify-between text-xs">
    //       <p
    //         className="cursor-pointer text-xs hover:text-black"
    //         onClick={openProfile}
    //       >
    //         Casual Gabberz
    //       </p>
    //       <p className="flex whitespace-nowrap">10 USDC</p>
    //     </div>
    //   </div>
    // </div>
    <div className="flex w-full flex-row items-center justify-between border-gray-400 bg-[#f5f5f5]">
      <div className="flex w-6/12 flex-row items-center">
        <Image
          width={50}
          height={50}
          src={'/wmex.png'}
          className="border-2 border-white"
        />

        <h1
          className="mx-4 mt-1 flex cursor-pointer items-start text-xs font-bold hover:text-black hover:underline"
          onClick={openAlbum}
        >
          Aiden - Seek Discomfort
        </h1>
      </div>
    </div>
  )
}
