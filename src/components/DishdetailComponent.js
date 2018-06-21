import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

function RenderComments({comments}){
  const commentsRow = comments.map((comment) => {
    return (
      <div><span style={{color:'blue'}}> {comment.comment}</span>, <span>{comment.author}</span>, 
      <span>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'})
              .format(new Date(Date.parse(comment.date)))}</span></div>
    ); 
  });

  return (
    
    <div  className="col-12 col-md-5 m-1">
      <h1>Comments</h1>
      {commentsRow}
    </div>
  ) 
}

function RenderDish({dish}){
  return (
    <div  className="col-12 col-md-5 m-1">
    
      <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
          </CardBody>
      </Card>
      </div>
  );
}

const DishDetail = (props) => {
  if (props.dish != null){
    return (
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.dish.comments} />
      </div>
    );
  }
  else return (<div></div>);
}

export default DishDetail;