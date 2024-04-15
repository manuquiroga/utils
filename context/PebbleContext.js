import { createContext, useContext, useState } from "react";

const PebbleContext = createContext();

const initialPosition = {
  picker: {
    x: 180,
    y: 80,
  },
};

const PebbleProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [flag, setFlag] = useState(false);
  const [pickerPos, setPickerPosition] = useState(initialPosition);

  const [color, setColor] = useState({
    picker: "",
  });
  const [extractedColors, setExtractedColors] = useState({
    color: "",
  });
  const [showPicker, setShowPicker] = useState(false);

  return (
    <PebbleContext.Provider
      value={{
        uploadedImages,
        setUploadedImages,
        imageUrl,
        setImageUrl,
        flag,
        setFlag,
        pickerPos,
        setPickerPosition,
        color,
        setColor,
        extractedColors,
        setExtractedColors,
        showPicker,
        setShowPicker,
      }}
    >
      {children}
    </PebbleContext.Provider>
  );
};

const usePebble = () => useContext(PebbleContext);

export { PebbleProvider, usePebble };
