

const adminRoutes={
    singIn:'/api/admin/login',
    logout:'/api/admin/logout',
    getToken:'/api/admin/getToken',
    addSpecality:'/api/admin/addSpecalities',
    findspecality:'/api/admin/findAllSpecaities',
    deleteSpecality:'/api/admin/deleteSpecality',
    getNewRequestDoctors:'/api/admin/findAllNewRequestDoctor',
    getDoctorDataVerification:'/api/admin/findeKycVerificatioData',
    updateDoctorKycStatus:'/api/admin//doctorKycVerification',
}

export default adminRoutes