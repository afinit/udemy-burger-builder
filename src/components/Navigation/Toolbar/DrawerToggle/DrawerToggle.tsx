import React from 'react';

import classes from './DrawerToggle.module.css';

interface DrawerToggleProps {
    toggleHandler(): void;
};

const drawerToggle = (props: DrawerToggleProps) => {
    return (
        <div className={classes.DrawerToggle}
            onClick={props.toggleHandler}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default drawerToggle;