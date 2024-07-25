
export interface Data{
    doctorId:string
    userId:string,
}

export default interface IConverasation{
    _id:string,
    members:Data[],
    createdAt:string,
    updatedAt:string
}


export  interface IMessage{
    _id:string,
    conversationId:string,
    sender:string,
    text:string,
    createdAt:string,
    updateAt:string
}