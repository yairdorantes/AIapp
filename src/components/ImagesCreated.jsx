import { useEffect, useState } from "react";

const ImagesCreated = ({ changeImage }) => {
  const [imageSelected, setImageSelected] = useState(0);
  const [imagesInfo, setImagesInfo] = useState(() => {
    const storedData = localStorage.getItem("imagesAI");
    // If the data exists, parse it as a JavaScript array, else initialize as an empty array
    return storedData ? JSON.parse(storedData) : [];
  });
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("imagesAI"));
    setImagesInfo(storedData);
  }, [changeImage]);

  const handleClickImage = (imageUrl, key) => {
    setImageSelected(key);
    changeImage(imageUrl);
  };
  useEffect(() => {
    setImageSelected(0);
  }, []);

  return (
    <div>
      {imagesInfo && imagesInfo.length > 0 && (
        <div className="m-3 text-center">
          <div className="badge badge-warning  ">Imagenes Generadas</div>
        </div>
      )}
      <div className="flex gap-4 max-w-lg flex-wrap justify-center max-h-36  mx-auto overflow-y-auto">
        {imagesInfo &&
          imagesInfo.map((image, i) => (
            <div key={i}>
              <img
                src={image}
                onClick={() => handleClickImage(image, i)}
                className={`w-32 rounded-md cursor-pointer ${
                  imageSelected === i ? "opacity-100" : "opacity-40"
                } `}
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImagesCreated;
