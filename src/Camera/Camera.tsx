import { usePinch } from "@use-gesture/react";
import { forwardRef, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints: MediaTrackConstraints = {
  width: {
    ideal: 4000,
  },
  height: {
    ideal: 4000,
  },
  facingMode: { ideal: "environment" },
};

export const Camera = forwardRef<Webcam>(function Camera(_, cameraRef) {
  const targetRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);

  usePinch(
    ({ offset: [scale] }) => {
      console.log(scale);
      setZoom(scale);
    },
    {
      target: targetRef,
      scaleBounds: {
        min: 1,
        max: 4,
      },
    }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
        overflow: "hidden",
      }}
    >
      {/* <p>{JSON.stringify(media)}</p> */}
      <div
        ref={targetRef}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 24%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Webcam
          ref={cameraRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          videoConstraints={videoConstraints}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
});
