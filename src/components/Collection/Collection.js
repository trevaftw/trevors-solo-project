import React, { Component } from 'react';
import { connect } from 'react-redux';

class Collection extends Component {
    
    componentDidMount(){
    this.handleFetch();    
    }

    handleFetch = () => {
        this.props.dispatch({ type: 'SHARE_CARDS', payload: this.props.match.params.id })
    }

    render() {
        return (
            <>
                {this.props.state.cards && this.props.state.cards.shareCards && this.props.state.cards.shareCards[0] && this.props.state.cards.shareCards[0].username &&
                <h1>{this.props.state.cards.shareCards[0].username}'s collection:</h1>}
                {/* <pre>
                    {JSON.stringify(this.props.match.params.id, null, 2)}
                </pre><br /> */}
                <pre>
                    {JSON.stringify(this.props.state.cards.shareCards, null, 2)}
                </pre>
            </>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
  });

  
export default connect(mapStateToProps)(Collection); 