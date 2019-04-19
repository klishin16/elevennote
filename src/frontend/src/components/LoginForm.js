import React from 'react';
import PropTypes from 'prop-types';

import "./css/LoginForm.css"

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div className='row justify-content-md-center'>
        <div className="col-3">
        <p className="h3">Please Log In</p>
        <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
           <span className="input-group-text" id="basic-addon3">Email</span>
          </div>
          <input 
            type="text" 
            name="email"
            value={this.state.email}
            onChange={this.handle_change}

            className="form-control"  
            aria-describedby="basic-addon3/">
            </input>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
           <span className="input-group-text" id="basic-addon2">Password</span>
          </div>
          <input 
            type="password"
            name="password" 
            value={this.state.password}
            onChange={this.handle_change}

            className="form-control"  
            aria-describedby="basic-addon2/">
            </input>
        </div>
        <input className="btn btn-outline-success" type="submit" />
      </form>
        </div>
      </div>
      
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};