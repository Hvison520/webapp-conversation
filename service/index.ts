import type { IOnCompleted, IOnData, IOnError, IOnFile, IOnHumanInput, IOnHumanInputFilled, IOnMessageEnd, IOnMessageReplace, IOnNodeFinished, IOnNodeStarted, IOnThought, IOnWorkflowFinished, IOnWorkflowStarted } from './base'
import { get, post, sseGet, ssePost } from './base'
import type { Feedbacktype } from '@/types/app'

export const sendChatMessage = async (
  body: Record<string, any>,
  {
    onData,
    onCompleted,
    onThought,
    onFile,
    onError,
    getAbortController,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onNodeStarted,
    onNodeFinished,
    onWorkflowFinished,
    onHumanInput,
  }: {
    onData: IOnData
    onCompleted: IOnCompleted
    onFile: IOnFile
    onThought: IOnThought
    onMessageEnd: IOnMessageEnd
    onMessageReplace: IOnMessageReplace
    onError: IOnError
    getAbortController?: (abortController: AbortController) => void
    onWorkflowStarted: IOnWorkflowStarted
    onNodeStarted: IOnNodeStarted
    onNodeFinished: IOnNodeFinished
    onWorkflowFinished: IOnWorkflowFinished
    onHumanInput?: IOnHumanInput
  },
) => {
  return ssePost('chat-messages', {
    body: {
      ...body,
      response_mode: 'streaming',
    },
  }, { onData, onCompleted, onThought, onFile, onError, getAbortController, onMessageEnd, onMessageReplace, onNodeStarted, onWorkflowStarted, onWorkflowFinished, onNodeFinished, onHumanInput })
}

export const submitHumanInput = async (formToken: string, body: { action: string, inputs?: Record<string, any> }) => {
  return post(`human-input/${formToken}`, { body })
}

export const streamWorkflowEvents = async (
  workflowRunId: string,
  {
    onData,
    onCompleted,
    onThought,
    onFile,
    onError,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onNodeStarted,
    onNodeFinished,
    onWorkflowFinished,
    onHumanInput,
    onHumanInputFilled,
  }: {
    onData: IOnData
    onCompleted: IOnCompleted
    onThought: IOnThought
    onFile: IOnFile
    onError: IOnError
    onMessageEnd: IOnMessageEnd
    onMessageReplace: IOnMessageReplace
    onWorkflowStarted: IOnWorkflowStarted
    onNodeStarted: IOnNodeStarted
    onNodeFinished: IOnNodeFinished
    onWorkflowFinished: IOnWorkflowFinished
    onHumanInput: IOnHumanInput
    onHumanInputFilled: IOnHumanInputFilled
  },
) => {
  return sseGet(`workflow-events/${workflowRunId}`, {}, {
    onData,
    onCompleted,
    onThought,
    onFile,
    onError,
    onMessageEnd,
    onMessageReplace,
    onNodeStarted,
    onWorkflowStarted,
    onWorkflowFinished,
    onNodeFinished,
    onHumanInput,
    onHumanInputFilled,
  })
}

export const fetchConversations = async () => {
  return get('conversations', { params: { limit: 100, first_id: '' } })
}

export const fetchChatList = async (conversationId: string) => {
  return get('messages', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
}

// init value. wait for server update
export const fetchAppParams = async () => {
  return get('parameters')
}

export const updateFeedback = async ({ url, body }: { url: string, body: Feedbacktype }) => {
  return post(url, { body })
}

export const generationConversationName = async (id: string) => {
  return post(`conversations/${id}/name`, { body: { auto_generate: true } })
}
