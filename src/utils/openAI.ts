import { escape } from "../utils/string";

export type CompletionsConfig = object & { prompt: string };

export const extendCompletions = (
  prevConfig: CompletionsConfig,
  message: string
) => ({
  ...prevConfig,
  prompt: `${prevConfig.prompt}Human: ${escape(message)}\\nAI:`,
});
