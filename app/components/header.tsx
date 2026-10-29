import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
export interface IHeaderProps {
  title: string
  subtitle?: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}
const Header: FC<IHeaderProps> = ({
  title,
  subtitle,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    <div className="shrink-0 flex items-center justify-between h-16 px-3 pc:px-6 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className='flex items-center gap-3'>
        {isMobile && (
          <div
            className='flex items-center justify-center h-9 w-9 rounded-lg cursor-pointer hover:bg-gray-100'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-5 w-5 text-gray-500" />
          </div>
        )}
        <img
          src="/logo.svg"
          alt={title}
          className='w-10 h-10 rounded-xl shadow-md shadow-indigo-200/70'
        />
        <div className='leading-tight'>
          <div className="text-[15px] font-semibold text-gray-900">{title}</div>
          {subtitle && <div className="hidden tablet:block mt-0.5 text-[11px] text-gray-400">{subtitle}</div>}
        </div>
      </div>
      {isMobile
        ? (
          <div className='flex items-center justify-center h-9 w-9 rounded-lg cursor-pointer hover:bg-gray-100' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-5 w-5 text-gray-500" />
          </div>)
        : (
          <div
            className='flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 cursor-pointer transition hover:bg-indigo-100 hover:shadow-sm'
            onClick={() => onCreateNewChat?.()}
          >
            <PlusIcon className="h-4 w-4" />
            新对话
          </div>
        )}
    </div>
  )
}

export default React.memo(Header)
