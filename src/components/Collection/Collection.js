import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

const mtgCardBack = require('../AddCards/Magic_the_gathering-card_back.jpg');

class Collection extends Component {
    state = {
        cardName: '',
        image: mtgCardBack,
        alt: '',
    }

    componentDidMount() {
        this.handleFetch();
    }

    handleFetch = () => {
        this.props.dispatch({ type: 'SHARE_CARDS', payload: this.props.match.params.id })
    }

    handleImage = (newImage, name) => {
        // //console.log('mouse over')
        this.setState({
            ...this.state,
            image: newImage,
            alt: `Name:, ${name}`,
        })
        // //console.log('this.state.image:', this.state.image)
    }

    render() {
        return (
            <>
            <Nav />
                {this.props.state.cards && this.props.state.cards.shareCards && this.props.state.cards.shareCards[0] && this.props.state.cards.shareCards[0].username &&
                    <h1>{this.props.state.cards.shareCards[0].username}'s collection:</h1>}
                <br />
                <section className="user-flex">
                    <table>
                        <thead>
                            <tr>
                                <th className="head280">Card Name</th>
                                <th className="head280">Card Set</th>
                                <th className="head145">Card Price</th>
                                <th className="head161">Number Owned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.state.cards.shareCards.map((card) => {
                                return (
                                    <tr key={card.id} onMouseOver={() => this.handleImage(card.image_uris, card.name)}>
                                        <td className="table280"  >{card.name}</td>
                                        <td className="table280"  >{card.set_name}</td>
                                        <td className="table145"  >${card.price}</td>
                                        <td className="table145">{card.number_owned}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table><br />
                    <div>
                        <img className="cardImageResults" src={this.state.image} alt={this.state.alt} />
                    </div>
                </section>
                {/* <pre>
                    {JSON.stringify(this.state, null, 2)}
                </pre> */}
            </>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
});


export default connect(mapStateToProps)(Collection); 