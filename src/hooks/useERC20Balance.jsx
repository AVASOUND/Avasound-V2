import { useERC20Balances } from 'react-moralis'
import { useMoralis } from 'react-moralis'

const ERC20Balances = (props) => {
  const { data, error } = useERC20Balances()
  const { Moralis } = useMoralis()

  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      {data
        ? data.map((element, index) => (
            <div
              className="z-50 mt-4 mb-4 flex w-48 flex-row items-center justify-evenly rounded-full border-2 border-teal-300/50 bg-black p-2 text-teal-300 opacity-95 shadow-2xl"
              key={index}
            >
              <img
                src={'https://snowtrace.io/images/main/empty-token.png'}
                // || "https://snowtrace.io/images//empty-token.png" }
                alt="nologo"
                width="25px"
                height="25px"
                className="rounded-full"
              />
              <span>
                {parseFloat(
                  Moralis?.Units?.FromWei(element.balance, element.decimals)
                ).toFixed(5)}
              </span>
              <span>{element.symbol}</span>
            </div>
          ))
        : ''}
    </div>
  )
}

export default ERC20Balances
