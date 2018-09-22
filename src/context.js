import React, { Component } from 'react';

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
        contacts: [
            {
                id: 1,
                name: 'John Doe',
                email: 'jdoe@gmail.com',
                phone: '555-555-5555'
            },
            {
                id: 2,
                name: 'Karen Williams',
                email: 'karenw@gmail.com',
                phone: '222-222-2222'
            },
            {
                id: 3,
                name: 'Henry Johnson',
                email: 'henryj@gmail.com',
                phone: '333-333-3333'
            }
        ],
        dispatch: action => //sispatch takes in action which is settinng the state 
            this.setState(state => reducer(state, action))

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