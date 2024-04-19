import React, { useState } from 'react';
import style from "./style.module.css"
import { TextField,Button,FormControl } from '@mui/material'

function CGPACalculationPage() {
  const [semesters, setSemesters] = useState(Array(8).fill(''));
  const [cgpa, setCGPA] = useState(null);

  const handleChange = (index, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index] = value;
    setSemesters(updatedSemesters);
  };

  const handleCalculate = async () => {
    try {
      // Calculate CGPA logic
      const totalGrades = semesters.reduce((acc, curr) => acc + parseFloat(curr), 0);
      const calculatedCGPA = totalGrades / semesters.length;
      setCGPA(calculatedCGPA.toFixed(2)); // Rounded to 2 decimal places
    } catch (error) {
      console.error('Error calculating CGPA:', error);
      alert('An error occurred while calculating CGPA. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      // Save CGPA logic
      const token = sessionStorage.getItem('token');
      console.log(token);
      const response = await fetch('/api/cgpa/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ semesters, cgpa }),
      });
      if (response.ok) {
        alert('CGPA saved successfully');
      } else {
        alert('Failed to save CGPA');
      }
    } catch (error) {
      console.error('Error saving CGPA:', error);
      alert('An error occurred while saving CGPA. Please try again.');
    }
  };

  const handleClear = () => {
    setSemesters(Array(8).fill(''));
    setCGPA(null);
  };

  const handleLoad = async () => {
    try {
      // Load CGPA logic
      const token = sessionStorage.getItem('token');
      const response = await fetch('/api/cgpa/load', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Assuming response format is an object with semesters array and cgpa value
        setSemesters(data.semesters);
        setCGPA(data.cgpa);
      } else {
        alert('Failed to load CGPA');
      }
    } catch (error) {
      console.error('Error loading CGPA:', error);
      alert('An error occurred while loading CGPA. Please try again.');
    }
  };

  return (
    <div id={style.calc}>
      
      <h1 style={{color:"white",fontSize:"50px",textShadow:"2px 4px black"}}>CGPA Calculation</h1>
      <p style={{color:"white",fontSize:"20px",textShadow:"2px 4px black",marginTop:"20px"}}>Enter SGPA of semesters (out of 10)</p>
      <div id={style.container3}>
      {semesters.map((semester, index) => (
        // <input key={index} type="number" placeholder={`Semester ${index + 1}`} value={semester} onChange={(e) => handleChange(index, e.target.value)} />
        <TextField key={index} type={Number} placeholder={`Semester ${index + 1}`} value={semester} onChange={(e) => handleChange(index, e.target.value)} id="outlined-basic" sx={{width:"300px",marginTop:"20px",marginLeft:"10px"}} label="" variant="outlined"/>
      ))}
      {/* <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleClear}>Clear</button> */}
     <div id={style.btnbox}>
     <Button onClick={handleCalculate} variant="contained" sx={{marginTop:"10px",marginLeft:"1px"}}>Calculate</Button>
      <Button onClick={handleClear} variant="contained" sx={{marginTop:"10px",marginLeft:"1px"}}>Clear</Button>
     </div>
      {cgpa && <p>CGPA: {cgpa}</p>}
      </div>
      
    </div>
  );
}

export default CGPACalculationPage;
