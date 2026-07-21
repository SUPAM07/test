export type AssistantAction = 'generate' | 'rephrase' | 'shorten' | 'expand'

export type AssistantPromptRequest = {
  prompt: string
  action?: AssistantAction
  context?: string
}

export type AssistantPromptResponse = {
  response: string
  action: AssistantAction
  model: string
  timestamp: string
}

export type UserProfile = {
  id: string
  name: string
  email: string | null
  role: 'owner' | 'member' | 'developer'
  preferences?: {
    tone: 'concise' | 'friendly' | 'professional'
  }
}

export type AppConfigStatus = {
  status: 'ok'
  service: 'server'
  apiVersion: 'v1'
  environment: string
  timestamp: string
  features: string[]
}

export type ApiErrorResponse = {
  error: {
    code: string
    message: string
    details?: unknown
  }
}
