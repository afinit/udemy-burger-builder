import React from 'react';
import classes from './BurgerIngredient.module.css';

interface BurgerIngredientProps {
    toppingType: string;
};

const burgerIngredient = (props: BurgerIngredientProps) => {
    let ingredient = null;

    switch (props.toppingType) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom} />;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break;
        default:
            ingredient = null;
    }
    
    return ingredient;
};

export default burgerIngredient;