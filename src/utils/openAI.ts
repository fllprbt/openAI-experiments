import { escape } from "../utils/string";

export type CompletionsConfig = object & { prompt: string };

export const extendQNA = (prevConfig: CompletionsConfig, message: string) => ({
  ...prevConfig,
  prompt: `${prevConfig.prompt}Human: ${escape(message)}\\nAI:`,
});

export const extendWishes = (
  prevConfig: CompletionsConfig,
  description: string
) => ({
  ...prevConfig,
  prompt: `${prevConfig.prompt}${escape(description)}\\n:`,
});
