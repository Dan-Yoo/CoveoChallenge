import React, { Component } from 'react';
import AutoInput from '../filter/auto-input';
import { ReactComponent as Logo } from '../../logo.svg';
import './Navbar.css';

interface NavbarProps {
  searchTerm: string;
  handleFilterChange: any;
}

class Navbar extends Component<NavbarProps, any> {
  constructor(props: NavbarProps) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="navbar">
        <Logo onClick={this.scrollToTop} />
        <AutoInput searchTerm={this.props.searchTerm} callback={this.props.handleFilterChange} />
      </div>
    );
  }
}

export default Navbar;
