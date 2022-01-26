import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import Divider from "../Divider/Divider";
import Button from "../../FormElements/Button/Button";
import "./ImageUploader.css";

const DEFAULT_VALUES = {
  texts: {
    file_button: "Select images",
    empty_files: "No images were selected.",
    divider_new_images: "New images",
    divider_current_images: "Current images",
  },
};

const ImageUploader = ({ currentImages, setCurrentImages, ...props }) => {
  const imagesInputRef = useRef();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { texts = DEFAULT_VALUES.texts, setImagesForm = () => {} } = props;

  useEffect(() => {
    if (!images) {
      return;
    }

    const imagesPreviewsNew = [];
    for (let i = 0; i < images.length; i++) {
      imagesPreviewsNew.push(URL.createObjectURL(images[i]));
    }
    setImagesPreview(imagesPreviewsNew);
    setImagesForm(images);
  }, [images, setImagesForm]);

  const selectImagesHandler = () => {
    imagesInputRef.current.click();
  };

  const onFileInputChangeHandler = event => {
    let imagesSelected;

    if (event.target.files && event.target.files.length > 0) {
      imagesSelected = event.target.files;
      setImages(imagesSelected);
    }

    setImagesForm(imagesSelected);
  };

  const deleteImageHandler = indexToDelete => {
    const imagesArray = [...images];
    imagesArray.splice(indexToDelete, 1);
    setImages(imagesArray);
  };

  const deleteCurrentImagesHandler = indexToDelete => {
    const imagesCurrentArray = [...currentImages];
    imagesCurrentArray.splice(indexToDelete, 1);
    setCurrentImages(imagesCurrentArray);
  };

  return (
    <div className="image-uploader">
      <Card>
        <header className="image-uploader__header">
          <input
            ref={imagesInputRef}
            className="image-uploader__file-input"
            type="file"
            accept=".jpg,.png,.jpeg"
            multiple
            onChange={onFileInputChangeHandler}
            id={props.id}
          ></input>
          <Button
            shape="round"
            type="primary"
            htmlType="button"
            block
            text={texts.file_button}
            onClick={selectImagesHandler}
          />
        </header>
        {currentImages.length > 0 && (
          <>
            <Divider text={texts.divider_current_images} />
            <div className="image-uploader__main">
              <div className="main__images-previews">
                {currentImages.map((imagePreview, index) => (
                  <div key={index} className="images-previews__image-container">
                    <span
                      onClick={deleteCurrentImagesHandler.bind(this, index)}
                      className="image-container__delete-icon"
                    >
                      <IoMdCloseCircle />
                    </span>
                    <img
                      className="image-container__image"
                      alt=""
                      src={imagePreview.original.url}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <Divider text={texts.divider_new_images} />
        <div className="image-uploader__main">
          {imagesPreview.length === 0 && (
            <div className="main__empty-images">
              <p className="empty-images__message">{texts.empty_files}</p>
            </div>
          )}
          {imagesPreview.length > 0 && (
            <div className="main__images-previews">
              {imagesPreview.map((imagePreview, index) => (
                <div key={index} className="images-previews__image-container">
                  <span
                    onClick={deleteImageHandler.bind(this, index)}
                    className="image-container__delete-icon"
                  >
                    <IoMdCloseCircle />
                  </span>
                  <img
                    className="image-container__image"
                    alt=""
                    src={imagePreview}
                  ></img>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageUploader;
