import type { INotifier } from '../../ports/notification/INotifier.ts'
import { WhatsAppNotifier } from './WhatsAppNotifier.ts'
import { EmailNotifier } from './EmailNotifier.ts'

type ChannelName =  'whatsapp' | 'email'

const notifiers = {
  'whatsapp': WhatsAppNotifier,
  'email': EmailNotifier,
} satisfies Record<ChannelName, new (...args: any[]) => INotifier>

export const createNotifier = (channel: ChannelName): INotifier => {
  const Notifier = notifiers[channel]
  return new Notifier
}

export type { ChannelName }
export type { INotifier }