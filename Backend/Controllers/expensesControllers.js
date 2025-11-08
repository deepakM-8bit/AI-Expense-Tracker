import pool from "../db.js";

console.log('DB connected successfully!');

//get all expenses
export const getExpenses = async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM expenses ORDER BY id ASC");
        res.json(result.rows);
    }catch(err){
        console.error("database error:",err.message);
        res.status(500).json({error: err.message});
    }
}

//add all expenses
export const addExpenses = async (req,res) => {
    const {title,amount,category,date,recurring,note} = req.body;
    console.log(req.body);
    try{
        const result = await pool.query("INSERT INTO expenses (title,amount,category,date,recurring,note) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [title,amount,category,date,recurring,note]
        );
        res.json(result.rows);
    }catch(err){
        console.log("database error:",err.message);
        res.status(500).json({error:err.message});
    }  
}

//update the expenses
export const updateExpenses = async (req,res) => {
    const {id} = req.params;
    const {title,amount,category,date,recurring,note} = req.body;
    console.log(req.params , req.body);

    try{
        const result = await pool.query("UPDATE expenses SET title=$1,amount=$2,category=$3,date=$4,recurring=$5,note=$6 WHERE id=$7 RETURNING *",
            [title,amount,category,date,recurring,note,id]
        );
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

//delete the expenses
export const deleteExpenses = async(req,res) => {
    const {id} = req.params;

    try{
        const result = await pool.query("DELETE FROM expenses WHERE id=$1",[id]);
        res.json({message:"Expenses deleted"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}