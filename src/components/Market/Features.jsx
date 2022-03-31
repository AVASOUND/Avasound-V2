import Albumcard from '../Albumcard'

export default function Features() {
  return (
    <div className="w-full py-8 sm:py-24 lg:py-8 lg:px-8">
      <div className="flex items-center justify-between px-4 sm:px-4 lg:px-4">
        <h2
          id="trending-heading"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Featured Albums
        </h2>
      </div>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex ">
          <div className="mt-8 flex w-full max-w-6xl flex-wrap items-center justify-evenly">
            <Albumcard />
            <Albumcard />
            <Albumcard />
            <Albumcard />
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
      </main>
    </div>
  )
}
