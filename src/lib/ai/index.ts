/**
 * AI integration abstraction layer.
 * Will be backed by OpenAI or similar — swap implementation here.
 */

export interface AIClient {
  complete(prompt: string): Promise<string>;
}

export const aiClient: AIClient = {
  async complete() {
    console.warn("[AI] Client not configured yet.");
    return "";
  },
};
