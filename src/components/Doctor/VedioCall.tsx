import React from 'react'
import  {ZegoUIKitPrebuilt}  from "@zegoCloud/zego-uikit-prebuilt";


function VedioCall() {
   
    const roomId="2332"
    const myMettings=async(element:any)=>{
        const appId=402039914
        const serverSecret:string="0e06f7dcb9aa7d5b3148bb58867134ad"
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appId,serverSecret,roomId,Date.now().toString(),"piyushGarg")

        const zc=ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name:'Copy Link',
                    url:`http://localhost:5173/vedioCallRoom`
                }
            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton:false
        })
    }



  return (
    <div >
       <div ref={myMettings} />
    </div>
  )
}

export default VedioCall



