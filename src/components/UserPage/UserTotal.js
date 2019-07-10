import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";


class UserTotal extends Component{
    state = {
        totalValue: 0
    }

    
    // handleSumValues = () => {
    //     console.log('hello')
    //     let newTotal;
    //     console.log('this.props.cardList', this.props.cardlist)
    //     this.props.state.cards.userCards.forEach((card) => {
    //       console.log('card:', card)
    //       newTotal = Number(newTotal) + (Number(card.number_owned) * Number(card.price))
    //       console.log('newTotal:', newTotal)
    //       return Number(newTotal)
    //     }
    //     )
    //     return this.setState({ totalValue: newTotal })
    //   }
    

    render(){
        let newTotal = 0;
        console.log('this.props.cardList', this.props.cardlist)
        this.props.cardlist.forEach((card) => {
          console.log('card:', card)
          newTotal = Number(newTotal) + (Number(card.number_owned) * Number(card.price))
          console.log('newTotal:', newTotal)
          return Number(newTotal)
        }
        )
        return(
            <>
            Collection total: {newTotal}
            <pre>
                {JSON.stringify(this.props.cardlist, null, 2)}
            </pre>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState: reduxState
  });
  
  export default withRouter(connect(mapReduxStateToProps)(UserTotal));