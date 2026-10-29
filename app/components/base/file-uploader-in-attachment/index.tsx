import {
  RiAttachment2,
  RiUploadCloud2Line,
} from '@remixicon/react'
import { useTranslation } from 'react-i18next'
import { useFile } from './hooks'
import type { FileEntity, FileUpload } from './types'
import {
  FileContextProvider,
  useStore,
} from './store'
import FileInput from './file-input'
import FileItem from './file-item'
import Button from '@/app/components/base/button'
import cn from '@/utils/classnames'

export const AttachmentFileList = ({
  fileConfig,
  className,
}: {
  fileConfig: FileUpload
  className?: string
}) => {
  const files = useStore(s => s.files)
  const {
    handleRemoveFile,
    handleReUploadFile,
  } = useFile(fileConfig)

  if (!files.length) { return null }

  return (
    <div className={cn('space-y-1', className)}>
      {files.map(file => (
        <FileItem
          key={file.id}
          file={file}
          showDeleteAction
          showDownloadAction={false}
          onRemove={() => handleRemoveFile(file.id)}
          onReUpload={() => handleReUploadFile(file.id)}
        />
      ))}
    </div>
  )
}

export const AttachmentFileTrigger = ({
  fileConfig,
}: {
  fileConfig: FileUpload
}) => {
  const files = useStore(s => s.files)
  const disabled = !!(fileConfig.number_limits && files.length >= fileConfig.number_limits)

  return (
    <div
      className={cn(
        'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition',
        disabled
          ? 'cursor-not-allowed text-gray-300'
          : 'cursor-pointer text-gray-500 hover:bg-indigo-50 hover:text-indigo-600',
      )}
      title='上传文件'
    >
      <RiAttachment2 className='h-5 w-5' />
      <FileInput fileConfig={fileConfig} />
    </div>
  )
}

interface FileUploaderInAttachmentProps {
  fileConfig: FileUpload
}
const FileUploaderInAttachment = ({
  fileConfig,
}: FileUploaderInAttachmentProps) => {
  const { t } = useTranslation()
  const files = useStore(s => s.files)

  return (
    <div>
      <div className='flex items-center space-x-1'>
        <Button
          className='relative grow'
          disabled={!!(fileConfig.number_limits && files.length >= fileConfig.number_limits)}
        >
          <RiUploadCloud2Line className='h-4 w-4' />
          <span className='ml-1'>{t('common.fileUploader.uploadFromComputer')}</span>
          <FileInput fileConfig={fileConfig} />
        </Button>
      </div>
      <AttachmentFileList className='mt-1' fileConfig={fileConfig} />
    </div>
  )
}

interface FileUploaderInAttachmentWrapperProps {
  value?: FileEntity[]
  onChange: (files: FileEntity[]) => void
  fileConfig: FileUpload
}
const FileUploaderInAttachmentWrapper = ({
  value,
  onChange,
  fileConfig,
}: FileUploaderInAttachmentWrapperProps) => {
  return (
    <FileContextProvider
      value={value}
      onChange={onChange}
    >
      <FileUploaderInAttachment fileConfig={fileConfig} />
    </FileContextProvider>
  )
}

export default FileUploaderInAttachmentWrapper
