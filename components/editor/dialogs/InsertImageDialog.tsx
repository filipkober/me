import { uploadImage } from "@/app/actions";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
    DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_IMAGE_COMMAND } from "../plugins/ImagePlugin";
// import { ImagePayload } from "../nodes/ImageNode";

// const exampleImage: ImagePayload = {
//     src: "https://images.unsplash.com/photo-1477511801984-4ad318ed9846?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "Lavender flowers",
//     width: 300,
//     height: 200
// };

export default function InsertImageDialog() {
  const [image, setImage] = useState<Blob | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [croppedDimensions, setCroppedDimensions] = useState({ width: 0, height: 0 });

  const [cropping, setCropping] = useState(false);

  const cropperRef = useRef<ReactCropperElement>(null);

  const [editor] = useLexicalComposerContext();

  const handleConfirm = async () => {
    if (!croppedImage) return;
    const imgurUrl = await uploadImage({
        image: croppedImage,
        description: "Image",
        title: "Image"
    });
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: imgurUrl,
        alt: "Image",
        width: croppedDimensions.width,
        height: croppedDimensions.height
    })
    // editor.dispatchCommand(INSERT_IMAGE_COMMAND, exampleImage);
    setImage(null);
    setCroppedImage(null);
  }

  const fileChanged = (file: Blob) => {
    setImage(file);
    setCroppedImage(file);
  }

  return (
    <DialogContent>
      <DialogTitle >Upload an image</DialogTitle>
      <DialogDescription>Upload an image to insert into the editor</DialogDescription>
        {(image && cropping) ? (
            <div className="mx-auto overflow-hidden">
          <Cropper
            src={URL.createObjectURL(image)}
            initialAspectRatio={3 / 2}
            guides={true}
            ref={cropperRef}
          />
          </div>
        ) : (
          <ImageUpload fileChanged={fileChanged} image={croppedImage ?? undefined} />
        )}
      <DialogFooter>
        <Button type="button" variant={"destructive"} onClick={() => {
            setImage(null);
            setCroppedImage(null);
        }}>
            Clear Image
        </Button>

        {image && <Button type="button" onClick={() => {
            if(cropping) {
                const cropper = cropperRef.current?.cropper;
                if (!cropper) return;
                const dimensions = cropper.getData();
                setCroppedDimensions(dimensions);
                cropper.getCroppedCanvas().toBlob((blob) => {
                    setCroppedImage(blob);
                    setCropping(false);
                }, "image/jpeg");
            } else {
                setCropping(true);
            }
        }}>
            Crop Image
        </Button>}

        <DialogClose asChild>
        <Button type="submit" onClick={handleConfirm}>
          Insert
        </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
