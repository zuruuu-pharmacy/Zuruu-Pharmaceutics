import { prisma } from './prisma';

/**
 * Clean up expired reset tokens
 * This function should be called periodically to remove expired tokens
 */
export async function cleanupExpiredTokens() {
  try {
    const result = await prisma.resetToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });
    
    console.log(`Cleaned up ${result.count} expired reset tokens`);
    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
    return 0;
  }
}

/**
 * Check if user has too many pending reset tokens
 * Prevents spam/abuse by limiting reset requests
 */
export async function checkResetTokenLimit(userId: number, maxTokens: number = 3) {
  try {
    const tokenCount = await prisma.resetToken.count({
      where: {
        userId,
        expiresAt: {
          gt: new Date()
        }
      }
    });
    
    return tokenCount < maxTokens;
  } catch (error) {
    console.error('Error checking reset token limit:', error);
    return false;
  }
}
