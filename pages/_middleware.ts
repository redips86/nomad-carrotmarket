import type {NextFetchEvent, NextRequest} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.ua?.isBot) {
        return new Response("Plz don't be a bot. Be human");
    }
}