import { Hono, Context, Next } from "hono";
import { rateLimit, RateLimitKeyFunc } from "@elithrar/workers-hono-rate-limit";

const app = new Hono<{ Bindings: CloudflareBindings }>();

const getKey: RateLimitKeyFunc = (c: Context): string => {
  return c.req.header("cf-connecting-ip") || "";
};

const rateLimiter = async (c: Context, next: Next) => {
  return await rateLimit(c.env.RATE_LIMITER, getKey)(c, next);
};

// Apply rate limiting to API routes
app.use("/api/*", rateLimiter);

// GPT API endpoint - matches /api/gpt
app.post("/api/gpt", async (c) => {
  try {
    const { prompt, budget } = await c.req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${c.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        temperature: 0.7,
        max_tokens: 100,
        messages: [
          {
            'role': 'system',
            'content': `You are an NPC in a game playing the role of an investor the player has met in an elevator. They will pitch their startup to you. Provide brief feedback, state whether you will invest, and if so, how much (formatted in dollars, like $100000). If you invest, choose an amount depending on the quality of the pitch. Invest less than $50000 for a bad pitch, or maximum $${budget} for a good one. Be lenient: the player is asked to pitch a ridiculous startup and given a strict character limit, so don't expect much information. Judge the pitch itself, not the product/idea. The game is not meant to be realistic or difficult, so you should usually invest unless their pitch is really terrible. Never expect or ask for more information, they can't respond to you and you are exiting the elevator. You will be provided with the player's pitch in full, answer only with the investor's response verbatim. If you're given an empty message or nonsense, tell them you don't have time for this.`
          },
          { 'role': 'user', 'content': prompt }
        ]
      })
    });

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error(error);
    return c.text(error.toString(), 500);
  }
});

// Scores API endpoint - matches /api/scores
app.post("/api/scores", async (c) => {
  try {
    let { score, name } = await c.req.json();

    // Sanitize name
    name = name.replace(/[^a-zA-Z0-9]/g, '');

    let scoresData = await c.env.SCORES.get('scores');

    let scores;
    if (scoresData) {
      try {
        scores = JSON.parse(scoresData);
      } catch {
        scores = [];
      }
    } else {
      scores = [];
    }

    if (name !== '') {
      scores.push({ name, score });
      scores.sort((a, b) => b.score - a.score);
      await c.env.SCORES.put('scores', JSON.stringify(scores));
    }

    return c.json({ scores });
  } catch (error) {
    console.error(error);
    return c.text(error.toString(), 500);
  }
});

// Serve static assets for all other routes
app.get("*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
