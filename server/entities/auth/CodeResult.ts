import { Code } from './Code.ts'

export type CodeResult = {
  status: string
  retryAfter?: number
  code?: Code
}