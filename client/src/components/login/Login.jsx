import React, {useState} from 'react'
import './login.css'

function Login() {
    const[inputValue, setInputValue] = useState({
        email:'',
        password:''
      })
      const handleChange = (e)=>{
        const{name,value} = e.target
          setInputValue({
          ...inputValue,
          [name]:value
        })
        }
      const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/users/login',{
          method:'POST',
          headers:{'content-Type':'appplication/json'},
          body:JSON.stringify({
            email:inputValue.email,
            password:inputValue.password
          })
        })
        const data = await response.json()
        if(data.user){
          alert('login successful')
        }else{
          alert('Please check your username or password')
        }
        setInputValue({email:'',password:''})
      }
    
  return (
    <div className='App'>
        <form onSubmit={handleSubmit}>
            <input type='email' name='email'  value={inputValue.email} placeholder='email' onChange={handleChange}/>
            <input type='password' name='password'  value={inputValue.password} placeholder='password' onChange={handleChange}/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Login