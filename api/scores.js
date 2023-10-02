import { kv } from '@vercel/kv/dist/index.cjs';

export default async (req, res) => {
  try {
    let { score, name } = req.body;

    name = name.replace(/[^a-zA-Z0-9]/g, '');

    let scoresData = await kv.get('scores');

    let scores;
    if (scoresData && typeof scoresData === 'object') {
      scores = scoresData;
    } else if (scoresData && typeof scoresData === 'string') {
      scores = JSON.parse(scoresData);
    } else {
      scores = [];
    }

    scores.push({ name, score });
    scores.sort((a, b) => b.score - a.score);
    await kv.set('scores', JSON.stringify(scores));
    res.json({ scores });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
};
