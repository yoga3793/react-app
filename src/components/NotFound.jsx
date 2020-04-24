import React, { Component } from 'react'
import {Link  } from "react-router-dom";

export class NotFound extends Component {
    render() {
        return (
           
          <Link  to="/">
                <img className="pageNotFound" src="../404-error-page-templates.jpg"/>
          </Link>

               
        )
    }
}

export default NotFound
