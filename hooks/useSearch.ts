import { useQuery } from '@tanstack/react-query';
import { TIME_IN_MILLISECONDS } from '../constants/constants';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { queryClient } from '../store/queryClient';
import { Alert } from 'react-native';
import { TEXT } from '../constants/Text';
import { errorText } from '../utils/getErrorMessageText';

export const useCollectionsQuery = (search: any) => {
  return useQuery([QUERIES.COLLECTIONS], () => fetchCollections(search), {
    onSuccess: (response: any) => {
      queryClient.setQueryData([QUERIES.COLLECTIONS], { key: response });
    },
    onError: (error) => {
      Alert.alert(TEXT.SOMETHING_WENT_WRONG, errorText(error), [
        {
          text: TEXT.OKAY,
          style: 'default',
        },
      ]);
    },
    staleTime: TIME_IN_MILLISECONDS.MINUTE * 10,
  });
};

const fetchCollections = async (search: any) => {
  const format = (search: string) =>
    `${ENDPOINTS.GENERAL}${search}?api_key=${API_KEY.GOV_KEY}`;
  const formattedWithTemplate = format(search);
  let response = (await fetch(formattedWithTemplate)) as any;
  return response?.json();
};
