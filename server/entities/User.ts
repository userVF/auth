type UserProps = {
  id: number
  identifier: string,
  userGroup: string,
  isEnabled: boolean,
  createdAt: string,
  updatedAt: string | null,
}

export type UserDbRow = {
  id: number,
  identifier: string,
  user_group: string,
  is_enabled: boolean,
  created_at: string,
  updated_at: string | null,
  [key: string]: unknown
}

export class User {
  id: number
  identifier: string
  userGroup: string
  isEnabled: boolean
  createdAt: string
  updatedAt: string | null
  constructor(props: UserProps) {
    this.id = props.id
    this.identifier = props.identifier
    this.userGroup = props.userGroup
    this.isEnabled = props.isEnabled
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
  static fromDbRow(row: UserDbRow): User {
    return new User({
      id: row.id,
      identifier: row.identifier,
      userGroup: row.user_group,
      isEnabled: row.is_enabled,
      createdAt: row.created_at,      
      updatedAt: row.updated_at,
    })
  }
}