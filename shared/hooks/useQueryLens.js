import {
	useMutation,
  } from '@tanstack/react-query';
import { lensGroup } from '../apis';

export const useLensGroup = () => {
	return useMutation({
		mutationFn: async () => {
			return await lensGroup()
		},
	})
}