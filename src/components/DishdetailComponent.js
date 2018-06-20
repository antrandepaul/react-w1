import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
class CommentRow extends Component {
  render() {
    const comment = this.props.comment;
    return (
      <div><span style={{color:'blue'}}> {comment.comment}</span>, <span>{comment.author}</span>, 
      <span>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</span></div>
    ) 
  }
}

class DishDetail extends Component {

  render() {
    const dish = this.props.dish;
    console.log("renderDish:", dish);
    
    if (dish != null){
      const rows = [];
      dish.comments.forEach((comment) => {
        rows.push(<CommentRow key={comment.id} comment={comment} />);
      });

    return (
      <div className="row">
      <div  className="col-12 col-md-5 m-1">
      
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
            <CardText><h1>Comments</h1>
              {rows}
            </CardText>
            
            </CardBody>
        </Card>
        </div>
      </div>
    );
  }
    else return (<div></div>);
  }
}
export default DishDetail;