import React from 'react';

const Title = (props) => {
    return ( 
    <h2 className="text-center mt-3 mb-5">
        {props.name} {props.title}
    </h2>
    );
}
 
export default Title;