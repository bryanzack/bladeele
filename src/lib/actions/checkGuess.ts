'use server';
//import {answer} from "@/utils/files/output/daily/answer";
import answer from '@/utils/files/output/daily/answer.json'

export default async function isGuessCorrect(guess: string) {
    console.log(`GUESS: ${guess}`);
    console.log(`ANSWER: ${answer.answer}`);
    return answer.answer === guess;
}
