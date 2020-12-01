import React from 'react';

const Title = (props) => {
    return ( 
    <h2 className="text-center">
        {props.name} {props.title}
    </h2>
    );
}
 
export default Title;