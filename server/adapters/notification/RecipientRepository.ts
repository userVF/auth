import type { 
  IRecipientRepository, 
  Recipient,
} from '../../ports/notification/IRecipientRepository.ts'

export class RecipientRepository implements IRecipientRepository {
  async checkRecipient(recipient: Recipient): Promise<boolean> {
    return true
  }
}