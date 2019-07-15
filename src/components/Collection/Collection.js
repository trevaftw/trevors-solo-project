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
                Hello<br />

                {/* <pre>
                    {JSON.stringify(this.props.match.params.id, null, 2)}
                </pre><br />
                <pre>
                    {JSON.stringify(this.props, null, 2)}
                </pre> */}
            </>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
  });

  
export default connect(mapStateToProps)(Collection); 