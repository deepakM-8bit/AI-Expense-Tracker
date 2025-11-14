import pool from "../db";

export const getAnalytics = async(req,res) => {
    const userId = req.user.id;

    try{
        //category totals
        const categoryQuery = await pool.query(
            `SELECT category, SUM(amount) AS total
            FROM expenses WHERE user_id=$1
            GROUP BY category
            ORDER BY total DESC`,[userId]
        );

        //monthly totals
        const monthQuery = await pool.query(
            `SELECT TO_CHAR(date, 'MM-YYYY') AS month,
            SUM(amount) AS total
            FROM expenses WHERE user_id=$1
            GROUP BY month
            ORDER BY month ASC`,[userId]
        );

        //daily trends
        const trendQuery = await pool.query(
            `SELECT date, SUM(amount) AS total
            FROM expenses WHERE user_id=$1
            GROUP BY date 
            ORDER BY date ASC`,[userId]
        );

        return res.json({
            categoryTotal:categoryQuery.rows,
            monthTotal: monthQuery.rows,
            dailyTrend: trendQuery.rows,
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"analytics fetch error"});
    }
}