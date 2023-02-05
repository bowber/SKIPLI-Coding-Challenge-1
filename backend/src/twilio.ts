import twilio from 'twilio';


const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;
const TWILIO_MESSAGING_SID = process.env.TWILIO_MESSAGING_SID as string;
const TWILIO_SENDER_PHONE_NUMBER = process.env.TWILIO_SENDER_PHONE_NUMBER as string;

export const sendTwilioOTP = async (phoneNumber, accessCode) => {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    return await client.messages.create({
        body: `Your access code is ${accessCode}`,
        messagingServiceSid: TWILIO_MESSAGING_SID,
        from: TWILIO_SENDER_PHONE_NUMBER,
        to: phoneNumber
    });
}
