import { set, uniqueId } from 'lodash';

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
  groupKey: string = ''
) => {
  const result: Record<string, any> = {};
  const grouped: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    const keys = key.split('.');
    const match = keys[0].match(new RegExp(`^${groupKey}-(.+)$`));
    if (match) {
      const id = keys[0];
      if (!grouped[id]) grouped[id] = { id };
      set(grouped[id], keys.slice(1).join('.'), value);
    } else {
      set(result, key, value);
    }
  });

  if (Object.keys(grouped).length) {
    result[groupKey] = Object.values(grouped);
  }

  return result;
};

export const flattenNestedObject = (
  obj: Record<string, any>,
  groupKey?: string
): Record<string, any> => {
  const result: Record<string, any> = {};

  const recurse = (currObj: Record<string, any>, parent = ''): void => {
    Object.entries(currObj).forEach(([key, value]) => {
      const newKey = parent ? `${parent}.${key}` : key;

      if (groupKey && key === groupKey && Array.isArray(value)) {
        value.forEach((item) => recurse(item, uniqueId(`${groupKey}-`)));
      } else if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    });
  };

  recurse(obj);
  return result;
};
