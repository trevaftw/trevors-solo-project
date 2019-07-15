import React, { Component } from 'react';
import { connect } from 'react-redux';

//sweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class SearchResult extends Component {

    state = {
        newCards: null
    }

    handleNumber = (scryfall_id) => (event) => {
        // //console.log('event.target.value:', event.target.value)
        // //console.log('event.target.title:', event.target.title)
        // //console.log('event.target.lang:', event.target.lang)
        this.setState({
            newCards: {
                name: event.target.name,
                card_set: event.target.title,
                scryfall_id: scryfall_id,
                number: event.target.value,
                user_id: this.props.reduxState.user.id,
                price: event.target.id,
                image: event.target.lang
            }
        })
    }

    handleAdd = (event) => {
        // //console.log('event.target.value:', event.target.value)
        if (this.state.newCards === null) {
            MySwal.fire({
                title: 'Uh-Oh',
                text: 'Please select a number',
                type: 'error',
                confirmButtonText: 'Sorry'
            })
        } else if (this.state.newCards.scryfall_id === event.target.value) {
            const newCardObject = this.state.newCards
            //console.log('card to be added:', newCardObject)
            this.props.dispatch({ type: 'ADD_TO_COLLECTION', payload: newCardObject })
            MySwal.fire({
                title: '',
                text: `Thank you for adding ${this.state.newCards.number} ${this.state.newCards.name} from ${this.state.newCards.card_set} to your collection!`,
                type: 'success',
                confirmButtonText: 'Yay!'
            })

            this.setState({
                newCards: null
            })

        }
    }

    render() {
        return (
            <>
                <td className="table280">{this.props.name}</td>
                <td className="table280">{this.props.set}</td>
                <td className="table145">${this.props.price}</td>
                <td className="table145"><input type="number" min="0" lang={this.props.image} name={this.props.name} id={this.props.price} title={this.props.set} value={(this.state && this.state.newCards && this.state.newCards.scryfall_id === this.props.id && this.state.newCards.number) || 0} onChange={this.handleNumber(`${this.props.id}`)} /></td>
                <td className="table161"><button className="ADE-button" onClick={this.handleAdd} value={this.props.id} >Add</button></td>
            </>
        );
    }
}


const mapReduxStateToProps = reduxState => ({
    reduxState: reduxState,
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(SearchResult);
