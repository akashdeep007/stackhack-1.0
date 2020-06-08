import React from 'react';


const RegTypeBlock = (props) => {
    return(
        <div className="reg-type-block">
            <strong>{props.count}</strong>
            <h2>{props.title}</h2>
        </div>
    );
}

export default RegTypeBlock;