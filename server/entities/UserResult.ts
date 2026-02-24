import { User } from './User.ts'

export type UserResult = {
  status: string
  // message: string
  user?: User
}