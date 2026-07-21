import type { AppConfigStatus } from '@test/shared'

export const getAppConfigStatus = (): AppConfigStatus => {
  return {
    status: 'ok',
    service: 'server',
    apiVersion: 'v1',
    environment: process.env.NODE_ENV ?? 'development',
    timestamp: new Date().toISOString(),
    features: ['assistant', 'profile', 'status'],
  }
}
