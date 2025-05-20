import React, {useId} from 'react';

function SelectBox({
    label,
    className,
    options,
    ...props

},ref){

    const id = useId();


    return (
        <div className='w-full'>
            {
                label && 
                    <label htmlFor={id} className='inline-block mb-1 ml-1'>
                        {label}
                    </label>
            }
            <select 
                id={id} 
                className={`px-4 py-2 bg-white 
                    text-black duration-200 
                    focus:bg-gray-50 border border-gray-200 
                    rounded-lg outline-none w-full ${className}`} 
                {...props} 
                ref={ref}
            >
                { options?.length > 0 ?
                    options.map((option, index) => {
                        return <option value={option.value} key={index}>{option}</option>
                    }) : 
                    <div>No record available</div>
                }
            </select>
        </div>
    )

}

export default React.forwardRef(SelectBox);