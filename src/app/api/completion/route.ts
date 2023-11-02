import OpenAI from 'openai';
import { NextResponse } from "next/server";
import openai from "../../utils/openai"

export async function POST(req) {
  const data = await req.json();
  const { date, companyInfo, companyReviews } = data;
  console.log("date ====> ", date);
  console.log("companyInfo ====> ", companyInfo);
  console.log("companyReviews ====> ", companyReviews);
  try {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content: `Generate a JSON response that has an array of 3 social media post objects based on ${companyInfo} and ${companyReviews}. Each object needs to have a date, title, description. JSON example: { posts: [ {date: "2023-11-01", title: 'Post title', description: 'Post description' }`,
      }
    ];

    console.log("before completion");

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("after completion");

    console.log("completion.choices[0].message.content =====> ", completion.choices[0].message.content);
    const responseText = completion.choices[0].message.content;
    const responseTextJSON: Response = JSON.parse(responseText ?? '');

    return NextResponse.json({
      message: responseTextJSON,
    },
    {
      status: 200,
    });
  } catch (error) {
    console.log("error ===> ", error);
    return NextResponse.json({
      error: {
        message: error,
      }
    },
    {
      status: 500
    });
  }
}
