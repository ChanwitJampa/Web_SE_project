import React from 'react';
import axios from 'axios';

export default class TestComponent extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/hospitals`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person._id}>{person.name}</li>
            )
        }
      </ul>
    )
  }
}