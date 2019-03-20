const token = process.env.REACT_APP_TOKEN;
const apiRoute = `${process.env.REACT_APP_API_ROUTE}?access_token=${token}`;

interface apiGETParams {
  q?: string,
  firstResult?: number,
  numberOfResults?: number,
  sortCriteria?: string,
  [key: string]: any,
};

const search = async (searchTerm: string, range: string, params?: apiGETParams): Promise<Response> => {
  const response = await fetch(`${apiRoute}&q=@tpprixnum=${range}%20${searchTerm}${generateUrlParams(params)}`);
  return await response.json();
}

const generateUrlParams = (params?: apiGETParams): string => {
  let urlParams = "";

  if (params == undefined) return urlParams;
  // loop through them and generate string to append to fetch route.
  Object.keys(params).forEach((key: string) => {
    urlParams += encodeURI(`&${key}=${params[key]}`);
  });

  return urlParams;
}

export {search, generateUrlParams};