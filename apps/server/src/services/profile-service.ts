import type { UserProfile } from '@test/shared'

export const getUserProfile = (): UserProfile => {
  return {
    id: process.env.DEMO_USER_ID ?? 'demo-user-1',
    name: process.env.DEMO_USER_NAME ?? 'Demo User',
    email: process.env.DEMO_USER_EMAIL ?? null,
    role: 'developer',
    preferences: {
      tone: 'friendly',
    },
  }
}
