import express from 'express';
import cors from 'cors';
import expensesRouter from './Routers/expensesRouter.js';

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/expenses",expensesRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});