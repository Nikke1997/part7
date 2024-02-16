import { AppBar, Button, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <>
      <AppBar position="static" color='default'>
        <Toolbar style={{ display: 'flex'}}>
          <Link to="/"><Button color='inherit' variant='contained'>Blogs</Button></Link>
          <Link to="/users"><Button color='inherit' variant='contained'>Users</Button></Link>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavMenu
