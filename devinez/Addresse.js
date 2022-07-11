import React from 'react';

export default class Addresse extends React.Component {

    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div>{this.props.addr}</div>
        )
    }

}
