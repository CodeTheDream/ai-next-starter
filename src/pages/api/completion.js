// const { Configuration, OpenAIApi } = require("openai");
import openai from "../../utils/openai";


export default async function handler(req, res) {
    if (req.method === 'POST') {
    const body = req.body
    console.log(body);
    const completion =  await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: body.prompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    console.log('completion', completion.choices[0])
    const responseText = completion.choices[0].text;
    res.status(200).json({ item: responseText });
    }   else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

