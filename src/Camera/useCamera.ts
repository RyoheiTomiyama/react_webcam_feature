import { RefObject, useCallback } from "react";
import Webcam from "react-webcam";

type UseCameraProps = {
  ref: RefObject<Webcam>;
};
export const useCamera = ({ ref }: UseCameraProps) => {
  // const getScreenshot = useCallback(() => {
  //   const video = ref.current?.video;
  //   const rect = video?.getBoundingClientRect();
  //   // width / height
  //   const ratio = rect ? rect.width / rect.height : 1;
  //   const maxSize = 1980;
  //   const screenshot =
  //     // 2:3 => 1320:1980  3:2 => 1980:1320
  //     ref.current?.getScreenshot() ?? undefined;
  //   if (screenshot) {
  //     downloadBase64File(screenshot, "hoge");
  //   }
  // }, [ref]);

  const getScreenshot = useCallback(async () => {
    const video = ref.current?.video;
    if (!video) {
      return;
    }

    // 書き出しサイズ
    const { width, height } = calcOutpuSize(video);

    const canvas = document.createElement("canvas");
    // canvas.style.display = "none";
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // draw canvas
    const zoom = video.getBoundingClientRect().width / video.clientWidth;
    ctx.imageSmoothingEnabled = true;
    ctx.scale(zoom, zoom);
    const dx = (width / zoom - video.videoWidth) / 2;
    const dy = (height / zoom - video.videoHeight) / 2;
    ctx.drawImage(video, dx, dy, video.videoWidth, video.videoHeight);

    // output
    const screenshot = canvas.toDataURL("image/jpeg", 1);
    downloadBase64File(screenshot, "canvas");
  }, []);

  return {
    getScreenshot,
  } as const;
};

function downloadBase64File(contentBase64: string, fileName: string) {
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  downloadLink.href = contentBase64;
  downloadLink.target = "_self";
  downloadLink.download = fileName;
  downloadLink.click();
}

/**
 * 表示している比率で書き出すためのサイズを計算する
 * カメラの最大画質で書き出す
 */
const calcOutpuSize = (video: HTMLVideoElement) => {
  // 書き出し対比率
  const ratio = video.clientWidth / video.clientHeight;

  // カメラの出力画質
  const originalWidth = video.videoWidth;
  const originalHeight = video.videoHeight;
  const originalRatio = originalWidth / originalHeight;

  // オリジナルより横長に書き出すときは、横が最大幅になる
  if (ratio > originalRatio) {
    return {
      width: originalWidth,
      height: originalWidth / ratio,
    };
  }
  // オリジナルより縦長に書き出すときは、縦が最大幅になる
  return {
    width: originalHeight * ratio,
    height: originalHeight,
  };
};
