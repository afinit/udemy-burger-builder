import React from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

export interface IngredientsType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
};

interface IngredientsCostType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
};

export interface DisabledInfoType {
  salad: boolean;
  bacon: boolean;
  cheese: boolean;
  meat: boolean;
  [key: string]: boolean;
};

const DISABLED_INFO_DEFAULTS: DisabledInfoType = {
  salad: true,
  bacon: true,
  cheese: true,
  meat: true,
}

interface BurgerBuilderProps {
};

interface BurgerBuilderState {
  ingredients: IngredientsType;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error?: string;
};

const INGREDIENT_PRICES: IngredientsCostType = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends React.Component {
  constructor(props: BurgerBuilderProps) {
    super(props);
  }

  state: BurgerBuilderState = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: undefined,
  }

  checkPurchasable = (ingredients: IngredientsType) => {
    const count = Object.keys(ingredients).reduce((sum, key) => sum + ingredients[key], 0);
    return count > 0;
  }

  addIngredientHandler = (topping: string) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[topping]++;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[topping];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
      purchasable: this.checkPurchasable(updatedIngredients)
    })
  }

  removeIngredientHandler = (topping: string) => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldCount = updatedIngredients[topping];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldCount === 0 ? oldPrice : oldPrice - INGREDIENT_PRICES[topping];
    updatedIngredients[topping] = oldCount === 0 ? 0 : oldCount - 1;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
      purchasable: this.checkPurchasable(updatedIngredients)
    })
  }

  purchaseHandler = () => this.setState({ purchasing: true })
  purchaseCancelHandler = () => this.setState({ purchasing: false })
  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "temp name",
        address: {
          street: "some street",
          zipcode: "21312",
          country: "cascadia",
        },
        email: "emailme@omg.com",
      },
      deliveryMethod: "fastest",
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false, purchasing: false })
      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false, purchasing: false })
      });
  }

  errorClicked = () => this.setState({ error: undefined })
  componentDidMount() {
    axios.interceptors.response.use(
      res => res,
      error => this.setState({ error: error.message }));

    axios.get("https://react-bob-burger.firebaseio.com/ingredients.json")
      .then(response => {
        const ingredients = response.data;
        this.setState({
          ingredients: ingredients,
          purchasable: this.checkPurchasable(ingredients)
        })
      });
  }

  render() {
    const disabledInfo: DisabledInfoType = { ...DISABLED_INFO_DEFAULTS }
    Object.keys(this.state.ingredients).map((key) => {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
    });

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelHandler={this.purchaseCancelHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
        total={this.state.totalPrice} />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />

    };

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <Modal
          show={typeof (this.state.error) !== 'undefined'}
          closeModal={this.errorClicked}>
          {this.state.error}
        </Modal>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;