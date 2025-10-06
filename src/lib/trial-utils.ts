// Free trial and access code utilities

export interface TrialUser {
  email: string;
  accessCode: string;
  trialStartDate: Date;
  trialEndDate: Date;
  isActive: boolean;
  planType: 'starter' | 'professional' | 'enterprise';
}

export interface AccessCodeData {
  code: string;
  email: string;
  generatedAt: Date;
  expiresAt: Date;
  used: boolean;
  planType: string;
}

// Generate unique access code
export function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Send access code email
export async function sendAccessCodeEmail(email: string, accessCode: string, planType: string): Promise<boolean> {
  try {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would:
    // 1. Use email service like SendGrid, AWS SES, or Nodemailer
    // 2. Create email template with access code
    // 3. Send email with trial instructions
    
    console.log(`Access code sent to ${email}: ${accessCode}`);
    console.log(`Plan: ${planType}, Trial: 14 days`);
    
    return true;
  } catch (error) {
    console.error('Failed to send access code email:', error);
    return false;
  }
}

// Start free trial
export async function startFreeTrial(email: string, planType: string): Promise<{ success: boolean; accessCode?: string; error?: string }> {
  try {
    // Generate access code
    const accessCode = generateAccessCode();
    
    // Calculate trial dates
    const trialStartDate = new Date();
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14);
    
    // Store trial data (in real app, save to database)
    const trialUser: TrialUser = {
      email,
      accessCode,
      trialStartDate,
      trialEndDate,
      isActive: true,
      planType: planType as 'starter' | 'professional' | 'enterprise'
    };
    
    // Store in localStorage for demo
    localStorage.setItem('trialUser', JSON.stringify(trialUser));
    
    // Send access code email
    const emailSent = await sendAccessCodeEmail(email, accessCode, planType);
    
    if (emailSent) {
      return {
        success: true,
        accessCode
      };
    } else {
      return {
        success: false,
        error: 'Failed to send access code email'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to start trial'
    };
  }
}

// Verify access code
export function verifyAccessCode(email: string, accessCode: string): { valid: boolean; trialData?: TrialUser } {
  try {
    const storedTrial = localStorage.getItem('trialUser');
    if (!storedTrial) {
      return { valid: false };
    }
    
    const trialData: TrialUser = JSON.parse(storedTrial);
    
    // Check if access code matches and is not expired
    if (trialData.accessCode === accessCode && 
        trialData.email === email && 
        trialData.isActive && 
        new Date() < new Date(trialData.trialEndDate)) {
      return {
        valid: true,
        trialData
      };
    }
    
    return { valid: false };
  } catch (error) {
    return { valid: false };
  }
}

// Get trial status
export function getTrialStatus(email: string): { active: boolean; daysRemaining: number; planType?: string } {
  try {
    const storedTrial = localStorage.getItem('trialUser');
    if (!storedTrial) {
      return { active: false, daysRemaining: 0 };
    }
    
    const trialData: TrialUser = JSON.parse(storedTrial);
    
    if (trialData.email === email && trialData.isActive) {
      const now = new Date();
      const endDate = new Date(trialData.trialEndDate);
      const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        active: daysRemaining > 0,
        daysRemaining: Math.max(0, daysRemaining),
        planType: trialData.planType
      };
    }
    
    return { active: false, daysRemaining: 0 };
  } catch (error) {
    return { active: false, daysRemaining: 0 };
  }
}

