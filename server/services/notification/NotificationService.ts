import { type I18n } from '../../entities/I18n.ts'
import { type Result } from '../../entities/Result.ts'
import type {  
  IPayload,
  IRecipientRepository, 
  Recipient,
} from '../../ports/notification/IRecipientRepository.ts'
import { 
  createNotifier, 
  type ChannelName,
  type INotifier,  
} from '../../adapters/notification/NotifierFactory.ts'

export class NotificationService {
  i18n: I18n
  logger: Console
  recipientRepository: IRecipientRepository
  notifier: INotifier
  constructor(i18n: I18n, logger: Console, recipientRepository: IRecipientRepository) {
    this.i18n = i18n
    this.logger = logger
    this.recipientRepository = recipientRepository
  }
  async send(recipient: Recipient, channel: ChannelName, payload: IPayload): Promise<Result> {    
    const checkedRecipient = await this.recipientRepository.checkRecipient(recipient)
    if (!checkedRecipient) {
      return { status: 'invalidRequest' }
    }
    try {
      this.notifier = createNotifier(channel)
      const { notification: i18n } = this.i18n.get(payload['lang'], ['notification'])
      return await this.notifier.send(recipient, payload, i18n[channel])
    } catch (err) {
      this.logger.error({ err })
      throw err
    }
  }  
}