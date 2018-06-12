import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, CardImgOverlay } from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
                selectedDish: null
        }

        console.log("this Menu:", this);
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish});
    }

    renderDish(dish) {
        console.log("renderDish:", dish);
        if (dish != null)
         return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
         );
         else return (<div></div>);
    }

    render() {
        console.log("render:", this);
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1">
                <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.state.selectedDish)}
                </div>
                </div>
            </div>
        );
    }
}

export default Menu;