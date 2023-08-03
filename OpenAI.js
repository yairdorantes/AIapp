import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.IMAGES_API_KEY);
// console.log(process.env.PORT);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export async function createImage(query) {
  const response = await openai.createImage({
    prompt: query,
    n: 1,
    size: "1024x1024",
  });
  return response.data.data[0].url;
}
