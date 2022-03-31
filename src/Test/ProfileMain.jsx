import Image from 'next/image'
import { useMoralis } from 'react-moralis'

export default function PorfileMain() {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    user,
  } = useMoralis()
  const header = '/header.png'
  const profileImage = '/profileImage.png'

  if (!isAuthenticated) return <Login />
  return (
    <main className="scrollbar-hide h-screen w-full overflow-hidden overflow-y-scroll">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex h-max w-8/12 flex-col items-center bg-black bg-opacity-60">
          {/* <div className=" w-8/12 items-center flex flex-col h-screen"> */}
          {/* Profile Banner */}
          <Image src={header} width={850} height={200} />
          <div className="flex flex-col items-center">
            <div className="flex w-full flex-row items-center rounded-full bg-gradient-to-r from-transparent via-white to-transparent">
              {/* <div className="absolute">
            <Image
              src={profileImage}
              width={100}
              height={100}
              className=" rounded-full"
            />
          </div> */}
              <div className="flex w-full items-center justify-center text-4xl italic text-gray-800">
                <p>{user.get('username')}</p>
              </div>
            </div>
            {/* <ProfileNavbar /> */}
            {/* <nav className="flex w-full flex-row items-center justify-center space-x-24 bg-black bg-opacity-80 text-white">
              {isMusic ? (
                <button className="text-teal-300 underline">COLLECTION</button>
              ) : (
                <button onClick={seeMusic}>COLLECTION</button>
              )}
              {isInfo ? (
                <button className="text-teal-300 underline">INFO</button>
              ) : (
                <button onClick={seeInfo}>INFO</button>
              )}
              {isUpload ? (
                <button className="text-teal-300 underline">
                  Upload Music
                </button>
              ) : (
                <button onClick={seeUpload}>Upload Music</button>
              )}
            </nav> */}
            {/* {isInfo ? (
              <div className="my-8 flex w-6/12 flex-col items-center justify-center text-[#f5f5f5]">
                <div className="flex w-full flex-wrap items-center justify-evenly">
                  <div
                    className="mb-8 flex w-24 cursor-pointer flex-row items-center justify-center rounded-full bg-black"
                    onClick={editUser}
                  >
                    <button>edit user</button>
                  </div>
                  <p>
                    Gestalt is about the love to electronic dance music and
                    urban culture. Six years ago, Gestalt started to produce
                    drum and bass & beats. Original known since 2014 under his
                    old alias „Sinus “, he was playing DJ shows beside names
                    like Camo & Krooked, Alix Perez, Skeptical, DJ Hype and many
                    more.
                  </p>
                </div>
              </div>
            ) : (
              ''
            )}
            {isMusic ? (
              <div className="flex w-full flex-col items-center justify-center overflow-hidden overflow-y-scroll">
                <div className="mt-16 flex w-full flex-wrap items-center justify-evenly">
                  <Albumcard />
                  <Albumcard />
                  <Albumcard />
                  <Albumcard />
                  <Albumcard />
                  <Albumcard />
                  <Albumcard />
                  <Albumcard />
                </div>
              </div>
            ) : (
              ''
            )} */}
            {/* {isCommunity ? (
            <div className="flex flex-col items-center justify-center w-full overflow-hidden overflow-y-scroll">
              <div className="flex w-full flex-wrap items-center justify-evenly mt-16">
                <Socialcard title={"Soundcloud"} Icon={CloudIcon} />
                <Socialcard title={"Discord"} Icon={ExternalLinkIcon} />
                <Socialcard title={"Instagram"} Icon={ExternalLinkIcon} />
                <Socialcard title={"Instagram"} Icon={ExternalLinkIcon} />
              </div>
            </div>
          ) : (
            ""
          )} */}
          </div>
        </div>
        {/* Social Media Links */}
      </div>
    </main>
  )
}
