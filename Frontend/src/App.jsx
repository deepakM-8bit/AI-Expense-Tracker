import { useEffectEvent,useState } from "react";
import axios from 'axios';

const API = 'https://localhost:3000/api/expenses';
const App = () =>{
  return(
    <>
      <form>
        <label>title
          <input 
          type="text"          
          placeholder="Title of the expense"
          />
        </label>

        <label>title
          <input 
          type="text"          
          placeholder="Title of the expense"
          />
        </label>

        <label>title
          <input 
          type="text"          
          placeholder="Title of the expense"
          />
        </label>

        <label>title
          <input 
          type="text"          
          placeholder="Title of the expense"
          />
        </label>

        <label>title
          <input 
          type="text"          
          placeholder="Title of the expense"
          />
        </label>

      </form>
    </>
  );
}

export default App;