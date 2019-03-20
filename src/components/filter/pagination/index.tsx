import React, { Component } from 'react';
import './pagination.css';

interface PaginationProps {
  firstResult: number;
  numberOfResults: number;
  totalCount: number;
  handleNextPage: any;
  handlePreviousPage: any;
}


class Pagination extends Component<PaginationProps, any> {
  constructor(props: PaginationProps) {
    super(props);
    this.nextPageGuard = this.nextPageGuard.bind(this);
    this.previousPageGuard = this.previousPageGuard.bind(this);
  }

  nextPageGuard(maxPage: number, callback: any): void {
    if (this.props.firstResult + 1 < maxPage) callback();
  }

  previousPageGuard(callback: any): void {
    if (this.props.firstResult > 0) callback();
  }
  
  render() {
    let maxPage = Math.ceil(this.props.totalCount / this.props.numberOfResults);

    return (
      <div className="pagination-container">
        <div className="buttons-container">
          <button className={(this.props.firstResult == 0) ? "disabled" : ""} onClick={() => {this.previousPageGuard(this.props.handlePreviousPage)}}>Previous</button>

          <div>{this.props.firstResult + 1} of </div>
          <div className="max-page">...{maxPage}</div>
          
          <button className={(this.props.firstResult + 1 == maxPage) ? "disabled" : ""}  onClick={() => {this.nextPageGuard(maxPage, this.props.handleNextPage)}}>Next</button>
        </div>
      </div>
    );
  }
}

export default Pagination;
