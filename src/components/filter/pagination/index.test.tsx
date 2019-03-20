import React from 'react';
import Pagination from '.';
import { create } from "react-test-renderer";

it('renders without crashing', () => {
  const component = create(
    <Pagination 
      numberOfResults={50}
      totalCount={100}
      handleNextPage={() => {return true}}
      handlePreviousPage={() => {return true}}
      firstResult={0} />);

  expect(component).toBeDefined();
});


it('should display a "Previous" button that is disabled', () => {
  const component = create(
    <Pagination 
      numberOfResults={50}
      totalCount={100}
      handleNextPage={() => {return true}}
      handlePreviousPage={() => {return true}}
      firstResult={0} />);

  const button = component.root.findByProps({className: "disabled"})
  expect(button).toBeDefined;
  expect(button.props.children).toBe("Previous");
});

it('should call handleNextPage props when next button is clicked', () => {
  const component = create(
    <Pagination 
      numberOfResults={50}
      totalCount={100}
      handleNextPage={() => {expect(true).toBe(true)}}
      handlePreviousPage={() => {expect(false).toBe(true)}}
      firstResult={0} />);

  const nextButton = component.root.findAllByType("button")[1];  
  nextButton.props.onClick();
});

it('should render 2 buttons', () => {
  const component = create(
    <Pagination 
      numberOfResults={50}
      totalCount={100}
      handleNextPage={() => {expect(true).toBe(true)}}
      handlePreviousPage={() => {expect(false).toBe(true)}}
      firstResult={0} />);

  expect(component.root.findAllByType("button").length).toBe(2);
});