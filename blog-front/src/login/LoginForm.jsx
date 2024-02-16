import{ useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../slices/userSlice'
import { Box, Button, Checkbox, TextField } from '@mui/material'
import { notify } from '../slices/notiSlice'

const LoginForm = () => {
const [credentials, setCredentials] = useState({username: '', password: ''})

const dispatch = useDispatch()
const passwordRef = useRef(null)

const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(credentials))
    dispatch(notify(`Welcome ${credentials.username}`, 5))
    setCredentials({username: '', password: ''})
}

const togglePassword = () => {
    if (passwordRef.current.type === "password") {
        passwordRef.current.type = "text"
    } else {
        passwordRef.current.type = "password"
    }
}
 
  return (
    <>
       <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Aseta korkeus sivun koko korkeuteen
    >
     <h2 >Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <TextField label='username' required type="text" id="username" name="username" value={credentials.username} onChange={handleChange}/>
            </div>
            <br />
            <div>
            
               
                 <TextField label='password' required inputRef={passwordRef} type="password" id="password" name="password" value={credentials.password} onChange={handleChange}/>
                 <br />
                <Checkbox label='Show Password' type="checkbox" id="show-password" onChange={togglePassword}/> Show Password
            </div>
            <br />
            <Button sx={{ width: '100%' }} variant='contained' type="submit">Login</Button>
        </form>
        </Box>
    </>

  )
}

export default LoginForm
