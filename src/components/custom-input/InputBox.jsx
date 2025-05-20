import React, { useId} from 'react';

const InputBox = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} clasName='inline-block mb-1 pl-1'>
                {label}
            </label>}
            <input 
                type={type} 
                className= {`rounded-lg mx-4 my-2 bg-white
                    text-black focus:bg-gray-50 outline-none 
                    duration-200 border border-gray-200  
                    w-full ${className}`} 
                ref={ref} 
                {...props} 
                id={id}
            />
        </div>
    )
})

export default InputBox;