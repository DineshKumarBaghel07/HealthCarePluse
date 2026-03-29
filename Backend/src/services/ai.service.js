import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage,SystemMessage,AIMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";


const systemMessage = new SystemMessage(`you are a helpful assistant that generates a response for the given message`)


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});


const misttralModel = new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API_KEY
})


export const generateResponse  = async(message) =>{

    const formatted = [systemMessage,
        ...message.map(msg=>{
        if(msg.role ==="user"){
            return new HumanMessage(msg.content)
        }else {
            return new AIMessage(msg.content)
        }
    })]
   
    const response = await geminiModel.invoke(
   formatted
);

    return response.content;

}



export const generateTitle = async(title) =>{
   const response = await misttralModel.invoke([
     new SystemMessage(`you are a helpful assistant that generates a title for the given content
        user will provide you with some content and you have to generate a title for that content.
         the title should be concise and should capture the essence of the content. 
         the title should be in english and should be in sentence case.
          the title should not be more than 10 words. the title should not contain any special characters or emojis.
        `),
        new HumanMessage(`
            this is  first content: ${title}
            `)
   ])


   return response.text;
}



