'use client'
import type { FC, ReactNode } from 'react'
import React from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { StarIcon } from '@/app/components//welcome/massive-component'
import Button from '@/app/components/base/button'

export interface ITemplateVarPanelProps {
  className?: string
  header: ReactNode
  children?: ReactNode | null
  isFold: boolean
}

const TemplateVarPanel: FC<ITemplateVarPanelProps> = ({
  className,
  header,
  children,
  isFold,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border overflow-hidden bg-white',
        isFold ? 'border-indigo-100 shadow-sm' : 'border-gray-100 shadow-[0_24px_70px_-30px_rgba(79,70,229,0.35)]',
        className,
      )}
    >
      {/* header */}
      <div className='px-6 tablet:px-8 py-5 text-xs'>
        {header}
      </div>
      {/* body */}
      {!isFold && children && (
        <div className='px-6 tablet:px-8 pb-7'>
          {children}
        </div>
      )}
    </div>
  )
}

export const PanelTitle: FC<{ title: string, className?: string }> = ({
  title,
  className,
}) => {
  return (
    <div className={cn(className, 'flex items-center space-x-1 text-indigo-600')}>
      <StarIcon />
      <span className='text-xs'>{title}</span>
    </div>
  )
}

export const VarOpBtnGroup: FC<{ className?: string, onConfirm: () => void, onCancel: () => void }> = ({
  className,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation()

  return (
    <div className={cn(className, 'flex mt-3 space-x-2 mobile:ml-0 tablet:ml-[128px] text-sm')}>
      <Button
        className='text-sm'
        type='primary'
        onClick={onConfirm}
      >
        {t('common.operation.save')}
      </Button>
      <Button
        className='text-sm'
        onClick={onCancel}
      >
        {t('common.operation.cancel')}
      </Button>
    </div >
  )
}

export default React.memo(TemplateVarPanel)
