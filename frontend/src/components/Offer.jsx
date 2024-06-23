import React from 'react';
import Sale from "../Utils/Sale.jpg";

const Offer = () => {
    return (
        <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <img 
                        src={Sale} 
                        alt="Sale" 
                        className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-lg rounded-xl object-cover transition-transform duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
                    />
                    <div className="flex flex-col justify-center gap-6 sm:pt-0">
                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Summer Sale Up to 50% Off</h1>
                        <p className="text-lg text-gray-200 tracking-wide leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio.</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-600 transition-transform duration-500 hover:scale-110" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" strokeWidth="2" d="M7,11 L7,6 C7,3 9,1 12,1 C15,1 17,3 17,6 L17,11 M12,23 C15.8659932,23 19,19.8659932 19,16 C19,12.1340068 15.8659932,9 12,9 C8.13400675,9 5,12.1340068 5,16 C5,19.8659932 8.13400675,23 12,23 Z M12,15 L12,19 M12,16 C12.5522847,16 13,15.5522847 13,15 C13,14.4477153 12.5522847,14 12,14 C11.4477153,14 11,14.4477153 11,15 C11,15.5522847 11.4477153,16 12,16 Z"></path>
                                </svg>
                                <p className="text-xl">Quality Products</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-600 transition-transform duration-500 hover:scale-110" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M368 128h.09m111.46-32h-91.06l8.92-35.66 38.32-13.05c8.15-2.77 13-11.43 10.65-19.71a16 16 0 00-20.54-10.73l-47 16a16 16 0 00-10.36 11.27L355.51 96H224.45c-8.61 0-16 6.62-16.43 15.23A16 16 0 00224 128h2.75l1 8.66A8.3 8.3 0 00236 144c39 0 73.66 10.9 100.12 31.52A121.9 121.9 0 01371 218.07a123.4 123.4 0 0110.12 29.51 7.83 7.83 0 003.29 4.88 72 72 0 0126.38 86.43 7.92 7.92 0 00-.15 5.53A96 96 0 01416 376c0 22.34-7.6 43.63-21.4 59.95a80.12 80.12 0 01-28.78 21.67 8 8 0 00-4.21 4.37 108.19 108.19 0 01-17.37 29.86 2.5 2.5 0 001.9 4.11h49.21a48.22 48.22 0 0047.85-44.14L477.4 128h2.6a16 16 0 0016-16.77c-.42-8.61-7.84-15.23-16.45-15.23z"></path>
                                    <path d="M108.69 320a23.87 23.87 0 0117 7l15.51 15.51a4 4 0 005.66 0L162.34 327a23.87 23.87 0 0117-7h196.58a8 8 0 008.08-7.92V312a40.07 40.07 0 00-32-39.2c-.82-29.69-13-54.54-35.51-72C295.67 184.56 267.85 176 236 176h-72c-68.22 0-114.43 38.77-116 96.8A40.07 40.07 0 0016 312a8 8 0 008 8zm77.25 32a8 8 0 00-5.66 2.34l-22.14 22.15a20 20 0 01-28.28 0l-22.14-22.15a8 8 0 00-5.66-2.34h-69.4a15.93 15.93 0 00-15.76 13.17A65.22 65.22 0 0016 376c0 30.59 21.13 55.51 47.26 56 2.43 15.12 8.31 28.78 17.16 39.47C93.51 487.28 112.54 496 134 496h132c21.46 0 40.49-8.72 53.58-24.55 8.85-10.69 14.73-24.35 17.16-39.47 26.13-.47 47.26-25.39 47.26-56a65.22 65.22 0 00-.9-10.83A15.93 15.93 0 00367.34 352z"></path>
                                </svg>
                                <p className="text-xl">Fast Delivery</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-600 transition-transform duration-500 hover:scale-110" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M267.2 25.08l-70 70.16c-7.7 7.66-7.3 16.86-2.4 26.96l2 4.3-3.1 2.9-23.6 22.3 21.7 21.6 22.2-23.7 2.9-3 4.2 1.9c10.7 5.3 20.6 5.7 27.7-1.4L319 76.85l-10.2-10.18-45.7 45.63-9.6-9.8L299 56.97l-10.9-11.03-45.5 45.7-9.7-9.7 45.5-45.69zM28.97 27.84c-5.73 9.12-6.61 20.83-3.32 34.58 3.87 16.32 13.68 35.22 27.41 53.08 27.35 35.8 50.04 48.1 86.84 54.8l2.4.4c13.6 16.1 27.2 32.1 40.8 48.2h37.1zM137 183.2l-37.74 35.7h49.64l9.7-10.3zM26.25 232.9v63.5l16.51-49.5H279.8l16.5 49.5v-63.5zm29.49 32l-10 30h45.04l10.02-30zm63.96 0l-10 30h42.6v-30zm50.6 0v30h42.6l-10-30zm51.4 0l10 30h45.1l-10-30zm92.6 1.8v188.2h79c4.2-18.2 20.6-32 40-32s35.8 13.8 40 32h15v-64l-56.2-14H328.3v-82H390l-6.9-15zM26.25 312.9v114.2l42.17 27.8h14.85c4.14-18.2 20.53-32 40.03-32 19.4 0 35.8 13.8 40 32h133v-142h-14v80H40.25v-80zm320.05 0v46h72.4l-23-46zm-281.05 19l16 16h16l16.05-16zm-8 27v18H265.3v-18zm66.05 82c-12.9 0-23.1 10.2-23.1 23s10.2 23 23.1 23c12.8 0 23-10.2 23-23s-10.2-23-23-23zm310 0c-12.8 0-23 10.2-23 23s10.2 23 23 23 23-10.2 23-23-10.2-23-23-23z"></path>
                                </svg>
                                <p className="text-xl">Easy Payment Method</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-600 transition-transform duration-500 hover:scale-110" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M267.2 25.08l-70 70.16c-7.7 7.66-7.3 16.86-2.4 26.96l2 4.3-3.1 2.9-23.6 22.3 21.7 21.6 22.2-23.7 2.9-3 4.2 1.9c10.7 5.3 20.6 5.7 27.7-1.4L319 76.85l-10.2-10.18-45.7 45.63-9.6-9.8L299 56.97l-10.9-11.03-45.5 45.7-9.7-9.7 45.5-45.69zM28.97 27.84c-5.73 9.12-6.61 20.83-3.32 34.58 3.87 16.32 13.68 35.22 27.41 53.08 27.35 35.8 50.04 48.1 86.84 54.8l2.4.4c13.6 16.1 27.2 32.1 40.8 48.2h37.1zM137 183.2l-37.74 35.7h49.64l9.7-10.3zM26.25 232.9v63.5l16.51-49.5H279.8l16.5 49.5v-63.5zm29.49 32l-10 30h45.04l10.02-30zm63.96 0l-10 30h42.6v-30zm50.6 0v30h42.6l-10-30zm51.4 0l10 30h45.1l-10-30zm92.6 1.8v188.2h79c4.2-18.2 20.6-32 40-32s35.8 13.8 40 32h15v-64l-56.2-14H328.3v-82H390l-6.9-15zM26.25 312.9v114.2l42.17 27.8h14.85c4.14-18.2 20.53-32 40.03-32 19.4 0 35.8 13.8 40 32h133v-142h-14v80H40.25v-80zm320.05 0v46h72.4l-23-46zm-281.05 19l16 16h16l16.05-16zm-8 27v18H265.3v-18zm66.05 82c-12.9 0-23.1 10.2-23.1 23s10.2 23 23.1 23c12.8 0 23-10.2 23-23s-10.2-23-23-23zm310 0c-12.8 0-23 10.2-23 23s10.2 23 23 23 23-10.2 23-23-10.2-23-23-23z"></path>
                                </svg>
                                <p className="text-xl">Get Offers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offer;
