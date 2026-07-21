import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type {
  AppConfigStatus,
  AssistantAction,
  AssistantPromptResponse,
  UserProfile,
} from '@test/shared'

import { apiClient, assistantActionOptions } from './api/client'
import './App.css'

function App() {
  const [status, setStatus] = useState<AppConfigStatus | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [assistantResponse, setAssistantResponse] = useState<AssistantPromptResponse | null>(null)

  const [loadingBootstrap, setLoadingBootstrap] = useState(true)
  const [bootstrapError, setBootstrapError] = useState<string | null>(null)

  const [prompt, setPrompt] = useState('')
  const [action, setAction] = useState<AssistantAction>('generate')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingBootstrap(true)
        const [statusData, profileData] = await Promise.all([
          apiClient.getStatus(),
          apiClient.getProfile(),
        ])
        setStatus(statusData)
        setProfile(profileData)
        setBootstrapError(null)
      } catch (error) {
        setBootstrapError(error instanceof Error ? error.message : 'Failed to load app data')
      } finally {
        setLoadingBootstrap(false)
      }
    }

    void loadInitialData()
  }, [])

  const onSubmitPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setSubmitting(true)
      setSubmitError(null)
      const response = await apiClient.createAssistantResponse({ prompt, action })
      setAssistantResponse(response)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit prompt')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <h1>Phase 2 Migration Demo</h1>
      <p>API base URL: {apiClient.getBaseUrl()}</p>

      {loadingBootstrap && <p>Loading profile and config...</p>}
      {!loadingBootstrap && bootstrapError && <p>Startup error: {bootstrapError}</p>}

      {!loadingBootstrap && !bootstrapError && (
        <>
          <section>
            <h2>Status</h2>
            <pre>{JSON.stringify(status, null, 2)}</pre>
          </section>

          <section>
            <h2>Profile</h2>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </section>
        </>
      )}

      <section>
        <h2>Assistant</h2>
        <form onSubmit={onSubmitPrompt}>
          <label htmlFor="prompt">Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={4}
            placeholder="Draft a launch post about Phase 2 migration"
            required
          />

          <label htmlFor="action">Action</label>
          <select id="action" value={action} onChange={(event) => setAction(event.target.value as AssistantAction)}>
            {assistantActionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button type="submit" disabled={submitting || prompt.trim().length === 0}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {submitError && <p>Assistant error: {submitError}</p>}
        {assistantResponse && <pre>{JSON.stringify(assistantResponse, null, 2)}</pre>}
      </section>
    </main>
  )
}

export default App
