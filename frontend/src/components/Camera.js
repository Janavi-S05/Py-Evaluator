import React,{useEffect,useRef, useState} from 'react';
import { useCallback } from 'react';
import Webcam from 'react-webcam';
import './component.css';
const videoConstraints={
    width:540,
    facingMode:'environment'
}

const Camera=()=>{

    const webcamRef=useRef(null);

    const[url,setUrl]=useState(null);
    console.log(url);
    const capturePhoto = useCallback(async()=>{
        const imageSrc=webcamRef.current.getScreenshot();

        setUrl(imageSrc)
    },[webcamRef])

    const onUserMedia=(e)=>{
        console.log(e);
    }

    return(
        <>
            <Webcam

            ref={webcamRef}
            audio={true}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
            mirrored={true}
             class="video"/>

            {/* <button onClick={capturePhoto}>Capture</button>
            <button onClick={()=>setUrl(null)}>Refresh</button> */}

            {url && (
                <div>
                    <img src={url} alt='Screenshot'/>
                </div>
            )}
        </>
    )

}

export default Camera;
