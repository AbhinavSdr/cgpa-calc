import React, { useState, useEffect } from 'react';

function CGPACalculationPage() {
  const [semesters, setSemesters] = useState(Array(8).fill(''));
  const [cgpa, setCGPA] = useState(null);

  useEffect(() => {
    // Load CGPA data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cgpa/load');
        const data = await response.json();
        if (response.ok) {
          setSemesters(data.semesters);
          setCGPA(data.cgpa);
        } else {
          alert('Failed to load CGPA');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (index, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index] = value;
    setSemesters(updatedSemesters);
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('/api/cgpa/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ semesters }),
      });
      const data = await response.json();
      if (response.ok) {
        setCGPA(data.cgpa);
      } else {
        alert('Failed to calculate CGPA');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/cgpa/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ semesters, cgpa }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('CGPA saved successfully');
      } else {
        alert('Failed to save CGPA');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleClear = () => {
    setSemesters(Array(8).fill(''));
    setCGPA(null);
  };

  return (
    <div>
      <h1>CGPA Calculation</h1>
      {semesters.map((semester, index) => (
        <input key={index} type="number" placeholder={`Semester ${index + 1}`} value={semester} onChange={(e) => handleChange(index, e.target.value)} />
      ))}
      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleClear}>Clear</button>
      {cgpa && <p>CGPA: {cgpa}</p>}
      <button onClick={handleSave}>Save</button>
      <button onClick={() => window.location.reload()}>Load</button>
    </div>
  );
}

export default CGPACalculationPage;
