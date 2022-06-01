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
        session: {user}
    } = req;


    const stream = await client.stream.findUnique({
        where: {
            id: +id
        },
        include: {
            messages: {
                select: {
                    message: true,
                    id: true,
                    user: {
                        select: {
                            id: true,
                            avatar: true
                        }
                    }
                }
            }
        }
    })

    const isOwner = stream?.userId === user?.id;
    if (stream && !isOwner) {
        stream.cloudflareKey = "xxxxx";
        stream.cloudflareUrl = "xxxxx";
    }

    res.json({ok: true, stream})
}


export default withApiSession(withHandler({
    method: ["GET"],
    handler
}));