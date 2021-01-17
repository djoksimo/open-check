import Webcam from "react-webcam";
import withRoot from './modules/withRoot';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user"
  };
   
function Selfie(){
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
      },
    [webcamRef]
);
   
    return (
        <div>
            <Webcam
            audio={false}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={360}
            videoConstraints={videoConstraints}
            />
            <br></br>
            <IconButton style={{paddingLeft: 160}} onClick={capture} color="primary">
                <PhotoCamera />
            </IconButton>
      </div>
    );
}

export default withRoot(Selfie);
