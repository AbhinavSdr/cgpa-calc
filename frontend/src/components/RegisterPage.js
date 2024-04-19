import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./style.module.css"
import { TextField,Button,FormControl } from '@mui/material'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleRegister = async () => {
    // Handle registration logic, send email and password to backend for registration
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect to login page upon successful registration
        navigate('/');
      } else {
        // Handle registration failure
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div id={style.regpage}>
      <h1 style={{color:"white",fontSize:"50px"}}>Register</h1>

      {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/">Login</a></p> */}
       <div id={style.container2}>
     <TextField type={email} value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" sx={{width:"300px",marginTop:"20px",marginLeft:"10px"}} label="Enter your Mail id" variant="outlined"/>
      <FormControl  value={password} onChange={(e) => setPassword(e.target.value)} sx={{ m: 1, width: '34ch',marginLeft:"15px",marginTop:"20px" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
</FormControl>
   
      <Button onClick={handleRegister} variant="contained" sx={{marginTop:"10px",marginLeft:"1px"}}>Register</Button>
      <p style={{marginTop:"20px"}}>Already have an account? <a href="/" style={{textDecoration:"none"}}>Login</a></p>
     </div>
    </div>
  );
}

export default RegisterPage;
