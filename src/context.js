import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => { //evaluate type of object/ action type
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state, //getting existing state
                contacts: state.contacts.filter(contact =>
                    contact.id !== action.payload) //action.payload is data sent with ur action. in this case id
            }
        case 'ADD_CONTACT':
            return {
                ...state, //getting existing state
                contacts: [action.payload,
                ...state.contacts]  //adds new info to contacts
            }
        default:
            return state
    }
}
export class Provider extends Component {
    state = {
        contacts: [],
        dispatch: action => //sispatch takes in action which is settinng the state 
            this.setState(state => reducer(state, action))
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users/')
            .then(res => this.setState({  //set state to data from jsonplaceholder
                contacts: res.data
            })
            );
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;