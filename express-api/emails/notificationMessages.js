export const emailVerificationNotification = (user) => {
  const message = {
    subject: "Email Verfied",
    body: `<p>Dear ${user.name},</p>
      <p>Your email is verified. You can now continue using the app.</p>
      <p>Best regards,<br>Moeez Ali</p>`,
  };
  return message;
}
