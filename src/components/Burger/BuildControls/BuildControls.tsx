import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import { DisabledInfoType } from '../../../containers/BurgerBuilder/BurgerBuilder';
import classes from './BuildControls.module.css';

interface BuildControlsProps {
    ingredientAdded(topping: string): void;
    ingredientRemoved(topping: string): void;
    disabledInfo: DisabledInfoType;
    price: number;
    purchasable: boolean;
    purchaseHandler(): void;
};

const controls = [
    { label: 'Salad', topping: 'salad' },
    { label: 'Bacon', topping: 'bacon' },
    { label: 'Cheese', topping: 'cheese' },
    { label: 'Meat', topping: 'meat' },
];

const buildControls = (props: BuildControlsProps) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.topping)}
                removed={() => props.ingredientRemoved(ctrl.topping)}
                disabled={props.disabledInfo[ctrl.topping]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchaseHandler}>ORDER NOW</button>
    </div>
);

export default buildControls;