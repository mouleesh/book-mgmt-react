import React from 'react'

export class Foo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { name: 'foo' };
    }
  
    componentDidMount(){
    }
    render() {
      const { name } = this.state;
      return (
        <div className={name} />
      );
    }
  } 