// /src/utils/spotify.ts

import { NextApiRequest } from "next"

export const getUserTopTracks = async () => {
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      "Authorization": `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
    },
  })
  const data = await res.json()
  return data.items  // Returns an array of top tracks
}

export const getUserDataFromSpotify = async (req: NextApiRequest) => {
  const accessToken = req.cookies.spotify_access_token  // Assuming token is stored in a cookie
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  })
  const userData = await res.json()
  return userData
}
