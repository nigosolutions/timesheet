import React, { useState } from "react";
import Webcam from "react-webcam";

const ImageCapture = () => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);
  const [captured, setcaptured] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setcaptured(imageSrc);
  }, [webcamRef]);

  return (
    <center>
      {captured === "" ? (
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      ) : (
        <img src={captured} />
      )}
      <br />
      {captured === "" ? (
        <button className="btn btn-dark" onClick={capture}>
          <i class="fas fa-camera-retro"></i>
        </button>
      ) : (
        <button className="mt-2 btn btn-dark" onClick={() => setcaptured("")}>
          Retake Image
        </button>
      )}
    </center>
  );
};

export default ImageCapture;
