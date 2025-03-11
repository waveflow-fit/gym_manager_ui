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

export const createNestedObject = (
  obj: Record<string, any>,
  groupKey?: string
): Record<string, any> => {
  const result: Record<string, any> = {};
  const groupedItems: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];
    const keys = key.split('.');

    if (groupKey && keys[0].startsWith(`${groupKey}-`)) {
      const uniqueId = keys[0].split('-')[1]; // Extract unique identifier
      const subKeys = keys.slice(1).join('.'); // Remaining key path

      if (!groupedItems[uniqueId]) groupedItems[uniqueId] = {};
      let current = groupedItems[uniqueId];

      subKeys.split('.').forEach((k, index, arr) => {
        if (index === arr.length - 1) {
          current[k] = value;
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      });
    } else {
      let current = result;
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = value;
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      });
    }
  }

  if (groupKey && Object.keys(groupedItems).length) {
    result[groupKey] = Object.values(groupedItems);
  }

  return result;
};
