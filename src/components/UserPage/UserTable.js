import React, { Component } from 'react';
import { connect } from 'react-redux';

//sweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

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
            MySwal.fire({
                title: 'Uh-Oh',
                text: 'Quantity must be at least 1',
                type: 'error',
                confirmButtonText: 'Sorry'
            })
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
        event.persist();
        console.log('event.target.value', event.target.value)
        console.log('event.target.id', event.target.id)
        // const confirmBox = window.confirm('Click to OK to delete. Click Cancel to keep watching the card');
        MySwal.fire({
            title: 'WARNING',
            text: `Are you sure you want to remove ${event.target.id} from your collection?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({ type: 'DELETE_CARD', payload: event.target.value })
                console.log('true')
            }
        })
        // if (confirmBox === true) {
        //     
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
                <td className="table145" ><button className="ADE-button" onClick={this.handleEdit}>Edit</button><button className="ADE-button" id={this.props.name + ' from ' + this.props.set_name} value={this.props.serial_id} onClick={this.handleDelete}>Delete</button></td>
            </>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserTable); 