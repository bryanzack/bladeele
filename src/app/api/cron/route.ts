import type { NextApiRequest, NextApiResponse } from "next";

export default function POST(req: NextApiRequest, res: NextApiResponse) {
    const { APP_KEY } = process.env;
    const { ACTION_KEY } = req.headers.authorization.split(" ")[1];
    try {
        if (ACTION_KEY === APP_KEY) {
            console.log('Success cron')
            res.status(200).json({success: 'true'});
        } else {
            console.log('failed to run cron')
            res.status(401);
        }
    } catch(err) {
        console.log('500 cron')
        res.status(500);
    }
}