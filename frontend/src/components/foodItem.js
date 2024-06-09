import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar/navbar'
function FoodItem() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    axios.get('http://localhost:5000/menu')
      .then(res => {
        setMenuItems(res.data);
        console.log(res.data);
      })
      .catch(err => console.error('Error fetching menu items:', err));
  };

  const handleOrder = (item) => {
    console.log('Ordering item:', item);
   
  };

  return (
    <>
    <Navbar/>
    <div className="app-container">
      <div class="container-fluid mt-5">
    
	<div class="row">
    {menuItems.map(item => (
		<div class=" col-12 col-sm-6  col-lg-3 bg-light">
        {item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.name} className='w-100' height="300px"/>}
			<div class="col-4 bg-warning ml-3 text-center mt-3" style={{float: 'left', border:'1px solid black', borderRadius:'50px'}}>{item.name}</div>

			<div class="col-4 bg-light ml-2 mt-3" style={{float:'left',fontWeight:"bold", fontSize:"18px"}}> ₹ {item.price.toFixed(2)} </div>
			<br/>
			<p class="text-justify font-weight-bold mt-5">{item.description}</p>
            <button onClick={() => handleOrder(item)}>Order Now</button>
		</div>
         ))}
        </div>
            
        </div>
    </div>
    </>
  );
}

export default FoodItem;
