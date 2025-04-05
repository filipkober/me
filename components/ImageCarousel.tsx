import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ImageType } from "@/types/Image";

type ImageCarouselProps = {
    images: ImageType[];
    className?: string;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
    return (
        <Carousel opts={{ loop: true }} className={className}>
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index} className="max-h-[300px] overflow-hidden relative">
                        <Dialog>
                            <DialogTrigger><div className="absolute inset-0 cursor-pointer bg-fade-shadow opacity-75 hidden lg:block" ><span className="opacity-100 text-white bottom-0 absolute w-full left-0 font-bold p-2">click to expand</span></div></DialogTrigger>
                            <DialogContent className="max-w-fit hidden lg:block">
                                <DialogHeader className="font-bold">{image.alt}</DialogHeader>
                                <DialogTitle hidden>{image.alt}</DialogTitle>
                                <DialogDescription>
                                    <Image
                                        src={image.src}
                                        width={image.width}
                                        height={image.height}
                                        alt={image.alt}
                                    />
                                </DialogDescription>
                            </DialogContent>
                        </Dialog>
                        <Image
                            src={image.src}
                            width={image.width}
                            height={image.height}
                            alt={image.alt}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
        </Carousel>
    );
};

export default ImageCarousel;