import { NextResponse } from "next/server";
import openai from "../../utils/openai";

export async function POST(req) {
  try {
    const messages = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json({
      error: {
        message: "An error occurred during your chat request.",
      },
    });
  }
}
