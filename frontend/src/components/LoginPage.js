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
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    // Handle login logic, send email and password to backend for authentication
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        //const { token } = await response.json();
        sessionStorage.setItem('token', data);
        // Redirect to CGPA calculation page upon successful login
        navigate('/cgpa-calculation');
      } else {
        // Handle login failure
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div id={style.loginpage}>
      <h1 style={{color:"white",fontSize:"50px"}}>Login</h1>
      {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
     <div id={style.container}>
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
      {/* <button onClick={handleLogin}>Login</button> */}
      <Button onClick={handleLogin} variant="contained" sx={{marginTop:"10px",marginLeft:"1px"}}>Login</Button>
      <p style={{marginTop:"20px"}}>Don't have an account? <a href="/register" style={{textDecoration:"none"}}>Register</a></p>
     </div>
    </div>
  );
}

export default LoginPage;
