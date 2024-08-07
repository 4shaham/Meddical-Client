

const adminRoutes={
    singIn:'/api/admin/login',
    logout:'/api/admin/logout',
    getToken:'/api/admin/getToken',
    addSpecality:'/api/admin/addSpecalities',
    findspecality:'/api/admin/findAllSpecaities',
    deleteSpecality:'/api/admin/deleteSpecality',
    getNewRequestDoctors:'/api/admin/findAllNewRequestDoctor',
    getDoctorDataVerification:'/api/admin/findeKycVerificatioData',
    updateDoctorKycStatus:'/api/admin/doctorKycVerification',
    getEditSpecalityData:'/api/admin/getEditSpecalityData',
    updateSpecality:'/api/admin/updateSpecality',
    deletedSpecalityData:'/api/admin/deletedSpecalityData',
    updatedDeletedSpecalityStatus:'/api/admin/restoreSpecality',
    getTransactionHistory:'/api/admin/fetchPaymentHistory',
    getInvoiceData:'/api/admin/invoiceData',
    getAllUsers:'/api/admin/getUsers',  
    getAllDoctos:'/api/admin/getDoctors',
    userBlocked:'/api/admin/userBlocked',
    userUnBlocked:'/api/admin/userUnBlocked',
    doctorBlocked:'/api/admin/doctorBlocked',
    doctorUnBloced:'/api/admin/doctorUnBlocked',
    specalityChartData:'/api/admin/specalityChart'
}

export default adminRoutes