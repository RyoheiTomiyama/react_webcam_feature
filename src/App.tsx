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
    <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
      <Camera ref={cameraRef} />
      <button onClick={handleCapture}>Capture</button>
    </div>
  );
}

export default App;
