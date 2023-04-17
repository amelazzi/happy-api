import { schedule } from 'node-cron'
import { logger } from '../utils/logger'

export const cronJob = async () => {
  // ========================================================================== //
  // Launch CRON every day at 01:00
  schedule(`0 1 * * *`, async () => {
    try {
      logger.info(`⏰ CRON - 🛫 Starting`)
      logger.info('✅ CRON - 🛬 Ended')
    } catch (error) {
      logger.error('❌ CRON - 🛬 Ended with 🤒 error')
    }
  })
}
