import { logout } from "../../Redux/slice/userAuthSlice"

const adminRoutes={
    singIn:'/api/admin/login',
    logout:'/api/admin/logout',
    getToken:'/api/admin/getToken',
}

export default adminRoutes