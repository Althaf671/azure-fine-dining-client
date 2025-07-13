// gallery gird component
"use cient";

import Image from "next/image";

export default function GalleryGrid() {
    return (
        <>
            <main className="gallery__grid__container">

                {/* upper gallery */}
                <div className="upper__gallery__wrapper">

                    {/* left part */}
                    <div className="left__part">
                        <Image
                            src="/main/idk.webp"
                            fill
                            className="left__part__image"
                            alt="I dont know what is this"
                        />
                    </div>

                    {/* right part */}
                    <div className="right__part">

                        {/* upper right part */}
                        <div className="upper__right__part">
                            <Image
                                src="/main/restaurant.webp"
                                fill
                                className="upper__right__part__image"
                                alt="I dont know what is this"
                            />
                        </div>

                        {/* lower right part */}
                        <div className="lower__right__part">
                            <Image
                                src="/main/pasta.webp"
                                width={500}
                                height={500}
                                className="lower__left__part__image"
                                alt="I dont know what is this"
                            />
                            <Image
                                src="/main/rendang.webp"
                                width={500}
                                height={500}                               
                                className="lower__right__part__image"
                                alt="I dont know what is this"
                            />
                        </div>

                    </div>
                </div>

                {/* lower gallery */}
                <div className="lower__gallery__wrapper">
                    <Image
                        src="/main/inside.webp"
                        width={500}
                        height={500}
                        className="gallery__left__part__image"
                        alt="I dont know what is this"
                    /> 
                    <Image
                        src="/main/burger.webp"
                        width={500}
                        height={500}
                        className="gallery__right__part__image"
                        alt="I dont know what is this"
                    />      
                </div>   

            </main>
        </>
    )
}