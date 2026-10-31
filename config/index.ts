import type { AppInfo } from '@/types/app'

export const APP_STORAGE_KEY = 'career-assistant'

export const APP_INFO: AppInfo = {
  title: '职业规划小助手',
  description: '为你梳理职业方向、优化简历、备战校招，规划更清晰的成长路径。',
  copyright: '职业规划小助手',
  privacy_policy: '',
  default_language: 'zh-Hans',
  disable_session_same_site: false, // set it to true if you want to embed the chatbot in an iframe
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
