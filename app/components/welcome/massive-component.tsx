'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  AcademicCapIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  MapIcon,
  PencilIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import s from './style.module.css'
import type { AppInfo } from '@/types/app'

const FEATURES = [
  { icon: MapIcon, label: '职业方向梳理' },
  { icon: DocumentTextIcon, label: '简历优化建议' },
  { icon: AcademicCapIcon, label: '校招面试备战' },
  { icon: RocketLaunchIcon, label: '转行路径规划' },
]

export const AppInfoComp: FC<{ siteInfo: AppInfo }> = ({ siteInfo }) => {
  return (
    <div className='relative'>
      <div className='pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 opacity-70 blur-2xl' />
      <div className='relative'>
        <div className='flex items-start gap-4'>
          <img
            src='/logo.svg'
            alt={siteInfo.title}
            className='w-14 h-14 tablet:w-16 tablet:h-16 shrink-0 rounded-2xl shadow-lg shadow-indigo-200/70'
          />
          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <h1 className='text-xl tablet:text-2xl font-bold tracking-tight text-gray-900'>{siteInfo.title}</h1>
              <span className='inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-600'>
                <SparklesIcon className='w-3.5 h-3.5' />
                AI 职业导师
              </span>
            </div>
            <p className='mt-2 text-sm leading-6 text-gray-500'>{siteInfo.description}</p>
          </div>
        </div>
        <div className='mt-5 grid grid-cols-2 gap-2 tablet:grid-cols-4'>
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className='flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2.5 text-xs font-medium text-gray-600'
            >
              <Icon className='w-4 h-4 shrink-0 text-indigo-500' />
              <span className='truncate'>{label}</span>
            </div>
          ))}
        </div>
        <div className='mt-4 flex items-start gap-2 rounded-xl bg-indigo-50/70 px-3 py-2.5 text-xs leading-5 text-indigo-600'>
          <InformationCircleIcon className='mt-0.5 w-4 h-4 shrink-0' />
          <span>支持上传 PDF 简历，我会结合你的履历给出更贴合的定制建议。</span>
        </div>
      </div>
    </div>
  )
}

export const PromptTemplate: FC<{ html: string }> = ({ html }) => {
  return (
    <div
      className={' box-border text-sm text-gray-700'}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}

export const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.75 1C2.75 0.723858 2.52614 0.5 2.25 0.5C1.97386 0.5 1.75 0.723858 1.75 1V1.75H1C0.723858 1.75 0.5 1.97386 0.5 2.25C0.5 2.52614 0.723858 2.75 1 2.75H1.75V3.5C1.75 3.77614 1.97386 4 2.25 4C2.52614 4 2.75 3.77614 2.75 3.5V2.75H3.5C3.77614 2.75 4 2.52614 4 2.25C4 1.97386 3.77614 1.75 3.5 1.75H2.75V1Z" fill="#444CE7" />
    <path d="M2.75 8.5C2.75 8.22386 2.52614 8 2.25 8C1.97386 8 1.75 8.22386 1.75 8.5V9.25H1C0.723858 9.25 0.5 9.47386 0.5 9.75C0.5 10.0261 0.723858 10.25 1 10.25H1.75V11C1.75 11.2761 1.97386 11.5 2.25 11.5C2.52614 11.5 2.75 11.2761 2.75 11V10.25H3.5C3.77614 10.25 4 10.0261 4 9.75C4 9.47386 3.77614 9.25 3.5 9.25H2.75V8.5Z" fill="#444CE7" />
    <path d="M6.96667 1.32051C6.8924 1.12741 6.70689 1 6.5 1C6.29311 1 6.10759 1.12741 6.03333 1.32051L5.16624 3.57494C5.01604 3.96546 4.96884 4.078 4.90428 4.1688C4.8395 4.2599 4.7599 4.3395 4.6688 4.40428C4.578 4.46884 4.46546 4.51604 4.07494 4.66624L1.82051 5.53333C1.62741 5.60759 1.5 5.79311 1.5 6C1.5 6.20689 1.62741 6.39241 1.82051 6.46667L4.07494 7.33376C4.46546 7.48396 4.578 7.53116 4.6688 7.59572C4.7599 7.6605 4.8395 7.7401 4.90428 7.8312C4.96884 7.922 5.01604 8.03454 5.16624 8.42506L6.03333 10.6795C6.1076 10.8726 6.29311 11 6.5 11C6.70689 11 6.89241 10.8726 6.96667 10.6795L7.83376 8.42506C7.98396 8.03454 8.03116 7.922 8.09572 7.8312C8.1605 7.7401 8.2401 7.6605 8.3312 7.59572C8.422 7.53116 8.53454 7.48396 8.92506 7.33376L11.1795 6.46667C11.3726 6.39241 11.5 6.20689 11.5 6C11.5 5.79311 11.3726 5.60759 11.1795 5.53333L8.92506 4.66624C8.53454 4.51604 8.422 4.46884 8.3312 4.40428C8.2401 4.3395 8.1605 4.2599 8.09572 4.1688C8.03116 4.078 7.98396 3.96546 7.83376 3.57494L6.96667 1.32051Z" fill="#444CE7" />
  </svg>
)

export const ChatBtn: FC<{ onClick: () => void, className?: string }> = ({
  className,
  onClick,
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        className,
        'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 shadow-lg shadow-indigo-200/80 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200/90',
      )}
      onClick={onClick}
    >
      <ChatBubbleLeftRightIcon className='w-5 h-5' />
      {t('app.chat.startChat')}
      <ArrowRightIcon className='w-4 h-4' />
    </div>
  )
}

export const EditBtn = ({ className, onClick }: { className?: string, onClick: () => void }) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn('px-2 py-1 flex space-x-1 items-center rounded-md cursor-pointer hover:bg-indigo-50', className)}
      onClick={onClick}
    >
      <PencilIcon className='w-3 h-3' />
      <span>{t('common.operation.edit')}</span>
    </div>
  )
}

export const FootLogo = () => (
  <div className={s.logo} />
)
