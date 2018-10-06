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
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(
                    contact => contact.id === action.payload.id   //check if matches, payload is data we already have
                        ? (contact = action.payload)  //if it is make contact equal to payload
                        : contact)  //else leave the same
            }
        default:
            return state
    }
}
export class Provider extends Component {
    state = {
        contacts: [],
        dispatch: action => //dispatch takes in action which is settinng the state 
            this.setState(state => reducer(state, action))
    }

    async componentDidMount() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users/')
        this.setState({ contacts: res.data });     //set state to data from jsonplaceholder


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