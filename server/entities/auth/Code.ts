type CodeProps = {
  id: number
  identifier: string,
  code: string,
  requestedAt: string,
  expiresAt: string,
  attempts: number,
  elapsedSeconds?: number,
}

export type CodeDbRow = {
  id: number,
  identifier: string,
  code: string,
  requested_at: string,
  expires_at: string,
  attempts: number,
  elapsed_seconds?: number
  [key: string]: unknown
}

export class Code {
  id: number
  identifier: string 
  code: string
  requestedAt: string
  expiresAt: string 
  attempts: number
  elapsedSeconds?: number
  constructor(props: CodeProps) {
    this.id = props.id
    this.identifier = props.identifier
    this.code = props.code
    this.requestedAt = props.requestedAt 
    this.expiresAt = props.expiresAt 
    this.attempts = props.attempts
    this.elapsedSeconds = props.elapsedSeconds
  }
  static fromDbRow(row: CodeDbRow): Code {
    return new Code({
      id: row.id,
      identifier: row.identifier,
      code: row.code,
      requestedAt: row.requested_at,
      expiresAt: row.expires_at,
      attempts: row.attempts,
      elapsedSeconds: row.elapsed_seconds,
    })
  } 
}