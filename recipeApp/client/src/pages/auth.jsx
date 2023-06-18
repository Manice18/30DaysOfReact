import { useState } from 'react'
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='auth'>
    <Login />
    <Register />
    </div>
  )
}

const Login = () =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [ , setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login",{
                username,
                password
            });
            setCookies("access_token",response.data.token);
            window.localStorage.setItem("userID",response.data.userID);
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Form 
        type="Login" 
        username={username}
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        onSubmit={onSubmit}
        />
    )
}

const Register = () =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = async(event) =>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register",{
                username,
                password
            });
            alert("Registration Completed! Now Login")
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <Form 
        type="Register" 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        onSubmit={onSubmit}
        />
    )
}



const Form = ({username, setUsername, password, setPassword, type, onSubmit}) => {
    return(
    <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h2>{type}</h2>
                <div className='form-group'>
                    <label htmlFor="username">Username: </label>
                    <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event)=> setUsername(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password: </label>
                    <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)} />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
    
}


export default Auth