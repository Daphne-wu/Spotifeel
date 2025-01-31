import { NextApiRequest, NextApiResponse } from 'next';
import { exchangeCodeForToken } from '../../utils/spotify';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  // Parse cookies from the request
  const cookies = cookie.parse(req.headers.cookie || '');
  const storedState = cookies.spotify_auth_state;

  // Validate the state
  if (!state || state !== storedState) {
    return res.status(400).json({ error: 'State mismatch or missing state' });
  }

  try {
    // Exchange the authorization code for tokens
    const tokenData = await exchangeCodeForToken(code as string);
    res.status(200).json(tokenData); // Return token data to the client
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
}
