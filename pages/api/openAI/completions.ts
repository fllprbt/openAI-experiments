// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI, { Completion } from "openai-api";

// Secrets read here are safe
const openAI = new OpenAI(process.env.NEXT_PUBLIC_OPEN_AI || "");

type CompletionsResponse = {
  response: Completion["data"]["choices"][number]["text"];
};

export default async function CompletionsHandler(
  req: NextApiRequest,
  res: NextApiResponse<CompletionsResponse>
) {
  const gptResponse = await openAI
    .complete(req.body.config)
    .catch((e) => console.log(e));
  res.status(200).json({ response: `${gptResponse?.data.choices[0].text}` });
}
