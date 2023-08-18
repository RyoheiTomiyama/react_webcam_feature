import { RefObject, useCallback } from "react";
import Webcam from "react-webcam";

type UseCameraProps = {
  ref: RefObject<Webcam>;
};
export const useCamera = ({ ref }: UseCameraProps) => {
  const getScreenshot = useCallback(() => {
    const video = ref.current?.video;
    const rect = video?.getBoundingClientRect();
    // width / height
    const ratio = rect ? rect.width / rect.height : 1;
    const maxSize = 1980;
    const screenshot =
      // 2:3 => 1320:1980  3:2 => 1980:1320
      ref.current?.getScreenshot() ?? undefined;
    if (screenshot) {
      downloadBase64File(screenshot, "hoge");
    }
  }, [ref]);

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
