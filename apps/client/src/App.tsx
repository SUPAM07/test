import { useEffect, useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
  service: string
  timestamp: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/health`)

        if (!response.ok) {
          throw new Error(`Health check failed with status ${response.status}`)
        }

        const data: HealthResponse = await response.json()
        setHealth(data)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void fetchHealth()
  }, [])

  return (
    <main>
      <h1>Phase 1 Client Scaffold</h1>
      <p>API base URL: {apiBaseUrl}</p>
      {loading && <p>Checking backend health...</p>}
      {!loading && error && <p>Backend error: {error}</p>}
      {!loading && health && (
        <pre>{JSON.stringify(health, null, 2)}</pre>
      )}
    </main>
  )
}

export default App
