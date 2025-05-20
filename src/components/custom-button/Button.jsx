import React from 'react';

function Button({
    childern,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props

}){
    return (
        <button type={type} className={`px-5 py-2 ${className} ${bgColor} ${textColor}`} {...props} >
            {childern}
        </button>
    )
}

export default Button;