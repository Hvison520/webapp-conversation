import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon } from '@heroicons/react/24/solid'
// import Card from './card'
import type { ConversationItem } from '@/types/app'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export interface ISidebarProps {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
}

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
}) => {
  const { t } = useTranslation()
  return (
    <div
      className="shrink-0 flex flex-col overflow-y-auto bg-gray-50/70 pc:w-[248px] tablet:w-[200px] mobile:w-[248px] border-r border-gray-100 tablet:h-[calc(100vh_-_4rem)] mobile:h-screen"
    >
      {list.length < MAX_CONVERSATION_LENTH && (
        <div className="flex flex-shrink-0 p-4 !pb-0">
          <div
            onClick={() => { onCurrentIdChange('-1') }}
            className="group flex w-full flex-shrink-0 items-center gap-2 h-10 px-3 rounded-xl bg-white border border-gray-200 text-sm font-medium text-indigo-600 cursor-pointer shadow-sm transition hover:border-indigo-200 hover:shadow-md"
          >
            <PencilSquareIcon className="h-4 w-4" /> {t('app.chat.newChat')}
          </div>
        </div>
      )}

      <div className='px-4 pt-5 pb-2 text-[11px] font-medium uppercase tracking-wider text-gray-400'>
        历史对话
      </div>

      <nav className="flex-1 space-y-1.5 bg-transparent px-3 pb-4">
        {list.map((item) => {
          const isCurrent = item.id === currentId
          const ItemIcon
            = isCurrent ? ChatBubbleOvalLeftEllipsisSolidIcon : ChatBubbleOvalLeftEllipsisIcon
          return (
            <div
              onClick={() => onCurrentIdChange(item.id)}
              key={item.id}
              className={classNames(
                isCurrent
                  ? 'bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-600 ring-1 ring-indigo-100'
                  : 'text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-sm',
                'group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer transition',
              )}
            >
              <ItemIcon
                className={classNames(
                  isCurrent
                    ? 'text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'h-[18px] w-[18px] flex-shrink-0',
                )}
                aria-hidden="true"
              />
              <span className='truncate'>{item.name}</span>
            </div>
          )
        })}
      </nav>
      <div className="flex flex-shrink-0 px-4 pb-4">
        <div className="text-[11px] text-gray-400">© {copyRight} {(new Date()).getFullYear()}</div>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
