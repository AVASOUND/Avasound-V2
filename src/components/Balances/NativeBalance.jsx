import { useMoralis, useNativeBalance } from 'react-moralis'

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props)
  const { account, isAuthenticated } = useMoralis()

  if (!account || !isAuthenticated) return null

  return (
    <div className="mt-2 flex w-6/12 flex-row items-center space-x-8 text-sm text-gray-500">
      <div className="ml-4 flex w-6/12 flex-row items-center">
        <div className="text-sm text-gray-500">AVAX</div>
        {/* <Image src={'/avaxlogo.png'} height={15} width={15} /> */}
      </div>
      <div className="text-sm text-gray-500">{balance.formatted}</div>
    </div>
  )
}

export default NativeBalance
