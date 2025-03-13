import { Request, Response } from "express";
import {
  getBasicResponse,
  getStructuredResponse,
  getStreamResponse,
  getStreamStructuredResponse,
  getFunctionCallingResponse,
  getContextualChat,
} from "../services/chatServices";

export const basicPrompt = async (req: Request, res: Response) => {
  try {
    const response = await getBasicResponse();
    res.json(response);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
export const structuredPrompt = async (req: Request, res: Response) => {
  try {
    const response = await getStructuredResponse();
    res.json(response);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
export const streamResponse = async (req: Request, res: Response) => {
  try {
    await getStreamResponse(req, res);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const streamStructuredResponse = async (req: Request, res: Response) => {
  try {
    await getStreamStructuredResponse(req, res);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const functionCallingExample = async (req: Request, res: Response) => {
  try {
    const response = await getFunctionCallingResponse();
    res.json(response);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const contextualChat = async (req: Request, res: Response) => {
  try {
    const response = await getContextualChat(req.body);
    res.json(response);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
