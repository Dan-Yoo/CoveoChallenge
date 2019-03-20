import React from 'react';
import AutoInput from '.';
import { create } from "react-test-renderer";

it("should render without crashing", () => {
  const component = create(
    <AutoInput 
      searchTerm=""
      callback={() => {}}
    />);

  expect(component).toBeDefined();
});

it("should call callback after a specific amount of time from last input value press", (done) => {
  const component = create(
    <AutoInput 
      searchTerm=""
      callback={() => {done()}}
    />);

  const input = component.root.findByType("input");
})