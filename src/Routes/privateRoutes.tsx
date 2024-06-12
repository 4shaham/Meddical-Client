import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
    console.log(Navigate,"dhfjdhfjdhfjdhfjd")
  let auth = {'token':true}
return (
    auth.token ? <Outlet/> : <Navigate to=''/>
  )
}

export default PrivateRoutes