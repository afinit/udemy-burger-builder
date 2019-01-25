import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

interface NavigationItemsProps {};

const navigationItems = (props: NavigationItemsProps) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" active={false}>Checkout</NavigationItem>
    </ul>
);

export default navigationItems;