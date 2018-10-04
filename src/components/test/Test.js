import React, { Component } from 'react'

class Test extends Component {

    state = {
        title: '',
        body: ''
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())  //returns a promise then u get response and them map it to json
            .then(data => this.setState({  //set state to data from jsonplaceholder
                title: data.title,
                body: data.body
            })
            );
    }

    render() {
        const { title, body } = this.state;  //get info from state
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        )
    }
}

export default Test;