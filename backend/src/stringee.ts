import jwt from 'jsonwebtoken';

const API_KEY_SID = process.env.STRINGEE_API_KEY_SID as string;
const API_KEY_SECRET = process.env.STRINGEE_API_KEY_SECRET as string;

const encodeJWT = (apiKeySid: string, apiKeySecret: string) => {
    const header = {
        alg: 'HS256',
        typ: 'JWT',
        cty: "stringee-api;v=1"
    };
    const payload = {
        jti: apiKeySid + "-" + Math.floor(Date.now() / 1000),
        iss: apiKeySid,
        exp: Math.floor(Date.now() / 1000) + 3600,
        rest_api: true
    };
    return jwt.sign(payload, apiKeySecret, { header });
}

export const sendOTP = async (to: string, text: string, apiKeySid: string = API_KEY_SID, apiKeySecret: string = API_KEY_SECRET) => {
    const header = {
        "Content-Type": "application/json",
        "X-STRINGEE-AUTH": encodeJWT(apiKeySid, apiKeySecret)
    }
    return await fetch('https://api.stringee.com/v1/sms', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            "sms": [
                {
                    from: 'Stringee',
                    to,
                    text: text
                }
            ]
        })
    });
}