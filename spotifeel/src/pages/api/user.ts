// /src/pages/api/user.ts

import { NextApiRequest, NextApiResponse } from "next"
import { getUserDataFromSpotify } from "@/src/lib/spotify"  // Assuming utility to fetch user data

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getUserDataFromSpotify(req)  // Fetch data using the user's access token
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" })
  }
}
