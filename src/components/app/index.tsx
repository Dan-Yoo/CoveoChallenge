import React, { Component } from 'react';
import Navbar from '../navbar';
import FilterList from '../filter/list';
import ItemList from '../item/list';
import {search} from '../../services/api';
import './App.css';

interface AppState {
  searchTerm: string;
  firstResult: number;
  numberOfResults: number;
  totalCount: number;
  sortCriteria: string;
  priceRange: string;
  items: [];
}

class App extends Component {
  state: AppState = {
    searchTerm: "",
    firstResult: 0,
    numberOfResults: 12,
    totalCount: 0,
    sortCriteria: "@tpprixnum ascending",
    priceRange: "0..9999",
    items: []
  };

  constructor(props: any) {
    super(props);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  handleNextPage() {
    this.setState({firstResult: this.state.firstResult + 1}, this.getResults);
  }

  handlePreviousPage() {
    this.setState({firstResult: this.state.firstResult - 1}, this.getResults);
  }

  handleFilterChange(key: keyof AppState, value: any) {
    this.setState({
      [key]: value,
      firstResult: 0,
    }, this.getResults);
  }

  handlePriceRangeChange(value: string) {
    this.setState({
      priceRange: value,
    }, this.getResults);
  }

  async getResults() {
    console.log("performing serach");
    const data: any = await search(this.state.searchTerm, this.state.priceRange, {
      numberOfResults: this.state.numberOfResults,
      firstResult: this.state.firstResult,
      sortCriteria: this.state.sortCriteria,
    });

    this.setState({
      totalCount: data.totalCount,
      items: (data.results || []),
    });
  }

  render() {
    return (
      <main>
        <Navbar />
        <section style={{padding: "1rem"}}>
          <FilterList 
            searchTerm={this.state.searchTerm}
            priceRange={this.state.priceRange}
            totalCount={this.state.totalCount}
            numberOfResults={this.state.numberOfResults} 
            firstResult={this.state.firstResult}
            sortCriteria={this.state.sortCriteria}
            handleNextPage={this.handleNextPage}
            handlePreviousPage={this.handlePreviousPage}
            handlePriceRangeChange={this.handlePriceRangeChange}
            handleFilterChange={this.handleFilterChange} />
          <ItemList items={this.state.items} />

          <FilterList
            reverse={true} 
            searchTerm={this.state.searchTerm}
            priceRange={this.state.priceRange}
            totalCount={this.state.totalCount}
            numberOfResults={this.state.numberOfResults} 
            firstResult={this.state.firstResult}
            sortCriteria={this.state.sortCriteria}
            handleNextPage={this.handleNextPage}
            handlePreviousPage={this.handlePreviousPage}
            handlePriceRangeChange={this.handlePriceRangeChange}
            handleFilterChange={this.handleFilterChange} />
        </section>
      </main>
    );
  }
}

export default App;
