import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import { MozUserModifyProperty } from 'csstype';

interface ModalProps {
    show: boolean;
    closeModal(): void;
    children?: React.ReactNode;
};

class Modal extends React.Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps: ModalProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    // componentWillUpdate() {
        // console.log("[Modal] componentWillUpdate")
    // }

    render() {
        return (
            <>
                <Backdrop
                    onClick={this.props.closeModal}
                    show={this.props.show} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? 1 : 0,
                    }}>
                    {this.props.children}
                </div>
            </>
        );

    }
}

export default Modal;