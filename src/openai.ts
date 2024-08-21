import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error('OpenAI API key not found in environment variables.');
}

const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openaiApiKey}`
  }
});

export const generateTextOld = async (prompt: any) => {
  try {
    const response = await openaiClient.post('/completions', {
      model: 'gpt-4',
      messages: prompt,
      max_tokens: 1000,
      temperature: 0.5,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const generateText = async (prompt: any) => {
    try {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
        const data = {
          model: 'gpt-4o',
          messages: prompt,
          max_tokens: 2000,
          temperature: 0.5,
        };
  
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        };
        
        const response  = await axios.post(apiUrl, data, { headers });
        if (response.data && response.data.choices && response.data.choices[0].message) {
            return response.data.choices[0].message.content.trim();
        } else {
            return response.data.choices[0].text;
        }
         
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  };
