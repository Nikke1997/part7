import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, selectUsers } from "../slices/userSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"


const Users = () => {
const users = useSelector(selectUsers)

const dispatch = useDispatch()

useEffect(() => {
  dispatch(getAllUsers())
}
, [dispatch])



  return (
    <div>
      <h2>Users</h2>
      <h3 style={{marginLeft: '61%'}}>Blogs created</h3>
      <TableContainer>
        <Table>
          <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
            <Link to={`/userblogs/${user.id}`}>{user.username}</Link>
            </TableCell>
            <TableCell>
             {user.blogs.length}
            </TableCell>
             </TableRow>
        ))}
        </TableBody>
        </Table>
       </TableContainer>
    </div>
  )
}

export default Users
