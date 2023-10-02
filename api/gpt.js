import fetch from 'node-fetch';
import { kv } from '@vercel/kv/dist/index.cjs';

export default async (req, res) => {
  try {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    let gpt4Count = await kv.get(`gpt4:${ip}`);
    let gpt35Count = await kv.get(`gpt35:${ip}`);

    let model = 'gpt-4';
    if (gpt4Count < process.env.LIMIT_GPT4 || gpt4Count === null) {
      gpt4Count = await kv.incr(`gpt4:${ip}`);
      if (gpt4Count === 1) {
        await kv.expire(`gpt4:${ip}`, 86400);
      }
    } else if (gpt35Count < process.env.LIMIT_GPT35) {
      model = 'gpt-3.5-turbo';
      gpt35Count = await kv.incr(`gpt35:${ip}`);
      if (gpt35Count === 1) {
        await kv.expire(`gpt35:${ip}`, 86400);
      }
    } else {
      res.status(429).send('Sorry, you\'re playing too much. This AI stuff costs us money, you know? Come back tomorrow!');
      return;
    }

    const prompt = req.body.prompt;
    const budget = req.body.budget;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: model,
        temperature: 0.7,
        max_tokens: 100,
        messages: [
          { 'role': 'system', 'content': `You are an NPC in a game playing the role of an investor the player has met in an elevator. They will pitch their startup to you. Provide brief feedback, state whether you will invest, and if so, how much (formatted in dollars, like $100000). If you invest, choose an amount depending on the quality of the pitch. Invest less than $50000 for a bad pitch, or maximum $${budget} for a good one. Be lenient: the player is asked to pitch a ridiculous startup and given a strict character limit, so don't expect much information. The game is not meant to be realistic or difficult, so you should usually invest unless their pitch is really terrible. Never expect or ask for more information, they can't respond to you and you are exiting the elevator. You will be provided with the player's pitch in full, answer only with the investor's response verbatim. If you're given an empty message or nonsense, tell them you don't have time for this.` },
          { 'role': 'user', 'content': prompt }
        ]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
};