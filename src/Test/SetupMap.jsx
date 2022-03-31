/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'

const timeline = [
  {
    id: 1,
    content: 'Install',
    target: 'Metamask.',
    href: 'https://metamask.io/',
    date: 'Step 1',
    datetime: '2020-09-20',
    icon: ArrowSmRightIcon,
    iconBackground: 'bg-teal-500',
  },
  {
    id: 2,
    content: 'Add',
    target: 'Avalanche Network',
    href: '#',
    date: 'Step 2',
    datetime: '2020-09-22',
    icon: ArrowSmRightIcon,
    iconBackground: 'bg-teal-500',
  },

  {
    id: 3,
    content: 'Get AVAX via ',
    target: 'Fiat Onramp',
    href: '#',
    date: 'Step 3',
    datetime: '2020-09-30',
    icon: ArrowSmRightIcon,
    iconBackground: 'bg-teal-500',
  },
  //   {
  //     id: 4,
  //     content: 'Optional:',
  //     target: 'Artist Signup',
  //     href: '#',
  //     date: 'Step 4',
  //     datetime: '2020-09-28',
  //     icon: ArrowSmRightIcon,
  //     iconBackground: 'bg-teal-500',
  //   },
  {
    id: 5,
    content: "You're all set",
    target: 'Login with Metamask',
    href: '#',
    date: 'Done !',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-teal-500',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SetupMap() {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white'
                    )}
                  >
                    <event.icon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{' '}
                      <a
                        href={event.href}
                        className="font-medium text-gray-900"
                      >
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
