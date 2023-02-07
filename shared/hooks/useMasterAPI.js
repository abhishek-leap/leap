import {
	useMutation,
  } from '@tanstack/react-query';
import { countriesList } from '../apis';

const getCountriesList = async (queryParams) => {
    const res = await countriesList(queryParams);
    const data = await res.json();
    return data;
}

export const useCountryList = () => {
	return useMutation({
		mutationFn: (queryParams) => {
		  return getCountriesList(queryParams)
		},
	})
}

