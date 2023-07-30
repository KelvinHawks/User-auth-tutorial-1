import React, {useState} from 'react'
import axios from 'axios'
import './register.css'

function Register() {
    const[inputValue, setInputValue] = useState({
        username:'',
        email:'',
        password:''
      })
      const[formErrors, setFormError] = useState({})
      const handleChange = (e)=>{
        const{name,value} = e.target
          setInputValue({
          ...inputValue,
          [name]:value
        })
        }
      const handleSubmit = (e)=>{
        e.preventDefault()
        setFormError(validate(inputValue))
        console.log(inputValue);
       fetch('http://localhost:5000/api/users/register',{
          method:'POST',
          headers:{'content-Type':'application/json'},
          body:{
            username:inputValue.username,
            email:inputValue.email,
            password:inputValue.password
        }
        }).then((res)=>{
          console.log(res.json);
        }).catch((error)=>{
            console.log(error);
        })
        

        
        setInputValue({username:'',email:'',password:''})
      }

      const validate = (value)=>{
        let error = {}
        if(!value.username){
          error.username = 'Username required'
        }
        if(!value.email){
          error.email = 'Email required'
        }
        if(!value.password){
          error.password = 'Enter a password'
        }
        return error
      }
    
  return (
    <div className='App'>
        <form onSubmit={handleSubmit}>
            <input type='text' name='username' value={inputValue.username} placeholder='username' onChange={handleChange}/>
            <p>{formErrors.username}</p>
            <input type='email' name='email'  value={inputValue.email} placeholder='email' onChange={handleChange}/>
            <p>{formErrors.email}</p>
            <input type='password' name='password'  value={inputValue.password} placeholder='password' onChange={handleChange}/>
            <p>{formErrors.password}</p>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register