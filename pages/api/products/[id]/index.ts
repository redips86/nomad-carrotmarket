import {NextApiRequest, NextApiResponse} from "next";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import client from "@libs/server/client";
import {withApiSession} from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {

    const {
        query: {id},
        session: {user}
    } = req;

    const product = await client.product.findUnique({
        where: {
            id: +id
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true
                }
            }
        }
    })
    const terms = product?.name.split(" ").map(word => ({
        name: {
            contains: word,
        }
    }));
    const relatedProduct = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: +id
                }
            }
        }
    });

    const isLiked = Boolean(await client.fav.findFirst({
        where: {
            productId: product?.id,
            userId: user?.id
        },
        select: {
            id: true
        }
    }))

    res.json({ok: true, product, isLiked, relatedProduct})
}
;

export default withApiSession(withHandler({
    method: ["GET"],
    handler
}));