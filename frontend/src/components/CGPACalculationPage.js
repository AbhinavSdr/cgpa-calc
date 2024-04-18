import React, { useState } from 'react';

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
    <div>
      <h1>CGPA Calculation</h1>
      <p>Enter SGPA of semesters (out of 10)</p>
      {semesters.map((semester, index) => (
        <input key={index} type="number" placeholder={`Semester ${index + 1}`} value={semester} onChange={(e) => handleChange(index, e.target.value)} />
      ))}
      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleClear}>Clear</button>
      {cgpa && <p>CGPA: {cgpa}</p>}
    </div>
  );
}

export default CGPACalculationPage;
