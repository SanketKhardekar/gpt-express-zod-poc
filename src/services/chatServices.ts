import { OpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { z } from "zod";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const instructor = Instructor({
  client: openai,
  mode: "FUNCTIONS",
});

const ComplexResponseSchema = z.object({
  summary: z.string(),
  details: z.object({
    keyPoints: z.array(z.string()),
    importance: z.number(),
  }),
});

type ComplexResponseType = z.infer<typeof ComplexResponseSchema>;

export const getBasicResponse = async () => {
  const prompt = "Tell me a fun fact about space.";
  const response = await openai.chat.completions.create({
    model: process.env.GPT_MODEL || "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });
  return { response: response.choices[0].message?.content };
};

export const getStructuredResponse = async () => {
  const prompt = "Summarize the benefits of exercise in a structured format.";
  const response = await instructor.chat.completions.create({
    model: process.env.GPT_MODEL || "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_model: {
      schema: ComplexResponseSchema,
      name: "ComplexResponse",
    },
  });
  return response;
};

export const getStreamResponse = async (req: any, res: Response) => {
  res.setHeader("Content-Type", "text/plain");
  const response = await openai.chat.completions.create({
    model: process.env.GPT_MODEL || "gpt-4o",
    messages: req.body.messages,
    stream: true,
  });
  for await (const chunk of response) {
    res.write(chunk.choices[0]?.delta?.content || "");
  }
  res.end();
};
export const getStreamStructuredResponse = async (req: any, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  const response = await instructor.chat.completions.create({
    model: process.env.GPT_MODEL || "gpt-4o",
    messages: req.body.messages,
    response_model: {
      schema: ComplexResponseSchema,
      name: "ComplexResponse",
    },
    stream: true,
  });
  for await (const chunk of response) {
    res.write(JSON.stringify(chunk));
  }
  res.end();
};

const WeatherSchema = z.object({
  location: z.string(),
  temperature: z.number(),
  condition: z.string(),
});

export const getFunctionCallingResponse = async () => {
  const response = await instructor.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You can call functions dynamically." },
      { role: "user", content: "Get the current weather in New York" },
    ],
    response_model: {
      schema: WeatherSchema,
      name: "WeatherInfo",
    },
  });

  return response;
};

export const getContextualChat = async (data: any) => {
  const messages = data.messages || [];
  messages.unshift({
    role: "system",
    content: "Maintain conversation context across multiple messages.",
  });
  const response = await openai.chat.completions.create({
    model: process.env.GPT_MODEL || "gpt-4o",
    messages,
  });
  return { response: response.choices[0].message?.content };
};
