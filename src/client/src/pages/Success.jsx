import { connect } from 'react-redux';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class Success extends Component {
  render() {
    if(!this.props.otp.isVerified) return <Redirect to="/" />
    return (
        <div className="paper mt validation">
            <h1 className="display-4">Validation Success</h1>
        </div>
    )
  }
}

const mapStateToProps = state => ({ 
  otp: state.otp,
}) 
 
export default connect(mapStateToProps, null)(Success); 