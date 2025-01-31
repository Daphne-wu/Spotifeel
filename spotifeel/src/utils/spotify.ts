import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing Spotify environment variables');
  }

export const getSpotifyAuthUrl = (state: string): string => {
    const scope = 'user-read-private user-read-email'; //spofity api scope
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
        client_id: clientId!,
        response_type: 'code',
        redirect_uri: redirectUri!,
        state,
        scope,
      }).toString()}`;
      return authUrl;
};

export const exchangeCodeForToken = async (code: string) => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;

    try {
        const response = await axios.post(
            tokenUrl,
            new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri!,
            }),
            {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error exchanging code for token', error);
        throw error;
    }
};