import { Request, Response, NextFunction } from "express";
import { generateText } from '../openai'
import { readTextFile } from "../utilities/readFile";

export const generatPaper = async (req: Request, res: Response) => {
    const { totalQuestions } = req.body
    const file = 'Electric_Charge_Chapter.txt'
    const chapter = await readTextFile(file)
    
    const messages = [
        {
          role: 'system',
          content: 'You are an AI that generates multiple-choice questions from text.',
        },
        {
          role: 'user',
          content: `
          Based on the following paragraph, generate ${totalQuestions} well-structured multiple-choice questions. For each question, provide exactly four options labeled A, B, C, and D. Ensure that only one of these options is the correct answer. List the correct answer explicitly after each question. Highlight the correct answer. Use the following format:

          **Paragraph:**
          "${chapter}"

          **Output Format:**

          1. **Question**: [Generated question]
             - A) [Option A]
             - B) [Option B]
             - C) [Option C]
             - D) [Option D]
             - **Correct Answer**: **[Correct Answer Letter and Text]**

          ... continue in this format for ${totalQuestions} questions.
          `
        }
      ]; 

    // res.send({status: 200, message: "Open AI API Success", data: messages})
    // return;
    try {
        const generatePaper = await generateText(messages)
        res.send({status: 200, message: "Open AI API Success", data: generatePaper})
    } catch (error) {
        res.send({status: 500, message: "Open AI API Success", data: error})
    }
    
}

