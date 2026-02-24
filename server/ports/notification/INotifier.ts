import type { Recipient, IPayload, INotification, IResult } from './IRecipientRepository.ts'

export interface INotifier {
  send(recipient: Recipient, payload: IPayload, notification: INotification): Promise<IResult>
}