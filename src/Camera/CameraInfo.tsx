import { useEffect, useLayoutEffect, useState } from "react";

type CameraInfoProps = {
  video?: HTMLVideoElement;
};
type Size = {
  width: number;
  height: number;
};
export const CameraInfo: React.FC<CameraInfoProps> = ({ video }) => {
  const [videoSize, setVideoSize] = useState<Size>({
    width: video?.videoWidth ?? 0,
    height: video?.videoHeight ?? 0,
  });
  const [displaySize, setDisplaySize] = useState<Size>();

  useEffect(() => {
    if (!video) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLVideoElement) {
          setVideoSize({
            width: video.videoWidth,
            height: video.videoHeight,
          });
          setDisplaySize({
            width: entry.target.clientWidth,
            height: entry.target.clientHeight,
          });
        }
      }
    });
    resizeObserver.observe(video);
    return () => {
      resizeObserver.unobserve(video);
    };
  }, [video]);

  useLayoutEffect(() => {
    if (!video) {
      return;
    }
    const updateSize = () => {
      setVideoSize({
        width: video.videoWidth,
        height: video.videoHeight,
      });
      setDisplaySize({
        width: video.clientWidth,
        height: video.clientHeight,
      });
    };
    video.addEventListener("loadedmetadata", updateSize);
    return () => {
      video.removeEventListener("loadedmetadata", updateSize);
    };
  }, [video]);

  return (
    <div>
      カメラ画質: {videoSize.width} x {videoSize.height}
      <br />
      画面サイズ: {displaySize?.width ?? 0} x {displaySize?.height ?? 0}
    </div>
  );
};
