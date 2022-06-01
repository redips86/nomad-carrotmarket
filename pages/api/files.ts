import {NextApiRequest, NextApiResponse} from "next";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import {withApiSession} from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    res.json({ok: true, url: ""})
}


export default withApiSession(withHandler({
    method: ["POST"],
    handler
}));