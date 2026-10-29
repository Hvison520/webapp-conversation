import type { ThoughtItem } from '@/app/components/chat/type'
import type { VisionFile } from '@/types/app'

export const sortAgentSorts = (list: ThoughtItem[]) => {
  if (!list) { return list }
  if (list.some(item => item.position === undefined)) { return list }
  const temp = [...list]
  temp.sort((a, b) => a.position - b.position)
  return temp
}

export const addFileInfos = (list: ThoughtItem[], messageFiles: VisionFile[]) => {
  if (!list || !messageFiles) { return list }
  return list.map((item) => {
    if (item.files && item.files?.length > 0) {
      return {
        ...item,
        message_files: item.files.map(fileId => messageFiles.find(file => file.id === fileId)) as VisionFile[],
      }
    }
    return item
  })
}

const THINK_OPEN = '<think>'
const THINK_CLOSE = '</think>'

export const stripThinkTags = (text: string) => {
  return text.replace(/<think>[\s\S]*?<\/think>\s*/g, '')
}

// Streaming chunks can split `think` tags, so filter statefully instead of per chunk.
export const createThinkStreamFilter = () => {
  let buffer = ''
  let inThink = false

  const partialTagLength = (text: string, tag: string) => {
    for (let i = Math.min(tag.length - 1, text.length); i > 0; i--) {
      if (text.endsWith(tag.slice(0, i))) { return i }
    }
    return 0
  }

  return (chunk: string) => {
    buffer += chunk
    let visible = ''
    while (buffer) {
      if (inThink) {
        const closeIdx = buffer.indexOf(THINK_CLOSE)
        if (closeIdx === -1) {
          const keep = partialTagLength(buffer, THINK_CLOSE)
          buffer = keep ? buffer.slice(-keep) : ''
          break
        }
        buffer = buffer.slice(closeIdx + THINK_CLOSE.length)
        buffer = buffer.replace(/^\s+/, '')
        inThink = false
      }
      else {
        const openIdx = buffer.indexOf(THINK_OPEN)
        if (openIdx === -1) {
          const keep = partialTagLength(buffer, THINK_OPEN)
          visible += buffer.slice(0, buffer.length - keep)
          buffer = keep ? buffer.slice(-keep) : ''
          break
        }
        visible += buffer.slice(0, openIdx)
        buffer = buffer.slice(openIdx + THINK_OPEN.length)
        inThink = true
      }
    }
    return visible
  }
}
