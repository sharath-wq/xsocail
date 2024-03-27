import React from 'react';

const Blocked = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold mb-4'>You have been blocked</h1>
                <p className='text-gray-600'>Please contact support for further assistance.</p>
            </div>
        </div>
    );
};

export default Blocked;
