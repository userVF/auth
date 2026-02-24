type Recipient = Record<string, boolean>

export type IPayload = {
  lang: string
  code: string
}

export type INotification = Record<string, string>

export interface IRecipientRepository {
  checkRecipient(recipient: Recipient): Promise<boolean>
}

export type { Recipient }