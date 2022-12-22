import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import Group from './group';
import {loadDares} from '../../apis';
import {Platform} from 'react-native';

const DareBar = ({height}) => {
  const [dares, setDares] = useState([]);
  const [dareMetaData, setDareMetaData] = useState({});

  const fetchDaresFromApi = async offset => {
    const queyParams = {
      options: JSON.stringify({
        filter: {offset: offset, limit: 10},
        q: {source: 'bar'},
      }),
    };
    const res = await loadDares(queyParams);
    const result = await res.json();
    const {dares: apiDares, meta} = result;
    setDares([...dares, ...apiDares]);
    setDareMetaData(meta);
  };

  const loadMoreDares = async info => {
    console.log('fetching more: ', info);
    const offset = dares?.length;
    // no more elements to fetch
    if (offset >= dareMetaData.total) return;
    fetchDaresFromApi(offset);
  };

  useEffect(() => {
    fetchDaresFromApi(0);
  }, []);

  return (
    <Root
      display={Platform.OS === 'web' ? 'contents' : 'flex'}
      height={height}
      horizontal
      onEndReached={loadMoreDares}
      onEndReachedThreshold={3}>
      {dares?.map((item, i) => {
        return <Group height={height} key={i} dare={item} />;
      })}
    </Root>
  );
};

export default DareBar;

const Root = styled.ScrollView`
  width: 100%;
  height: ${props => `${props.height + 10}px`};
  flex-direction: row;
  display: ${props => props.display};
`;
