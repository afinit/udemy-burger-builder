import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

interface LayoutProps {
    children?: React.ReactNode
}

interface LayoutState {
    showSideDrawer: boolean;
}

class Layout extends React.Component {
    constructor(props: LayoutProps) {
        super(props);
    }

    state: LayoutState = {
        showSideDrawer: false,
    }

    closeDrawerHandler = () => this.setState({showSideDrawer: false})
    openDrawerHandler = () => {
        this.setState((prevState: LayoutState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render () {
        return (
            <>
                <Toolbar openSideDrawerHandler={this.openDrawerHandler}/>
                <SideDrawer 
                    show={this.state.showSideDrawer}
                    closeHandler={this.closeDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;