import type {
  ApiErrorResponse,
  AppConfigStatus,
  AssistantAction,
  AssistantPromptRequest,
  AssistantPromptResponse,
  UserProfile,
} from '@test/shared'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'
const versionedBaseUrl = `${apiBaseUrl}/api/v1`

type RequestOptions = RequestInit & {
  path: string
}

const request = async <T>({ path, ...init }: RequestOptions): Promise<T> => {
  const response = await fetch(`${versionedBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`

    try {
      const payload = (await response.json()) as ApiErrorResponse
      errorMessage = payload.error.message
    } catch {
      // fallback to generic status message
    }

    throw new Error(errorMessage)
  }

  return (await response.json()) as T
}

export const apiClient = {
  getBaseUrl: () => apiBaseUrl,
  getStatus: () => request<AppConfigStatus>({ path: '/status' }),
  getProfile: (includePreferences = true) =>
    request<UserProfile>({
      path: `/profile?includePreferences=${String(includePreferences)}`,
    }),
  createAssistantResponse: (payload: AssistantPromptRequest) =>
    request<AssistantPromptResponse>({
      path: '/assistant/respond',
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

export const assistantActionOptions: AssistantAction[] = [
  'generate',
  'rephrase',
  'shorten',
  'expand',
]
