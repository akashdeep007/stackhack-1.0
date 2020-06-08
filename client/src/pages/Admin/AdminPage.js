import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as regActions from '../../store/actions/regList';
import * as authActions from '../../store/actions/auth';


import AdminTopbar from '../../components/Admin/AdminTopbar';
import RegTypeDash from '../../components/Admin/RegTypeDash';


class AdminPage extends Component{
    state = {
        regTypes : {
            self : 0,
            group : 0,
            coorporate : 0,
            other : 0,
        }
    }
    tokenString = "Bearer " + this.props.token;
    async componentDidMount(){
        await this.props.regListUpdate(this.tokenString);
        await this.props.regTypeUpdate(this.tokenString);
    }

    clickHandler = (id) => {
        this.props.history.push('/admin/users/' + id);
    }



    render(){
        return( this.props.regList === null ? <div className="loader-center"><div className="lds-hourglass"></div></div> : 
        <div style={{overflow : 'auto'}}>
            <AdminTopbar logoutHandler={this.props.logoutHandler} token={this.props.token}/>
            <div className="adminBody">
                <RegTypeDash regTypes={this.props.regType}/>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <tr className="table-header">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Ticket Number</th>
                                    <th>Registration Type</th>
                                </tr>
                            </thead>
                            <tbody>
                            { this.props.regList.map(reg => {
                                return (
                                    <tr key={reg._id} onClick={() => this.clickHandler(reg._id)}>
                                        <td><span className="mob-only">ID : </span>{reg._id}</td>
                                        <td><span className="mob-only">Name : </span>{reg.Fullname}</td>
                                        <td><span className="mob-only">Email : </span>{reg.EmailId}</td>
                                        <td><span className="mob-only">Contact : </span>{reg.MobileNumber}</td>
                                        <td><span className="mob-only">Ticket : </span>{reg.TicketNumber}</td>
                                        <td><span className="mob-only">Registration Type : </span>{reg.RegistrationType}</td>
                                    </tr>);
                                }) 
                            } 
                            </tbody> 
                        </table>
                </div>
            </div> 
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        regList : state.reg.regList,
        token : state.auth.token,
        regType : state.reg.regType
    }
  }
const mapDispatchToProps = dispatch => {
return {
    regListUpdate : (tokenString) => dispatch( regActions.regListUpdate(tokenString) ) ,
    regTypeUpdate : (tokenString) => dispatch( regActions.regTypeUpdate(tokenString) ) ,
    logoutHandler : () => dispatch( authActions.logout() )
}
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(AdminPage));