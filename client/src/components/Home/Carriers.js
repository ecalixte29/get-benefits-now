import React from 'react'

const carriers = [
    { src: require('../../assets/images/carrier_1.png'), alt: 'carrier one' },
    { src: require('../../assets/images/carrier_2.png'), alt: 'carrier two' },
    { src: require('../../assets/images/carrier_3.png'), alt: 'carrier three' },
    { src: require('../../assets/images/carrier_4.webp'), alt: 'carrier four' },
    { src: require('../../assets/images/carrier_5.webp'), alt: 'carrier five' },
    { src: require('../../assets/images/carrier_6.webp'), alt: 'carrier six' },
    {
        src: require('../../assets/images/carrier_7.webp'),
        alt: 'carrier seven',
    },
]

const Carriers = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 px-6 py-10 text-center sm:px-10">
            <h1 className="py-6 text-2xl font-semibold text-gray-900 sm:text-5xl">
                Carriers We Represent
            </h1>
            <div className="grid grid-cols-2 gap-6 py-6 sm:gap-10 md:grid-cols-7">
                {carriers.map((carrier, index) => (
                    <StyledImage
                        key={index}
                        src={carrier.src}
                        alt={carrier.alt}
                    />
                ))}
            </div>
            <h3 className="py-6 text-xl font-semibold text-gray-900">
                ...And Many More!
            </h3>
        </div>
    )
}

const StyledImage = ({ src, alt }) => (
    <div className="flex h-16 w-auto max-w-36 items-center justify-center bg-white px-4 py-4 sm:h-44 sm:px-5 sm:py-10">
        <img src={src} alt={alt} />
    </div>
)

export default Carriers
