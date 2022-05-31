import {NextApiRequest, NextApiResponse} from "next";
import client from "@libs/server/client";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import {withApiSession} from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        query: {id},
        body: {message},
        session: {user}
    } = req;


    const messageResponse = await client.message.create({
        data: {
            message,
            user: {
                connect: {
                    id: user?.id
                }
            },
            stream: {
                connect: {
                    id: +id
                }
            }
        }
    })

    res.json({ok: true, messageResponse})
}


export default withApiSession(withHandler({
    method: ["POST"],
    handler
}));