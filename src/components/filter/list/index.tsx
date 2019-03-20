import React, { Component } from 'react';
import AutoInput from '../auto-input';
import Pagination from '../pagination';

import './filterList.css';

interface FilterListProps {
  reverse?: boolean;
  searchTerm: string;
  priceRange: string;
  firstResult: number;
  numberOfResults: number;
  totalCount: number;
  sortCriteria: string;
  handleNextPage: any;
  handlePreviousPage: any;
  handlePriceRangeChange: any;
  handleFilterChange: any;
}

class FilterList extends Component<FilterListProps, any> {
  constructor(props: FilterListProps) {
    super(props);
  }

  render() {
    let filterListStyle={};
    if (this.props.reverse) {
      filterListStyle={flexDirection: "column-reverse"};
    }
    return (
      <div className="filter-list" style={filterListStyle}>
        <div className="filter-container">
          <AutoInput searchTerm={this.props.searchTerm} callback={this.props.handleFilterChange} />
          <div className="price-range-container">
            <div>Price Range</div>
            <select value={this.props.priceRange} onChange={(e: any) => this.props.handlePriceRangeChange(e.target.value)}>
              <option value="0..9999">None</option>
              <option value="0..5">$0 - $5</option>
              <option value="5..10">$5 - $10</option>
              <option value="10..20">$10 - $20</option>
              <option value="20..50">$20 - $50</option>
              <option value="50..100">$50 - $100</option>
              <option value="100..9999">$100+</option>
            </select>
          </div>
          <div className="sort-container">
            <div className="select-input-container">
              <span>Sort By </span>
              <select value={this.props.sortCriteria} onChange={(e: any) => this.props.handleFilterChange("sortCriteria", e.target.value)}>
                <option value="@tpprixnum descending">Price Descending</option>
                <option value="@tpprixnum ascending">Price Ascending</option>
              </select>
            </div>
            <div className="select-input-container">
              <span>Items per page </span>
              <select value={this.props.numberOfResults} onChange={(e: any) => this.props.handleFilterChange("numberOfResults", e.target.value)}>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
              </select>
            </div>
          </div>
        </div>
        <br></br>
        <Pagination 
          totalCount={this.props.totalCount}
          numberOfResults={this.props.numberOfResults} 
          firstResult={this.props.firstResult}
          handleNextPage={this.props.handleNextPage}
          handlePreviousPage={this.props.handlePreviousPage} />
      </div>
    );
  }
}

export default FilterList;
