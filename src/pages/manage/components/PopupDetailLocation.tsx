import MyDialog from '@/components/common/Dialog';
import { LocationTypo } from '@/components/common/LocationTypo';
import { ILocation } from '@/types/admin';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper React components

// Import Swiper styles
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface IPopupDetailLocationProps {
    isOpen: boolean;
    onClose: () => void;
    location: ILocation;
}

function PopupDetailLocation(props: IPopupDetailLocationProps) {

    const { location, onClose, isOpen } = props;

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const [image, setImage] = useState("")

    useEffect(() => {
        setImage(location?.imageUrlLocations?.[0])
    }, [location?.imageUrlLocations])

    return (
        <MyDialog open={isOpen} title='Location Information' isShowAction={false} onClose={onClose} doAction={() => { }}>
            <div className='min-w-[36rem]'>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex flex-col gap-y-2'>
                        <span className='font-bold'>Location Name </span>
                        <span>{location?.name}</span>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <span className='font-bold'>Description </span>
                        <span>{location?.description}</span>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <span className='font-bold'>Address </span>
                        <LocationTypo
                            country={location?.address?.country?.name}
                            province={location?.address?.province?.name}
                            district={location?.address?.district?.name}
                            ward={location?.address?.ward?.name}
                            streetAddress={location?.address?.streetAddress}
                        />
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <span className='font-bold'>Rating: </span>
                        <span className='font-bold'>{location?.rating}</span>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <span className='font-bold'>Review Count</span>
                        <span className='font-bold'>{location?.reviewCount}</span>
                    </div>
                    {location?.hotel && location?.hotel?.propertyAmenities && <div className='flex flex-col gap-y-2'>
                        <span className='font-bold'>Property Amenities</span>
                        <div className='grid grid-cols-2'>
                            {location?.hotel?.propertyAmenities?.map((pro, index) =>
                                <div className='flex items-center gap-2' key={index}>
                                    <img src={pro.icon} alt='icon' className='w-5 h-5h' />
                                    <span>{pro.name}</span>
                                </div>
                            )}
                        </div>
                    </div>}

                    <div>
                        <span className="font-bold">Images:</span>
                        {image && <img src={image} alt='image' className='w-full h-[300px]' />}
                    </div>

                    <div className="relative">
                        <Swiper
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper mt-4 rounded-md h-[50px]"
                        >
                            {location?.imageUrlLocations && location?.imageUrlLocations?.map((url, index: number) =>
                                <SwiperSlide key={index}>
                                    <img src={url} className="rounded-md w-full h-full object-cover cursor-pointer" onClick={() => setImage(url)} />
                                </SwiperSlide>
                            )}
                        </Swiper>
                        <div ref={navigationPrevRef}
                            className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -left-4 w-7 h-7 flex items-center 
                justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                            {`<`}
                        </div>
                        <div ref={navigationNextRef}
                            className="cursor-pointer z-50 absolute top-1/2 -translate-y-1/2 -right-4 w-7 h-7 flex items-center
                  justify-center bg-black rounded-[50%] hover:bg-white group transition-all">
                            {`>`}
                        </div>
                    </div>
                </div>
            </div>
        </MyDialog>
    )
}

export default PopupDetailLocation