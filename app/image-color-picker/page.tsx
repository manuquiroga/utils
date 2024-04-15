"use client";
import ImageUploader from "@/components/ImageUploader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEyeDropper from "use-eye-dropper";
import { hexToRGB } from "@/lib/utils";

const ImageColorPicker = () => {
  const [color, setColor] = useState<string>("#fff");
  const [image, setImage] = useState<string | null>(null);
  const { open, close, isSupported } = useEyeDropper();
  const [error, setError] = useState();

  const pickColor = useCallback(() => {
    const openPicker = async () => {
      try {
        const color = await open();
        setColor(color.sRGBHex);
      } catch (e) {
        console.log(e);
        // Ensures component is still mounted
        // before calling setState
        //if (!e.canceled) setError(e);
      }
    };
    openPicker();
  }, [open]);

  const onCopy = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-4 ">
      <div className="flex-1 flex border border-dashed rounded-md items-center justify-center hover:border-black/50 dark:hover:border-white/25 transition duration-300 p-4">
        {image ? <img src={image} alt="Uploaded" /> : <ImageUploader onImageUpload={setImage} />}
      </div>
      <Card className="border-none shadow-none!">
        <CardHeader>
          <CardTitle>Color Picker</CardTitle>
          <CardDescription>Click on the button to pick a color from the image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="py-1 px-8 border rounded-md" style={{ background: color }}></div>
            <div className="flex items-center justify-center border rounded-md px-3 py-1 flex-grow">
              <span className="mr-2">HEX:</span>
              <span className="flex-grow">{color}</span>
              <Button variant="ghost" size="sm" onClick={() => onCopy(color)}>
                <Copy className="cursor-pointer" size={20} />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center border rounded-md px-3 py-1">
            <span className="mr-2">RGB:</span>
            <span className="flex-grow">{hexToRGB(color)}</span>
            <Button variant="ghost" size="sm" onClick={() => onCopy(hexToRGB(color))}>
              <Copy className="cursor-pointer" size={20} />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isSupported() ? (
            <Button disabled={!image} onClick={pickColor}>
              Pick Color
            </Button>
          ) : (
            <span>EyeDropper API not supported in this browser</span>
          )}
          <Button variant="outline" disabled={!image} onClick={() => setImage(null)}>
            Reset Image
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImageColorPicker;
