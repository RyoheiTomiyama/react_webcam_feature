import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./App.css";
import { Camera, useCamera } from "./Camera";

function App() {
  const cameraRef = useRef<Webcam>(null);
  const { getScreenshot } = useCamera({ ref: cameraRef });
  const [loading, setLoading] = useState(false);

  const handleCapture = useCallback(async () => {
    setLoading(true);
    await setTimeout(() => {
      setLoading(false);
    }, 1000);
    getScreenshot();
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
        disabled={loading}
      >
        {loading && (
          <i className="fa fa-spinner fa-spin" style={{ marginRight: 4 }}></i>
        )}
        Capture
      </button>
    </div>
  );
}

export default App;
