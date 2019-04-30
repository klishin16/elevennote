import React from 'react';
import PropTypes from 'prop-types';
import "./css/Nav.css"

function Nav(props) {
  const logged_in_nav = (
    <ul id="nav-container" className="navbar-nav mr-auto">
      <li onClick={() => props.display_form('login')}><a className="nav-link" href='#'>Login</a></li>
      <li onClick={() => props.display_form('signup')}><a className="nav-link" href='#'>Signup</a></li>
    </ul>
  );

  const logged_out_nav = (
    <ul id="nav-container" className="navbar-nav mr-auto">
      <li><a className="nav-link" href='#'>{props.email}</a></li>
      <li onClick={props.handle_logout}><a className="nav-link" href='#'>Logout</a></li>
    </ul>
  );

  const main_nav = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">ElevenNote</a>
      <div className="collapse navbar-collapse" id="navbarText">

        {!props.logged_in ? logged_in_nav : logged_out_nav}

      </div>
    </nav>
  )


  //return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
  return (
    <div>{main_nav}</div>
  )
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};