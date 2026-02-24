import { type Result } from '../../entities/Result.ts'
import type { INotifier } from '../../ports/notification/INotifier.ts'
import type { 
  Recipient, 
  IPayload, 
  INotification, 
} from '../../ports/notification/IRecipientRepository.ts'

export class EmailNotifier implements INotifier {
  async send(recipient: Recipient, payload: IPayload, notification: INotification): Promise<Result> {
    try {
      // const message = `${notification['...']}: ${payload['code']}`
      return { status: 'sent' }
    } catch (err) {
      return { status: 'notSent' }
    }
  }
}