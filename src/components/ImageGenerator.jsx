import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { api } from "../api";
import ImagesCreated from "./ImagesCreated";
import { toast } from "react-hot-toast";
const ImageGenerator = () => {
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [imagesInfo, setImagesInfo] = useState(() => {
    const storedData = localStorage.getItem("imagesAI");
    // If the data exists, parse it as a JavaScript array, else initialize as an empty array
    return storedData ? JSON.parse(storedData) : [];
  });
  // const currentImage = useStore((state) => state.currentImage);
  const [actualImage, setActualImage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loader) {
      setLoader(true);
      axios
        .post(`${api}/image`, { text: query })
        .then((res) => {
          console.log(res.data.image);
          const storageData = JSON.parse(localStorage.getItem("imagesAI"));
          if (storageData) {
            let newData = JSON.stringify([...storageData, res.data.image]);
            localStorage.setItem("imagesAI", newData);
          } else {
            let newData = JSON.stringify([res.data.image]);
            localStorage.setItem("imagesAI", newData);
          }
          setActualImage(res.data.image);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ups algo salió mal, intenta de nuevo");
        })
        .finally(() => setLoader(false));
    }
  };

  useEffect(() => {
    imagesInfo && imagesInfo.length >= 1 && setActualImage(imagesInfo[0]);
  }, []);

  return (
    <div>
      <div className="text-center text-2xl text-white font-extrabold mt-5">
        Generador de imagenes con IA
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex gap-3 m-5   justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Texto a imagen"
            className="input input-bordered input-success w-full max-w-xs"
          />
          <button
            disabled={loader || query.length === 0}
            className="btn btn-success"
          >
            <svg
              className="w-10 h-10"
              viewBox="0 0 16 16"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path
                fillRule="evenodd"
                d="M7.429 1.525a6.593 6.593 0 011.142 0c.036.003.108.036.137.146l.289 1.105c.147.56.55.967.997 1.189.174.086.341.183.501.29.417.278.97.423 1.53.27l1.102-.303c.11-.03.175.016.195.046.219.31.41.641.573.989.014.031.022.11-.059.19l-.815.806c-.411.406-.562.957-.53 1.456a4.588 4.588 0 010 .582c-.032.499.119 1.05.53 1.456l.815.806c.08.08.073.159.059.19a6.494 6.494 0 01-.573.99c-.02.029-.086.074-.195.045l-1.103-.303c-.559-.153-1.112-.008-1.529.27-.16.107-.327.204-.5.29-.449.222-.851.628-.998 1.189l-.289 1.105c-.029.11-.101.143-.137.146a6.613 6.613 0 01-1.142 0c-.036-.003-.108-.037-.137-.146l-.289-1.105c-.147-.56-.55-.967-.997-1.189a4.502 4.502 0 01-.501-.29c-.417-.278-.97-.423-1.53-.27l-1.102.303c-.11.03-.175-.016-.195-.046a6.492 6.492 0 01-.573-.989c-.014-.031-.022-.11.059-.19l.815-.806c.411-.406.562-.957.53-1.456a4.587 4.587 0 010-.582c.032-.499-.119-1.05-.53-1.456l-.815-.806c-.08-.08-.073-.159-.059-.19a6.44 6.44 0 01.573-.99c.02-.029.086-.075.195-.045l1.103.303c.559.153 1.112.008 1.529-.27.16-.107.327-.204.5-.29.449-.222.851-.628.998-1.189l.289-1.105c.029-.11.101-.143.137-.146zM8 0c-.236 0-.47.01-.701.03-.743.065-1.29.615-1.458 1.261l-.29 1.106c-.017.066-.078.158-.211.224a5.994 5.994 0 00-.668.386c-.123.082-.233.09-.3.071L3.27 2.776c-.644-.177-1.392.02-1.82.63a7.977 7.977 0 00-.704 1.217c-.315.675-.111 1.422.363 1.891l.815.806c.05.048.098.147.088.294a6.084 6.084 0 000 .772c.01.147-.038.246-.088.294l-.815.806c-.474.469-.678 1.216-.363 1.891.2.428.436.835.704 1.218.428.609 1.176.806 1.82.63l1.103-.303c.066-.019.176-.011.299.071.213.143.436.272.668.386.133.066.194.158.212.224l.289 1.106c.169.646.715 1.196 1.458 1.26a8.094 8.094 0 001.402 0c.743-.064 1.29-.614 1.458-1.26l.29-1.106c.017-.066.078-.158.211-.224a5.98 5.98 0 00.668-.386c.123-.082.233-.09.3-.071l1.102.302c.644.177 1.392-.02 1.82-.63.268-.382.505-.789.704-1.217.315-.675.111-1.422-.364-1.891l-.814-.806c-.05-.048-.098-.147-.088-.294a6.1 6.1 0 000-.772c-.01-.147.039-.246.088-.294l.814-.806c.475-.469.679-1.216.364-1.891a7.992 7.992 0 00-.704-1.218c-.428-.609-1.176-.806-1.82-.63l-1.103.303c-.066.019-.176.011-.299-.071a5.991 5.991 0 00-.668-.386c-.133-.066-.194-.158-.212-.224L10.16 1.29C9.99.645 9.444.095 8.701.031A8.094 8.094 0 008 0zm1.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM11 8a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </form>
      {!loader && actualImage.length !== 0 && (
        <div>
          <div className="max-w-lg mx-auto">
            <img
              className="rounded-2xl w-full mx-auto "
              src={actualImage}
              alt=""
            />
          </div>
          <ImagesCreated changeImage={setActualImage} />
          {/* <a href={actualImage} download>
            <div className="text-center">
              <button className="text-center mt-5 btn btn-secondary">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                >
                  <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z" />
                </svg>
              </button>
            </div>
          </a> */}
          {/* <a href="whatsapp://send?text=Check%20out%20this%20image%20I%20want%20to%20share%3A%20{imageURL}">
            <div>jaja</div>
          </a> */}
        </div>
      )}
      {loader && <Loader />}
    </div>
  );
};

export default ImageGenerator;
