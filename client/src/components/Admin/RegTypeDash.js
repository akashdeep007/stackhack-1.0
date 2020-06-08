import React from 'react';

import RegTypeBlock from './RegTypeBlock';


const RegTypeDash = (props) => {
    return(
        <div className="reg-type-dash">
            <RegTypeBlock title="Self" count={props.regTypes.self}/>
            <RegTypeBlock title="Corporate" count={props.regTypes.coorporate}/>
            <RegTypeBlock title="Group" count={props.regTypes.group}/>
            <RegTypeBlock title="Other" count={props.regTypes.other}/>
        </div>
    );
}

export default RegTypeDash;