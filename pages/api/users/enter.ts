//import mail from "@sendgrid/mail"
import {NextApiRequest, NextApiResponse} from "next";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import client from "@libs/server/client";
//import twilio from "twilio";

// mail.setApiKey(process.env.SENDGRID_KEY!);
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {phone, email} = req.body;
    const user = phone ? {phone} : email ? {email} : null
    if (!user) {
        return res.status(400).json({ok: false});
    }


    const payload = Math.floor(100000 + Math.random() * 900000) + "";

    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user
                    },
                    create: {
                        name: "Anonymous",
                        ...user
                    },
                }
            }
        }
    });

    if (phone) {
        /*        const message = await twilioClient.messages.create({
                    messagingServiceSid: process.env.TWILIO_MSID,
                    to: process.env.TWILIO_TO!,
                    body: `Your login token is ${payload}`,
                });

                console.log(message);*/
    } else if (email) {
        /*        const email = await mail.send({
                    from: "redips.me@gmail.com",
                    to: "redips.me@gmail.com",
                    subject: "Verification Email",
                    text: `Your token is ${payload}`,
                    html: `<strong>Your token is ${payload}</strong>`
                })
                console.log(email);*/
    }

    return res.json({
        ok: true,
        token
    })
}
;

export default withHandler({
    method: ["GET", "POST"],
    handler,
    isPrivate: false
});