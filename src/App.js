import { useState } from "react";

export default function App() {
  const [budget, setBudget] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [theList, setTheList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (!item || quantity <= 0 || price <= 0 || budget < price * quantity) {
      alert("You went over your budget! 🥲");
      return;
    }

    const listItem = {
      item,
      quantity,
      price,
    };

    setTotalPrice((money) => money + price * quantity);
    setBudget(budget - price * quantity);
    setTheList([...theList, listItem]);
    setItem("");
    setPrice("");
    setQuantity("");
  }

  function handleBudget(e) {
    e.preventDefault();

    if (budget < 0) {
      alert("Enter a valid budget!");
      setBudget(0);
      return;
    }

    setBudget(budget);
  }

  return (
    <div className="application">
      <div className="form">
        <BudgetForm
          budget={budget}
          setBudget={setBudget}
          handleBudget={handleBudget}
        />
        <BudgetAndItemForm
          item={item}
          setItem={setItem}
          quantity={quantity}
          setQuantity={setQuantity}
          price={price}
          setPrice={setPrice}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="shopping-list">
        <ShoppingListIntro />
        <ShoppingList
          theList={theList}
          setTheList={setTheList}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
          budget={budget}
          setBudget={setBudget}
        />
        <TotalPrice totalPrice={totalPrice} budget={budget} />
      </div>
    </div>
  );
}

function ShoppingList({
  theList,
  setTheList,
  setTotalPrice,
  totalPrice,
  budget,
  setBudget,
}) {
  function handleDeleteItem(itemL) {
    setTheList(theList.filter((item) => item !== itemL));
    setTotalPrice(totalPrice - itemL.price * itemL.quantity);
    setBudget(budget + itemL.price * itemL.quantity);
  }

  return (
    <>
      {theList.map((thing) => (
        <ShoppingListItem
          handleDeleteItem={handleDeleteItem}
          thing={thing}
          key={thing.item}
        />
      ))}
    </>
  );
}

function ShoppingListItem({ thing, handleDeleteItem }) {
  return (
    <div className="row">
      <div className="name">
        <button className="emoji" onClick={() => handleDeleteItem(thing)}>
          ❌
        </button>
        {thing.item}
      </div>
      <div className="quantity">{thing.quantity}</div>
      <div className="price">{thing.price}€</div>
    </div>
  );
}

function ShoppingListIntro() {
  return (
    <>
      <h2>Shopping List</h2>
      <div className="row">
        <div className="name">Item</div>
        <div className="quantity">Quantity</div>
        <div className="price">Price</div>
      </div>
    </>
  );
}

function TotalPrice({ totalPrice, budget }) {
  return (
    <div className="total-price">
      Total price: <span>{totalPrice}€</span>
      <p>Budget remaining: {budget}€</p>
    </div>
  );
}

function BudgetForm({ budget, setBudget, handleBudget }) {
  return (
    <>
      <form onSubmit={handleBudget} className="form-c">
        <label>Budget:</label>
        <input
          type="number"
          step="0.01"
          placeholder="Input your budget here"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        ></input>
        <label className="euro">€</label>
        <button type="submit">Enter budget</button>
      </form>
    </>
  );
}

function BudgetAndItemForm({
  item,
  setItem,
  quantity,
  setQuantity,
  price,
  setPrice,
  handleSubmit,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>What item do you need today?</label>
        <input
          type="text"
          placeholder="Item..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
        ></input>
        <label>How many items you need? </label>
        <input
          type="number"
          placeholder="Number of items..."
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        ></input>
        <label>Price of the item: </label>
        <input
          type="number"
          step="0.01"
          placeholder="Price of the item..."
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        ></input>
        <button type="submit">Add Item</button>
      </form>
    </>
  );
}
