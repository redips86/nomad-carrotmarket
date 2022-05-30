import {NextApiRequest, NextApiResponse} from "next";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import {withIronSessionApiRoute} from "iron-session/next";
import client from "@libs/server/client";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {token} = req.body;
    const exists = await client.token.findUnique({
        where: {
            payload: token,
        },
        // include: {
        //     user: true
        // }
    })

    if (!exists) res.status(404).end();

    console.log(exists);
    req.session.user = {
        id: exists?.id
    }

    await req.session.save();
    res.status(200).end();
}
;

export default withIronSessionApiRoute(withHandler("POST", handler), {
    cookieName: "carrotsession",
    password: "2342342423432432432423432098hfay8s90dhrny09sadrvf89yn790nhy3790ahyrnf7094",
});