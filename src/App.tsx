import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./App.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { usePinch } from "@use-gesture/react";

const videoConstraints: MediaTrackConstraints = {
  width: {
    ideal: 4000,
  },
  height: {
    ideal: 4000,
  },
  facingMode: { exact: "environment" },
};

function App() {
  const [media, setMedia] = useState<any>();
  const targetRef = useRef<HTMLDivElement>(null)

  const getMedia = useCallback(async () => {
    return await navigator.mediaDevices.enumerateDevices();
  }, []);

  useEffect(() => {
    getMedia().then(setMedia);
  }, []);

  const [zoom, setZoom] = useState(1);

  usePinch(({offset: [scale]}) => {
    setZoom((z) => {
      const nextZoom = z * scale
      if (nextZoom < 1 ) {
        return 1
      }
      if (nextZoom > 4) {
        return 4
      }
      return nextZoom
    })
  }, {
    target: targetRef,
    scaleBounds: {
      min: 1,
      max: 4,
    },
  })


  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
      {/* <p>{JSON.stringify(media)}</p> */}
      {/* <TransformWrapper
        centerZoomedOut={true}
        limitToBounds={false}
        smooth={false}
        maxScale={4}
        minPositionX={1}
        maxPositionX={1}
        minPositionY={1}
        maxPositionY={1}
        wheel={{ disabled: true }}
        panning={{ disabled: true }}
        zoomAnimation={{ disabled: true, size: 1 }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent> */}
          <div
            ref={targetRef}
            style={{ scale: zoom, width: "100%", height: "100%", objectFit: "cover", background: 'linear-gradient(90deg, rgba(2,0,36,1) 24%, rgba(0,212,255,1) 100%)' }}
          ></div>
          {/* <Webcam
            videoConstraints={videoConstraints}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          /> */}
        {/* </TransformComponent>
      </TransformWrapper> */}
    </div>
  );
}

export default App;
