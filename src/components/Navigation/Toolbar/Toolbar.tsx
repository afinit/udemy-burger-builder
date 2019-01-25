import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from './DrawerToggle/DrawerToggle';

interface ToolbarProps {
    openSideDrawerHandler(): void;
};

const toolbar = (props: ToolbarProps) => (
    <header className={classes.Toolbar}>
        <DrawerToggle toggleHandler={props.openSideDrawerHandler} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;