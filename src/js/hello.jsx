import React from 'react';
import ReactDOM from 'react-dom';

class World extends React.Component {
    render () {
        return <h1>Hello World adsfasdf</h1>;
    }
    add (op1, op2) {
        return op1 + op2;
    }
}

export {World};
// ReactDOM.render(<World/>, document.getElementById('helloworld'));
