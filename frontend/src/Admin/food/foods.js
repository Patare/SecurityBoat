import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './foods.css';
import Sidebar from '../navbar/Sidebar';
function Foods() {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    axios.get('http://localhost:5000/menu')
      .then(res => {
        setMenuItems(res.data);
        console.log(res.data)
      })
      .catch(err => console.error('Error fetching menu items:', err));
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setNewMenuItem({ ...newMenuItem, image: e.target.files[0] });
    } else {
      setNewMenuItem({ ...newMenuItem, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newMenuItem.name);
    formData.append('category', newMenuItem.category);
    formData.append('price', newMenuItem.price);
    formData.append('description', newMenuItem.description);
    if (newMenuItem.image) {
      formData.append('image', newMenuItem.image);
    }

    if (isEditing) {
      axios.put(`http://localhost:5000/menu/${editingId}`, formData)
        .then(res => {
          fetchMenuItems();
          setNewMenuItem({ name: '', category: '', price: '', description: '', image: null });
          setIsEditing(false);
          setEditingId(null);
        })
        .catch(err => console.error('Error updating menu item:', err));
    } else {
      axios.post('http://localhost:5000/menu', formData)
        .then(res => {
          setMenuItems([...menuItems, res.data]);
          setNewMenuItem({ name: '', category: '', price: '', description: '', image: null });
        })
        .catch(err => console.error('Error adding menu item:', err));
    }
  };

  const handleEdit = (item) => {
    setNewMenuItem(item);
    setIsEditing(true);
    setEditingId(item._id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/menu/${id}`)
      .then(res => {
        fetchMenuItems();
      })
      .catch(err => console.error('Error deleting menu item:', err));
  };

  return (<>
  <Sidebar/>

    <div className="admin-panel">
      <h2>Food Menu Management</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newMenuItem.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newMenuItem.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Menu Item</button>
      </form>
      <div className="menu-items">
        {menuItems.map(item => (
          <div className="menu-item" key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
            {item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.name} className='w-25'/>}
            <br/>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Foods;

