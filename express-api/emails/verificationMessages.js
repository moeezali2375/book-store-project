export const emailVerificationMessage = (user) => {
  const message = {
    subject: "Email Verification",
    body: `
            <p>Dear ${user.name},</p>
            <p>Thank you for signing up. Your verification code is: <strong>${user.verificationToken}</strong></p><p>Your registration will expire 5 minutes after signing up, if not verified.</p>
            <p>Best regards,<br>Moeez Ali</p>`,
  };
  return message;
};
