import React from 'react';

import {Link, Redirect} from 'react-router-dom';

import Popin from '../Popin.js';

export default (props) => {
  return (
    <>
      {props.user._id ? (
        <Redirect to="/profile" />
      ) : (
        <Popin one={(
          <>
            <h1>LOTX</h1>
            <p><span role="img">🏴</span> Unofficial LOT2046 place for community and black market <span role="img">🏴</span></p>

            <div className="cta">
              <Link className="btn" to="/signup">Sign up</Link>
              <Link className="btn" to="/login">Log in</Link>
            </div>
          </>
        )} />
      )}
    </>
  );
}


