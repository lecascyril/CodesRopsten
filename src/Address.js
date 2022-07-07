import React from 'react';
import './Address.css';


export default class Address extends React.Component {


    render(){
        return(
            <div className='header'><p>Voici l'adress que vous utilisez: </p>{this.props.addr}</div>
        )
    }

}