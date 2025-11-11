const ExpensesForm = () => {
  return(


    <form  className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl mx-4 my-6">
  <div className="grid gap-4 md:grid-cols-2">
    <input type="text" placeholder="Title" name="title" className="input" />
    <input type="number" placeholder="Amount" name="amount" className="input" />
    <select name="category" className="input">
      <option>Food</option><option>Rent</option><option>Shopping</option><option>Travel</option><option>Health</option>
    </select>
    <input type="date" name="date" className="input" />
  </div>
  <textarea placeholder="Note..." name="note" className="input mt-3" />
  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Add Expense</button>
</form>

/* <form >
        <label>title
          <input 
          type="text"          
          placeholder="Title of the expense"
          />
        </label>

        <label>Amount
          <input 
          type="number"          
          placeholder="enter amount"
          />
        </label>

        <label>Category 
          <input 
          type="text"          
          placeholder="enter category"
          />
        </label>

        <label>Date
          <input 
          type="date"          
          />
        </label>

        <label>Recurring 
          <input 
          type="checkbox"          
          />
        </label>

        <label>Note
         <textarea 
           rows="5"
           cols="30"
           placeholder="enter the note"></textarea>
        </label>
      </form> */

      
  );
}

export default ExpensesForm;