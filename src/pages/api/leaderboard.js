import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('multiplayer-game');

  const leaderboard = await db
    .collection('leaderboard')
    .find({})
    .sort({ score: -1 })
    .toArray();

  res.json(leaderboard);
}