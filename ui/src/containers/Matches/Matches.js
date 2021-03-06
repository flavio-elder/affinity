import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import styles from './Matches.css';

const fetchMatches = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(response => resolve(response.json()));
  });
}

const formatUrl = (origin, filters) => {
  let queryString = '';
  for (const prop in filters) {
    queryString += `${prop}=${filters[prop]}&`
  }
  queryString = queryString.slice(0, -1);
  return `${origin}?${queryString}`;
}

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      filters: {
        hasPhoto: false,
        hasExchanged: false,
        isFavourite: false
      },
      entities: {
        matches: []
      },
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
  }

  componentDidUpdate() {
    const { isFetching, filters } = this.state;
    if (isFetching) {
      const url = formatUrl('http://localhost:5000/api/matches', filters);
      fetchMatches(url).then(json => {
        this.setState(prevState => ({
          isFetching: false,
          entities: {
            ...prevState.entities,
            matches: json.matches
          }
        }));
      });
    }
  }
  
  handleCheckboxFilterChange = (e) => {
    const { name, checked } = e.target;
    this.setState(prevState => ({
      isFetching: true,
      filters: {
        ...prevState.filters,
        [name]: checked
      }
    }));
  }

  renderMatches = () => {
    const { isFetching } = this.state;
    const { matches } = this.state.entities;
    if (isFetching) {
      return <div>Loading...</div>;
    }

    return matches.map((match, index) => (
      <div key={index} className={styles.MatchWrapper}>
        <img src={match.main_photo} alt={match.main_photo} className={styles.MatchPhoto}/>
        <div className={styles.MatchDetails}>
          <p>{match.display_name}, {match.age}</p>
          <p>{match.job_title}</p>
          <p>{match.city.name}</p>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className={styles.Matches}>
        <Sidebar
          filters={this.state.filters}
          handleCheckboxFilterChange={this.handleCheckboxFilterChange}
        />
        <Main
          heading="Matches"
          body={this.renderMatches()}
        />
      </div>
    );
  }
};

export default Matches;