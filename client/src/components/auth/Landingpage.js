import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

import Popin from '../Popin.js';

export default (props) => {
  return (
   <>
      {props.user._id ? (
        <Redirect to="/homepage" />
      ) : (
        /* <Popin one={(*/
          <>
           <img src ='/client/public/images/always forward.png'></img>


            <h1>LOTX</h1>
            <p><span role="img">🏴</span> Unofficial LOT2046 place for community and black market <span role="img">🏴</span></p>

            <div className="cta">
              <Link className="btn" to="/login">Log in  </Link>
              <p>

              </p>
              <Link className="btn" to="/signup">Sign up</Link>
            </div>
          </>
       /* )} /> */
      )}
    </>
  );
}