import React from 'react';

import classes from './Backdrop.module.css';

interface BackdropProps {
    onClick(): void;
    show: boolean;
};

const backdrop = (props: BackdropProps) => (
    props.show ? <div className={classes.Backdrop} onClick={props.onClick}></div> : null
);

export default backdrop;