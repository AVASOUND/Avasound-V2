import PlaylistOverview from './PlaylistOverview'

export default function AlbumPage() {
  return (
    <div className="flex h-full w-full rounded-xl bg-white">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div
          className="relative z-0
        mb-16 flex flex-1 overflow-hidden"
        >
          <PlaylistOverview />
        </div>
      </div>
    </div>
  )
}
