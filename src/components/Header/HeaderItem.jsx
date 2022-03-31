export default function HeaderItem({ Icon, title }) {
  return (
    <div className="group flex  cursor-pointer flex-col items-center text-base font-medium hover:text-teal-300 sm:w-20">
      <Icon className="mb-1 h-5 group-hover:animate-pulse" />
      <p className="text-sm tracking-widest ">{title}</p>
    </div>
  )
}
