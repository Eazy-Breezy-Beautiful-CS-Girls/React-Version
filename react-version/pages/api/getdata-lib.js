import { query } from "../../lib/db";

export default async function handler(req, res) {
  // const id = req.body.Id;
  try {

    const querySql = "SELECT * FROM blogs";
    const valuesParams = [];
    const data = await query({ query: querySql, values: valuesParams });
    
    res.status(200).json({ entries: data });
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}