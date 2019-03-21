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
  infiniteScroll: boolean;
  items: [];
}

class App extends Component {
  state: AppState = this.defaultState();

  constructor(props: any) {
    super(props);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.toggleInfiniteScroll = this.toggleInfiniteScroll.bind(this);
    this.infiniteScrollCallback = this.infiniteScrollCallback.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  defaultState(): AppState {
    return {
      searchTerm: "",
      firstResult: 0,
      numberOfResults: 36,
      totalCount: 0,
      sortCriteria: "@tpprixnum ascending",
      priceRange: "0..9999",
      infiniteScroll: false,
      items: []
    }
  }
  
  handleNextPage() {
    this.setState({firstResult: this.state.firstResult + 1}, this.getResults);
  }

  handlePreviousPage() {
    this.setState({firstResult: this.state.firstResult - 1}, this.getResults);
  }

  handleFilterChange(key: keyof AppState, value: any) {
    window.scrollTo(0, 0);
    this.setState({
      items: [],
      [key]: value,
      firstResult: 0,
    }, this.getResults);
  }

  infiniteScrollCallback() {
    if (this.state.infiniteScroll) {
      this.setState({
        firstResult: (this.state.firstResult + 1)
      }, this.getResults);
    }
  }

  toggleInfiniteScroll() {
    let newState = this.defaultState();
    newState.infiniteScroll = !this.state.infiniteScroll;

    this.setState(newState, this.getResults);
  }

  async getResults() {
    const data: any = await search(this.state.searchTerm, this.state.priceRange, {
      numberOfResults: this.state.numberOfResults,
      firstResult: this.state.firstResult,
      sortCriteria: this.state.sortCriteria,
    });

    if (this.state.infiniteScroll) {
      this.setState({
        items: [...this.state.items, ...data.results]
      });
    } else {
      this.setState({
        totalCount: data.totalCount,
        items: (data.results || []),
      });
    }
  }

  render() {
    return (
      <main>
        <Navbar searchTerm={this.state.searchTerm} handleFilterChange={this.handleFilterChange} />
        <section style={{padding: "1rem", paddingTop: "60px"}}>
          <div style={{textAlign: "center", width: "100%"}}>
            <button onClick={this.toggleInfiniteScroll} className="infinite-toggle">
              Infinite Scroll {(this.state.infiniteScroll) ? "Off" : "On"}
            </button>
          </div>
          <FilterList 
            searchTerm={this.state.searchTerm}
            infiniteScroll={this.state.infiniteScroll}
            priceRange={this.state.priceRange}
            totalCount={this.state.totalCount}
            numberOfResults={this.state.numberOfResults} 
            firstResult={this.state.firstResult}
            sortCriteria={this.state.sortCriteria}
            handleNextPage={this.handleNextPage}
            handlePreviousPage={this.handlePreviousPage}
            handleFilterChange={this.handleFilterChange} />
          <ItemList items={this.state.items} intersectionCallback={this.infiniteScrollCallback} />
          <br></br>
          <FilterList
            reverse={true} 
            searchTerm={this.state.searchTerm}
            infiniteScroll={this.state.infiniteScroll}
            priceRange={this.state.priceRange}
            totalCount={this.state.totalCount}
            numberOfResults={this.state.numberOfResults} 
            firstResult={this.state.firstResult}
            sortCriteria={this.state.sortCriteria}
            handleNextPage={this.handleNextPage}
            handlePreviousPage={this.handlePreviousPage}
            handleFilterChange={this.handleFilterChange} />
        </section>
      </main>
    );
  }
}

export default App;
