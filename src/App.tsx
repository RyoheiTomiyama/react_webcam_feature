import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";
import { Camera, useCamera } from "./Camera";

function App() {
  const cameraRef = useRef<Webcam>(null);
  const { getScreenshot } = useCamera({ ref: cameraRef });

  const handleCapture = useCallback(() => {
    console.log(getScreenshot());
  }, [getScreenshot]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "red",
      }}
    >
      <Camera ref={cameraRef} />
      <button
        onClick={handleCapture}
        style={{
          position: "absolute",
          bottom: "50%",
          left: 20,
        }}
      >
        Capture
      </button>
    </div>
  );
}

export default App;
