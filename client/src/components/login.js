import React, { Component } from 'react';
import $ from 'jquery'
import './login.css'
class LoginPage extends Component {
  constructor(props){
    super(props)

    this.state={
      username:'',
      password:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
   this.setState({[event.target.name]: event.target.value});
 }

 handleSubmit(event) {
   console.log(this.state);
   event.preventDefault();
   var that=this;
   $.ajax({
      type: 'POST',
      url: '/users/authenticate',
      data:that.state,
      success: (res) => {
        if (res === 'OK') {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      },
      error: (err) => {
        console.log('err', err)
      }
    })
 }

  componentDidMount(){
  }
  render() {

    return (
      <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Log In</h5>
            <form className="form-signin">
              <div className="form-label-group">
                <input name='username' type="username" id="inputEmail" className="form-control" onChange={this.handleChange} placeholder="Username address" required autoFocus ></input>
                <label htmlFor="inputEmail">Username</label>
              </div>

              <div className="form-label-group">
                <input name='password' type="password" id="inputPassword" className="form-control" onChange={this.handleChange} placeholder="Password" required ></input>
                <label htmlFor="inputPassword">Password</label>
              </div>


              <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.handleSubmit} type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default LoginPage;
