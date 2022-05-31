import {NextApiRequest, NextApiResponse} from "next";
import client from "@libs/server/client";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import {withApiSession} from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        session: {user},
        body: {name, price, description}
    } = req;

    if (req.method === "GET") {
        const stream = await client.stream.findMany()

        res.json({ok: true, stream})
    } else if (req.method === "POST") {
        const stream = await client.stream.create({
            data: {
                name,
                price,
                description,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })

        res.json({ok: true, stream})
    }
}


export default withApiSession(withHandler({
    method: ["GET", "POST"],
    handler
}));