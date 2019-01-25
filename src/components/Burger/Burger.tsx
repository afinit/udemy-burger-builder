import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { IngredientsType } from '../../containers/BurgerBuilder/BurgerBuilder'
import classes from './Burger.module.css';

interface BurgerProps {
    ingredients: IngredientsType;
}

const burger = (props: BurgerProps) => {
    const transformedIngredients: Array<React.ReactNode> = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array<any>(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} toppingType={igKey} />;
            })
        })
        .reduce( (arr, el) => arr.concat(el) );
    const outputIngredients = (transformedIngredients.length > 0) 
        ? transformedIngredients : <p>Please add some ingredients.</p>
    return (
        <div className={classes.Burger}>
            <BurgerIngredient toppingType='bread-top' />
            {outputIngredients}
            <BurgerIngredient toppingType='bread-bottom' />
        </div>
    );
};

export default burger;