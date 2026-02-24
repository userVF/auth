export type SessionResult = {
  session: {
    id: string
    user: {
      id: number
      group: string
    },
    lang?: string,
    redirectPath?: string
  }
}