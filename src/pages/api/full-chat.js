import openai from "../../utils/openai";

export default async function handler(req, res) {
    if (req.method === 'POST') {
    const body = req.body
    console.log('body', body)
    const completion =  await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: body.messages
    })
    const responseText = completion.choices[0].message.content;
    res.status(200).json({ item: responseText });
    }   else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
