import axios from "axios";
import { shuffelArray } from "./utils";

// fetch data from the API 
export enum Diff {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}



export type Questions = {
    category: string ;
    correct_answer:string;
    difficulty:string;
    incorrect_answers: string[];
    question:string;
    type:string;

}

export type QuestionState = Questions & {answers: string[];}
export const fetchQuizData = async (amount:number,diff:Diff)=>{
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${diff}&type=multiple`
    const res = await axios.get(endpoint).catch(e=>console.log(e.message))
    const data = await res?.data
    return data?.results?.map((question:Questions)=>(
        {
            ...question,
            answers : shuffelArray([...question.incorrect_answers,question.correct_answer])
        }
    ))
}
