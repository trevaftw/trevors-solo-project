import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserTable extends Component {
    state = {
        editable: false,
        newValue: ''
    }

    handleEdit = () => {
        console.log('edit')
        this.setState({
            editable: !this.state.editable
        })
    }

    handleSave = (event) => {
        console.log('save')
        if (this.state.newValue <= 0) {
            alert("ERROR - Quantity must be at least 1")
        } else {
            this.setState({
                editable: !this.state.editable
            })
            console.log('this.state.newValue:', this.state.newValue)
            console.log('event.target.value', event.target.value)
            const newObject = {
                card_id: event.target.value,
                newValue: this.state.newValue
            }
            this.props.dispatch({ type: 'UPDATE_NUMBER_OWNED', payload: newObject })
        }
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            newValue: event.target.value
        })
    }

    handleDelete = (event) => {
        console.log('event.target.value', event.target.value)
        // console.log('event.target.id', event.target.id)
        const confirmBox = window.confirm('Click to OK to delete. Click Cancel to keep watching the card');
        if (confirmBox === true) {
            this.props.dispatch({ type: 'DELETE_CARD', payload: event.target.value })
        }
    }

    render() {
        return (
            <>
                <td className="table280"  >{this.props.name}</td>
                <td className="table280"  >{this.props.set_name}</td>
                <td className="table145"  >{this.props.price}</td>
                <td className="table145"  >{this.state.editable ?
                    <><input type="number" min="0" onChange={this.handleChange} placeholder={this.props.number_owned}></input><button className="ADE-button" value={this.props.serial_id} onClick={this.handleSave}>Save</button></>
                    :
                    <>{this.props.number_owned} </>
                }
                </td>
                <td className="table145" ><button className="ADE-button" onClick={this.handleEdit}>Edit</button><button className="ADE-button" value={this.props.serial_id} onClick={this.handleDelete}>Delete</button></td>
            </>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserTable); 