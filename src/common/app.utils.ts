import { PAGINATION } from '@/common/constants';

export const convertFormDataToJson = (formData: FormData) => {
  return formData.entries().reduce((prevVal, currVal) => {
    const [key, val] = currVal;
    prevVal[key] = val;
    return prevVal;
  }, {});
};

export const endpointWithQueryParams = ({
  url,
  queryParams,
  addDefaultPagination = undefined,
}: {
  url: string;
  queryParams: Record<string, any>;
  addDefaultPagination?: boolean;
}) => {
  const query = Object.entries({
    ...(addDefaultPagination
      ? { limit: PAGINATION.DEFAULT_LIMIT, page: PAGINATION.DEFAULT_PAGE_NUM }
      : {}),
    ...queryParams,
  }).reduce((prevVal, [key, val]) => {
    return `${prevVal}${prevVal ? '&' : ''}${key}=${val}`;
  }, '');
  return `${url}?${query}`;
};

export const endpointWithUrlParams = (
  url: string,
  queryParams: Record<string, string>
) => {
  return Object.entries(queryParams).reduce((prevVal, [key, val]) => {
    return url.replace(`:${key}`, val);
  }, url);
};
