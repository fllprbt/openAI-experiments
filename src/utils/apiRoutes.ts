import axios from "axios";
import { CompletionsConfig } from "./openAI";

export const requestCompletions = (config: CompletionsConfig) => {
  return axios.post("/api/openAI/completions", { config });
};
