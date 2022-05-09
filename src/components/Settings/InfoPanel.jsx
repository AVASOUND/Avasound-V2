import { XIcon } from '@heroicons/react/outline'

export default function InfoPanel(props) {
  return (
    <div className="relative z-50 w-full bg-white shadow sm:rounded-lg">
      <div className="absolute z-50 rounded-xl bg-[#f5f5f5] px-4 py-5 shadow-xl sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {/* Delete your account */}
          {props.title}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{props.description}</p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-100 px-4 py-2 font-medium text-teal-700 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-sm"
            onClick={() => {
              props.handleModal(false)
            }}
          >
            <XIcon className="h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
