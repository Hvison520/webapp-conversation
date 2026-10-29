'use client'
import type { FC } from 'react'
import React from 'react'
import type { IChatItem } from '../type'
import s from '../style.module.css'

import StreamdownMarkdown from '@/app/components/base/streamdown-markdown'
import ImageGallery from '@/app/components/base/image-gallery'

type IQuestionProps = Pick<IChatItem, 'id' | 'content' | 'useCurrentUserAvatar'> & {
  imgSrcs?: string[]
}

const Question: FC<IQuestionProps> = ({ id, content, useCurrentUserAvatar, imgSrcs }) => {
  const userName = ''
  return (
    <div className='flex items-start justify-end gap-3' key={id}>
      <div className={`${s.question} relative min-w-0 max-w-[calc(100%-3.5rem)] text-sm text-white`}>
        <div
          className={`${s.questionBubble} px-4 py-3 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 rounded-2xl rounded-tr-md shadow-lg shadow-indigo-200/70`}
        >
          {imgSrcs && imgSrcs.length > 0 && (
            <ImageGallery srcs={imgSrcs} />
          )}
          <StreamdownMarkdown content={content} />
        </div>
      </div>
      {useCurrentUserAvatar
        ? (
          <div className='w-10 h-10 shrink-0 leading-10 text-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-semibold shadow-lg shadow-orange-200/70'>
            {userName?.[0].toLocaleUpperCase()}
          </div>
        )
        : (
          <div className={`${s.questionIcon} w-10 h-10 shrink-0`} />
        )}
    </div>
  )
}

export default React.memo(Question)
