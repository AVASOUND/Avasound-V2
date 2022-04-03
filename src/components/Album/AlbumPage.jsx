import ProductOverview from '../../Test/ProductOverview'

export default function AlbumPage() {
  return (
    <div className="flex h-full w-9/12 rounded-b-xl bg-white">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-0 flex flex-1 overflow-hidden">
          {/* <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last"> */}
          <ProductOverview />
        </div>
      </div>
    </div>
  )
}
