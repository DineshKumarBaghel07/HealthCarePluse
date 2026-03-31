import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const systemMessage = new SystemMessage(
  "you are a helpful assistant that generates a response for the given message"
);

let geminiModel;
let mistralModel;

function getGeminiModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is required to generate AI responses");
  }

  if (!geminiModel) {
    geminiModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash-lite",
      apiKey: process.env.GEMINI_API_KEY,
      streaming:true
    });
  }

  return geminiModel;
}

function getMistralModel() {
  if (!process.env.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is required to generate chat titles");
  }

  if (!mistralModel) {
    mistralModel = new ChatMistralAI({
      model: "mistral-small-latest",
      apiKey: process.env.MISTRAL_API_KEY,
    });
  }

  return mistralModel;
}

export const generateResponse = async (
    messages,
    socket,
    chatId
) => {

    const formatted = [
        systemMessage,
        ...messages.map(msg =>
            msg.role === "user"
                ? new HumanMessage(msg.content)
                : new AIMessage(msg.content)
        )
    ];

    let fullResponse = "";
  
    const stream = await getGeminiModel().stream(formatted);
      
    for await (const chunk of stream) {

        const token = chunk.content || "";

        fullResponse += token;
       
        socket.emit("ai_stream", {
            chatId,
            token
        });

    }

    // socket.emit("ai_stream_end", { chatId });
    console.log("check by Dines"+fullResponse)
    return fullResponse;

};


export const generateTitle = async (title) => {
  const response = await getMistralModel().invoke([
    new SystemMessage(`you are a helpful assistant that generates a title for the given content
        user will provide you with some content and you have to generate a title for that content.
         the title should be concise and should capture the essence of the content.
         the title should be in english and should be in sentence case.
          the title should not be more than 10 words. the title should not contain any special characters or emojis.
        `),
    new HumanMessage(`
            this is first content: ${title}
            `),
  ]);

  return response.content;
};
