import { StaticImageData } from "next/image";

export type ImageType = {
    src: StaticImageData;
    width: number;
    height: number;
    alt: string;
};