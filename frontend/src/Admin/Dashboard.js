import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chart.js/auto';
import Sidebar from './navbar/Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function Dashboard() {
  const [year, setYear] = useState(2021);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
    <Sidebar/>
    <div className="App">
      <h1 style={{marginTop:"-1500px"}}> Dashboard</h1>
      
    </div>
    </>
  );
}

export default Dashboard;
