type SessionProps = {
  id: string
  userId: number,
  userGroup: string,
  lang: string,
  ip: string,
  ua: string,
  path: string,
  redirectPath: string,
  createdAt: string,
  extendedAt: string | null,
  expiresAt: string,
}

export type SessionDbRow = {
  id: string,
  user_id: number,
  user_group: string,
  lang: string,
  ip: string,
  ua: string,
  path: string,
  redirect_path: string,
  created_at: string,
  extended_at: string | null,
  expires_at: string,
}

export type SessionParams = {
  lang: string
  ip: string
  path: string
  ua: string
  redirectPath: string
  keepRedirectPath?: boolean
  keepLang?: boolean
}

export class Session {
  id: string
  userId: number
  userGroup: string
  lang: string
  ip: string  
  ua: string
  path: string
  redirectPath: string
  createdAt: string
  extendedAt: string | null
  expiresAt: string
  constructor(props: SessionProps) {
    this.id = props.id
    this.userId = props.userId
    this.userGroup = props.userGroup
    this.lang = props.lang
    this.ip = props.ip    
    this.ua = props.ua
    this.path = props.path
    this.redirectPath = props.redirectPath
    this.createdAt = props.createdAt
    this.extendedAt = props.extendedAt
    this.expiresAt = props.expiresAt
  }
  static fromDbRow(row: SessionDbRow): Session {
    return new Session({
      id: row.id,
      userId: row.user_id,
      userGroup: row.user_group,
      lang: row.lang,
      ip: row.ip,
      ua: row.ua,
      path: row.path,      
      redirectPath: row.redirect_path,
      createdAt: row.created_at,      
      extendedAt: row.extended_at,
      expiresAt: row.expires_at,
    })
  }
}