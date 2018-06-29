import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Row, Label, Col, Button  } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderComments({comments}){
  const commentsRow = comments.map((comment) => {
    return (
      <div className="row-comment" key={comment.id}><span style={{color:'blue'}}> {comment.comment}</span>,&nbsp;<span>{comment.author}</span>,&nbsp;
      <span>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'})
              .format(new Date(Date.parse(comment.date)))}</span></div>
    ); 
  });

  return (
    <div>
      <h1>Comments</h1>
      {commentsRow}
    </div>
    ); 
}

function RenderDish({dish}){
  return (
      <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
          </CardBody>
      </Card>
  );
}

class RenderCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

    
  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    //alert("Current state is: " + JSON.stringify(values));
    
    this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
  }

  render(){

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
              <Label md={2}>Rating</Label>
              <Col md={10}>
                  <Control.select model=".rating" name="rating" id="rating" className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </Control.select>
              </Col>                                
            </Row>              
            <Row className="form-group">
                <Label htmlFor="name" md={4}>Your Name</Label>
                <Col md={8}>
                  <Control.text model=".name" id="name" name="name" className="form-control" 
                    validators={{required, maxLength: maxLength(15), minLength: minLength(2)}}/>
                  <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="comment" md={3}>Comment</Label> 
                <Col md={9}>
                    <Control.textarea model=".comment" id="comment" name="comment" rows="12" className="form-control"/>
                </Col>
            </Row>   
            <Button type="submit" value="submit" color="primary">Submit</Button>
          </LocalForm>           
          </ModalBody>
          </Modal>
        <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg">Submit Comment</span>
        </Button>
        </div>);
  }
}

function DishDetail(props) {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
  }
  else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
  }
  else if (props.dish != null){
      return (
        <div className="container">
          <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>
          </div>
          <div className="row">
            <div  className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div  className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments}/>
              <RenderCommentForm dishId={props.dish.id} addComment={props.addComment}/>
            </div>
          </div>
        </div>
      );
    }
    else return (<div></div>);
}
export default DishDetail;