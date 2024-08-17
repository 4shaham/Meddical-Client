
import  {ZegoUIKitPrebuilt}  from "@zegoCloud/zego-uikit-prebuilt";
import { useLocation } from 'react-router-dom';



function VedioCall() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query: string | null = searchParams.get("roomId");  
   
    const roomId=query

    const myMettings=async(element:any)=>{

        
        if(!roomId){
            return
        }

        const appId=402039914
        const serverSecret:string="0e06f7dcb9aa7d5b3148bb58867134ad"
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appId,serverSecret,roomId,Date.now().toString(),"jk")

        const zc=ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name:'Copy Link',
                    url:`http://localhost:5173/vedioCallRoom?roomId=${roomId}`
                }
            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton:false
        })
    }

  return (
    <div>
        <div ref={myMettings} />
    </div>
  )

}

export default VedioCall



