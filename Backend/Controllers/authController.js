import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from "../db.js";

//signup user
export const registerUSer = async (req,res)=> {
        const {email,name,password} = req.body;
        try{
            const [rows] = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
            if(rows.length > 0){
                alert("User already exist kindly Login");
                return res.status(404).json({message:"User already exist"});
            }
                const hashedPassword = await bcrypt.hash(password,10);
                const result = await pool.query("INSERT INTO user (name,email,password) VALUES $1,$2,$3 RETURNING id",
                 [name,email,hashedPassword]);
                 alert("User registered successfully");
                res.status(200).json({userId: result.rows[0].id,message:"user registerd succesfully"});
         }catch(err){
            res.status(500).json(err.message);
         }
}

//login user
export const loginUser = async (req,res)=>{
        const {email,password} = req.body;
        try{
            const result = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
            if(result.rowCount === 0){
                alert("User not found kindly Signup");
                res.status(404).json({message:"user not registered"});
            }
            const user = result.rows[0];
            const valid = await bcrypt.compare(password, user.hashedPassword);
            if(!valid){
                 alert("incorrret password");
                return res.status(403).json({error:"wrong password"})
            }
            const token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET);
            res.json({token});
        }catch(err){
            res.status(500).json(err.message);
        }
}