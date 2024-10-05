import React, { useEffect, useState } from 'react'
import './App.css'
const App = () => {
  const initialValues={username:"",email:"",password:""};
  const [formValues,setFormValues]=useState(initialValues);
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSumit]=useState(false);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormValues({...formValues,[name]:value});
  }
  const handleSumit=(e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSumit(true);
  }

  useEffect(()=>{
    if(Object.keys(formErrors).length===0 && isSubmit){
      console.log(formValues)
    }
    else{
      setFormValues(initialValues);
    }
  },[formErrors,isSubmit])

  const validate=(values)=>{
       const errors={};
       const regex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
       if(!values.username){
        errors.username="Username is required";
       }
       if(!values.email){
        errors.email="Email is required";
       } else if(!regex.test(values.email)){
        errors.email="Email is not valid";
       }
       if(!values.password){
        errors.password="Password is required";
       } else if(values.password.length<4){
        errors.password="Password is not less than 4";
       }else if(values.password.length>10){
        errors.password="Password is not greather than 10";
       }

     return errors;
  }
  return (
    <div className='container'>
      {Object.keys(formErrors).length===0 && isSubmit?<div className='sign'><h1>Signed in successfully</h1> <button onClick={()=> setIsSumit(false)}>Another Registration </button></div>:
      <div className='sign'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSumit}>
        <label htmlFor="">Username</label>
        <input type="text" name='username' placeholder='enter your name' value={formValues.username} onChange={handleChange} />
        <p>{formErrors.username}</p>
        <label htmlFor="">Email</label>
        <input type="email" name='email' placeholder='enter your email' value={formValues.email} onChange={handleChange}/>
        <p>{formErrors.email}</p>
        <label htmlFor="">Password</label>
        <input type="password" placeholder='enter your password' name='password' value={formValues.password} onChange={handleChange}/>
        <p>{formErrors.password}</p>
        <button>Submit</button>
      </form>
      </div>
}
    </div>
  )
}

export default App
