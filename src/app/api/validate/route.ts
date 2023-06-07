import {NextResponse} from "next/server";
import {answer} from "@/utils/files/output/daily/answer";
export async function POST(request: Request, response: Response) {
    const guess = request.headers.get('Guess');
    console.log(`GUESS: ${guess}`);
    console.log(`ANSWER: ${answer}`);
    if (guess === answer)
        return NextResponse.json({status: 'right', message: 'You got it right!!!'});
    else
        return NextResponse.json({status: 'wrong', message: 'U suck dick'});
}