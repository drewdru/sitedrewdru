import { Prisma } from '../../../shared/generated/prisma/client'
import { obfuscatedFields } from './obfuscatedFields'

export const guestbookExtension = Prisma.defineExtension({
  name: 'guestbookExtensions',

  result: {
    guestbookMessage: {
      ...obfuscatedFields,
    },
  },
});
