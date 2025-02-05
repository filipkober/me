import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "@/styles/ImageUpload.css";

registerPlugin(FilePondPluginImagePreview);

interface ImageUploadProps {
    className?: string;
    fileChanged?: (file: Blob) => void;
    image?: Blob;
}

export default function ImageUpload({className, fileChanged, image}:ImageUploadProps) {
  return <div className={className} >
    <FilePond acceptedFileTypes={["image/*"]} onaddfile={(error, file) => {
        if (error) {
            console.error(error);
        } else if(fileChanged) {
            fileChanged(file.file);
        }
    }} 
    files={image ? [image] : undefined}
    />
  </div>
}
