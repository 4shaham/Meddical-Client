import { logout } from "../../Redux/slice/userAuthSlice"

const adminRoutes={
    singIn:'/api/admin/login',
    logout:'/api/admin/logout',
    getToken:'/api/admin/getToken',
    addSpecality:'/api/admin/addSpecalities',
    findspecality:'/api/admin/findAllSpecaities'
}

export default adminRoutes