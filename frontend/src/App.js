import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieManagement from './Admin/Movies/MovieManagement';
import Foods from './Admin/food/foods';
import Dashboard from './Admin/Dashboard';
import FoodItem from './components/foodItem';

const App = () => {


  return (
    <AuthProvider>
      <Router>
  
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/foodItem' element={<FoodItem/>} />
          <Route path="/movieList" element={<MovieList />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/movie" element={<MovieManagement />} />
          <Route path='dashbord' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
