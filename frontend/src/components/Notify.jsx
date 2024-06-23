import React from 'react';
import Bg from "../Utils/orange-pattern-w2kUn2Xh.jpg"

const Notify = () => {
    return (
        <div className="my-20 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 relative overflow-hidden rounded-lg shadow-lg">
            <img src={Bg} alt="" className="bg-no-repeat bg-center bg-cover h-64 w-full opacity-60" />
            <div className="space-y-6 max-w-xl mx-auto absolute top-1/2 transform -translate-y-1/2 left-1/2 transform -translate-x-1/2 text-center">
                <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">Get Notified About New Products</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className="w-full p-3 pl-4 pr-16 rounded-lg border-2 border-transparent focus:border-indigo-500 transition duration-300 ease-in-out"
                    />
                    <button className="absolute right-0 top-0 h-full px-6 bg-indigo-500 text-white font-semibold rounded-r-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
                        Notify Me
                    </button>
                </div>
            </div>
        </div>
    );
};

//   style="background-image: url(&quot;../../Utils/orange-pattern-w2kUn2Xh.jpg&quot;); background-position: center center; background-repeat: no-repeat; background-size: cover; height: 100%; width: 100%;"

export default Notify;