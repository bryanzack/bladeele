'use server';
import {answer} from "@/utils/files/output/daily/answer";

export default async function isGuessCorrect(guess: string) {
    console.log(`GUESS: ${guess}`);
    console.log(`ANSWER: ${answer}`);
    return answer === guess;
}
