import type { AssistantAction, AssistantPromptRequest, AssistantPromptResponse } from '@test/shared'

const actionPrefixes: Record<AssistantAction, string> = {
  generate: 'Draft generated:',
  rephrase: 'Rephrased content:',
  shorten: 'Shortened version:',
  expand: 'Expanded draft:',
}

export const generateAssistantResponse = (
  payload: AssistantPromptRequest,
): AssistantPromptResponse => {
  const action = payload.action ?? 'generate'
  const prefix = actionPrefixes[action]
  const contextSuffix = payload.context ? ` (context: ${payload.context})` : ''

  return {
    response: `${prefix} ${payload.prompt}${contextSuffix}`,
    action,
    model: 'phase-2-local-mock',
    timestamp: new Date().toISOString(),
  }
}
