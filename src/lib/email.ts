import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset - Zuruu Pharmaceutics',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Zuruu Pharmaceutics</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Password Reset Request</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
          <p style="color: #666; line-height: 1.6;">
            We received a request to reset your password for your Zuruu Pharmaceutics account.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Click the button below to reset your password. This link will expire in 15 minutes.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
              Reset Password
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style="color: #667eea; font-size: 14px; word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">
            ${resetLink}
          </p>
        </div>
        
        <div style="text-align: center; color: #999; font-size: 14px;">
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>This link will expire in 15 minutes for security reasons.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p>© 2024 Zuruu Pharmaceutics. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error };
  }
}
