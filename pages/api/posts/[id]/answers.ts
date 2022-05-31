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
        session: {user},
        body: {answer}
    } = req;

    const post = await client.post.findUnique({
        where: {
            id: +id
        }
    });

    const newAnswer = await client.answer.create({
        data: {
            user: {
                connect: {
                    id: user?.id
                }
            },
            post: {
                connect: {
                    id: +id
                }
            },
            answer
        }
    })

    console.log(newAnswer);

    res.json({ok: true, newAnswer})
}


export default withApiSession(withHandler({
    method: ["POST"],
    handler
}));