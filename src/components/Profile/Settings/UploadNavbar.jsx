import { useState } from 'react'

/* This example requires Tailwind CSS v2.0+ */
const steps = [
  { id: 'Step 1', name: 'Record Info', href: '#', status: 'current' },
  { id: 'Step 2', name: 'Upload Tracks', href: '#', status: 'upcoming' },
  { id: 'Step 3', name: 'Mint Items', href: '#', status: 'upcoming' },
  { id: 'Step 4', name: 'Approve & List', href: '#', status: 'upcoming' },
]

export default function Example() {
  const [step, setStep] = useState('Step 1')

  return (
    <nav aria-label="Progress" className="mt-8 w-9/12">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === 'complete' ? (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-teal-600 py-2 pl-4 hover:border-teal-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-teal-600 group-hover:text-teal-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a
                href={step.href}
                className="flex flex-col border-l-4 border-teal-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
