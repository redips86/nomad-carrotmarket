import {NextApiRequest, NextApiResponse} from "next";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import client from "@libs/server/client";
import {withApiSession} from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {

    if (req.method === "GET") {
        const profile = await client.user.findUnique({
            where: {
                id: req.session.user?.id
            }
        });

        res.json({ok: true, profile})
    } else if (req.method === "POST") {
        const {session: {user}, body: {email, phone, name}} = req;

        const currentUser = await client.user.findUnique({
            where: {
                id: user?.id
            }
        });


        if (email && currentUser?.email !== email) {
            const alreadyExists = Boolean(await client.user.findUnique({
                where: {
                    email
                }
            }))
            if (alreadyExists) {
                return res.json({
                    ok: false,
                    error: "Email already Taken"
                })
            }
            await client.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    email
                }
            });

            return res.json({ok: true})

        }
        if (phone && currentUser?.phone !== phone) {
            console.log(phone)
            const alreadyExists = Boolean(await client.user.findUnique({
                where: {
                    phone
                }
            }))
            if (alreadyExists) {
                return res.json({
                    ok: false,
                    error: "Phone already in use"
                })
            }
            await client.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    phone
                }
            });
            return res.json({ok: true})
        }
        if (name) {
            await client.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    name
                }
            });
            return res.json({ok: true})
        }

        return res.json({ok: true})

    }
}
;

export default withApiSession(withHandler({
    method: ["GET", "POST"],
    handler
}));