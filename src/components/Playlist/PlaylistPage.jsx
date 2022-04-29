import ProductOverview from '../../Test/ProductOverview'

export default function AlbumPage() {
  return (
    <div className="flex h-full w-full rounded-b-xl bg-white xl:w-9/12">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <ProductOverview />
        </div>
      </div>
    </div>
  )
}
