import { GoogleGenerativeAI } from "@google/generative-ai";
import pool from "../db.js";

export const aiInsights = async (req, res) => {
  const userId = req.user.id;

  try {
    // fetch analytics data
    const cat = await pool.query(
      `SELECT category, SUM(amount) AS total
       FROM expenses WHERE user_id=$1
       GROUP BY category`,
      [userId]
    );

    const monthly = await pool.query(
      `SELECT TO_CHAR("date", 'YYYY-MM') AS month,
       SUM(amount) AS total
       FROM expenses WHERE user_id=$1
       GROUP BY month`,
      [userId]
    );

    const trend = await pool.query(
      `SELECT "date"::date AS date,
       SUM(amount) AS total
       FROM expenses WHERE user_id=$1
       GROUP BY date
       ORDER BY date ASC`,
      [userId]
    );

    const analyticsData = {
      categories: cat.rows,
      monthly: monthly.rows,
      trend: trend.rows,
    };

    // Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this user's spending data and generate:
      - 3 personalized saving suggestions
      - The highest spending category
      - Identify wasteful patterns
      - Spending predictions
      - Anything unusual
      - Tips for better financial health

      DATA:
      ${JSON.stringify(analyticsData, null, 2)}
    `;

    const result = await model.generateContent(prompt);

    res.json({
      insights: result.response.text(),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI insights error" });
  }
};
