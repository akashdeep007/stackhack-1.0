import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm/LoginForm';

import * as actions from '../../store/actions/auth';
import AdminPage from './AdminPage';

class AdminLanding extends React.Component{

    render(){ 
        return(
            <div>
                {  !this.props.token ? <LoginForm /> : <AdminPage token={this.props.token} logoutHandler={this.props.logoutHandler}/> }  
            </div>   
        );
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
    }
  }
const mapDispatchToProps = dispatch => {
return {
    logoutHandler : () => dispatch( actions.logout() ) 
}
}



export default connect( mapStateToProps, mapDispatchToProps )(AdminLanding);