'use client'
import type { FC } from 'react'
import React from 'react'
import type { IChatItem } from '../type'
import s from '../style.module.css'

import StreamdownMarkdown from '@/app/components/base/streamdown-markdown'
import ImageGallery from '@/app/components/base/image-gallery'

type IQuestionProps = Pick<IChatItem, 'id' | 'content'> & {
  imgSrcs?: string[]
}

const Question: FC<IQuestionProps> = ({ id, content, imgSrcs }) => {
  return (
    <div className='flex justify-end' key={id}>
      <div className={`${s.question} relative min-w-0 max-w-[85%] text-sm text-white`}>
        <div
          className={`${s.questionBubble} px-4 py-3 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 rounded-2xl rounded-tr-md shadow-lg shadow-indigo-200/60`}
        >
          {imgSrcs && imgSrcs.length > 0 && (
            <ImageGallery srcs={imgSrcs} />
          )}
          <StreamdownMarkdown content={content} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Question)
