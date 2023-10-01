import { kv } from '@vercel/kv/dist/index.cjs';

export default async (req, res) => {
  try {
    const { score, name } = req.body;

    let scoresData = await kv.get('scores');

    console.log('Retrieved scoresData:', scoresData);

    let scores;
    if (scoresData && typeof scoresData === 'object') {
      scores = scoresData;
    } else if (scoresData && typeof scoresData === 'string') {
      scores = JSON.parse(scoresData);
    } else {
      scores = [];
    }

    console.log('Parsed scores:', scores);

    scores.push({ name, score });
    console.log('Scores after push:', scores);

    scores.sort((a, b) => b.score - a.score);
    console.log('Scores after sort:', scores);

    await kv.set('scores', JSON.stringify(scores));
    console.log('Scores saved to KV:', JSON.stringify(scores));

    res.json({ scores });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
};
