import { query } from "../../lib/db";

export default async function handler(req, res) {
  const id = req.body.id;
  console.log(req.body)
  try {
    const querySql = "SELECT * FROM blogs WHERE Id=?";
    const valuesParams = [id];
    const data = await query({ query: querySql, values: valuesParams });
    
    res.status(200).json({ entries: data });
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}