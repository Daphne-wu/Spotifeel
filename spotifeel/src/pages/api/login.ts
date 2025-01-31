import { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAuthUrl } from '../../utils/spotify';
import crypto from 'crypto';
import cookie from 'cookie';

const generateRandomState = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = generateRandomState(); 
  const authUrl = getSpotifyAuthUrl(state);

  // Set state in a cookie for verification in the callback
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('spotify_auth_state', state, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only set in HTTPS
      maxAge: 300, // Expire after 5 minutes
      path: '/', // Cookie available to all routes
    })
  );

  // Redirect user to Spotify's authorization URL
  res.redirect(authUrl);
}
