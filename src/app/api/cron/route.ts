import type { NextApiRequest, NextApiResponse } from "next";
import {NextRequest} from "next/server";

export async function POST(req: Request, res: NextRequest) {
    const { APP_KEY } = process.env;
    // @ts-ignore
    const { ACTION_KEY } = req.headers.authorization.split(" ")[1];
    try {
        if (ACTION_KEY === APP_KEY) {
            console.log('Success cron')
        } else {
            console.log('failed to run cron')
        }
    } catch(err) {
        console.log('500 cron')
    }
}