import { useState, useRef } from "react";
import { Plus } from "lucide-react";

const ImageUploader = ({ onImageUpload }: { onImageUpload: (image: string) => void }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer?.files?.[0];

    if (file && isImage(file)) {
      handleFile(file);
    }
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isImage(file)) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      setImage(e.target.result as string);
      onImageUpload(e.target.result as string);
    };

    reader.readAsDataURL(file);
  };

  const isImage = (file: File) => {
    return file.type.startsWith("image");
  };

  return (
    <>
      {image ? null : (
        <div
          className="rounded-md p-4 text-center py-24 cursor-pointer w-full h-full"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelection} style={{ display: "none" }} />
          <Plus className="mx-auto text-primary bg-primary/10 rounded-full p-4" size={92} />
          <p className="font-semibold mt-4 ">Click or drop an image here</p>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
