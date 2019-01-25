import React from 'react';

import classes from './Button.module.css';

interface ButtonProps {
    onClick(): void;
    btnType: string;
    children?: React.ReactNode;
};

const button = (props: ButtonProps) => {
    return (
        <button className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default button;