import {search, generateUrlParams} from '.';

it('should generate URL params correctly', () => {
  const expectedString = "&firstResult=0&numberOfResults=24&sortCriteria=@tpprixnum%20ascending";
  expect(generateUrlParams({
    firstResult: 0,
    numberOfResults: 24,
    sortCriteria: "@tpprixnum ascending",
  })).toBe(expectedString);
});

it('should return empty string if no params are passed', () => {
  const expectedString = "";
  expect(generateUrlParams(undefined)).toBe(expectedString);
});
