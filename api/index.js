export default async (req, res) => {
  try {
    const fetchModule = await import('node-fetch');
    const fetch = fetchModule.default;

    const prompt = req.body.prompt;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 100,
        messages: [
          { 'role': 'system', 'content': 'You are an NPC in a game playing the role of an investor the player has met in an elevator. They will pitch their startup to you. Provide brief feedback, state whether you will invest, and if so, how much (include a dollar sign). Be lenient: the player is asked to pitch a ridiculous startup and given a strict character limit, so don\'t expect much information. The game is not meant to be realistic or difficult, so you should usually invest unless their pitch is really terrible. Never expect or ask for more information, they can\'t reasonably provide anything more than they already have.' },
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