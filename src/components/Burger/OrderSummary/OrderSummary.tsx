import React from 'react';

import { IngredientsType } from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';

interface OrderSummaryProps {
    ingredients: IngredientsType;
    purchaseCancelHandler(): void;
    purchaseContinueHandler(): void;
    total: number;
};

const orderSummary = (props: OrderSummaryProps) => {
    const summaryList = Object.keys(props.ingredients)
        .map((key) => 
            <li key={key}>
                <span style={{textTransform: "capitalize"}}>{key}:</span> 
                {props.ingredients[key]}</li>
        );

    return (
        <>
            <p>Order Summary:</p>
            <ul>
                {summaryList}
            </ul>
            <p><strong>Order Total Price: {props.total.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button 
                onClick={props.purchaseCancelHandler}
                btnType="Danger">CANCEL</Button>
            <Button 
                onClick={props.purchaseContinueHandler} 
                btnType="Success">PURCHASE</Button>
        </>
    );
};

export default orderSummary;