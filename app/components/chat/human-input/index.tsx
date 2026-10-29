'use client'
import type { FC } from 'react'
import React from 'react'
import { BoltIcon } from '@heroicons/react/24/solid'
import type { PendingHumanInput } from '@/types/app'

interface IHumanInputFormProps {
  data: PendingHumanInput
  onSelect: (actionId: string) => void
}

const HumanInputForm: FC<IHumanInputFormProps> = ({ data, onSelect }) => {
  const disabled = !!data.submitting || !!data.submitted
  return (
    <div className='mt-1 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/90 to-violet-50/70 p-4'>
      <div className='flex items-center gap-1.5 text-xs font-semibold text-indigo-600'>
        <BoltIcon className='h-4 w-4' />
        {data.node_title || '需要你的选择'}
      </div>
      <div className='mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700'>{data.form_content}</div>
      <div className='mt-3 flex flex-wrap items-center gap-2'>
        {data.actions.map(action => (
          <button
            key={action.id}
            type='button'
            disabled={disabled}
            onClick={() => onSelect(action.id)}
            className='inline-flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-indigo-600'
          >
            {action.title}
          </button>
        ))}
        {disabled && <span className='text-xs text-indigo-500'>正在继续…</span>}
      </div>
    </div>
  )
}

export default HumanInputForm
