import React, {
  Component
} from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          countries: response.data
        })
      })
  }

  filteredCountries(){
    const { countries, filter} = this.state;
    return filter === '' ? countries  : countries.filter(
      country => country.name.toLowerCase().includes(filter.toLowerCase()) );
  }

  handleFilter = event => {
    const filter = event.target.value;
    this.setState({ filter });
  };

  handleClick = (event, specialCountry) => {
    this.setState({ specialCountry });
  }

  countryInfo(country) {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>Capital: {country.capital}</div><div>&nbsp;</div>
        <div>Population: {country.population}</div><div>&nbsp;</div>
        <div><img src={country.flag} width='200' /></div>
      </div>
    )
  }

  specialCountryInfo(country) {
    return country.name === this.state.specialCountry ? this.countryInfo(country) : '';
  }

  render() {
    const filtered = this.filteredCountries();
    const countries = filtered.length > 10 ?
      (<div> too many macthes, speficy another filter! </div>) :
        filtered.length === 1 ?
        (<div>
          {this.countryInfo(filtered[0])}
        </div>):
        filtered.map((country, index) => (
          <div key={country.alpha3Code} onClick={(e) => this.handleClick(e, country.name)}>
           {country.name} {this.specialCountryInfo(country)}
          </div>)
      );
    return (
    <div>
      <div>
      Find coutries: <input value={this.state.filter} onChange={this.handleFilter} />
      </div>
      <div>
        {countries}
      </div>
    </div>
    );
  }
}

export default App;