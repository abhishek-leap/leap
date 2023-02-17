import React from 'react';
import Group from './group';
import {Text, View, FlatList} from 'react-native';
import { useInfiniteDares } from '../../hooks/useInfiniteDares';
import { ACTIVE_DARE_STATUS } from '../../constants';
import styled from '@emotion/native';


const DareBar = ({height}) => {
  const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteDares();

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={Platform.OS === 'web' ? {
        width: '100%',
        height: `${height + 10}'px`,
        flexDirection: 'row',
        display: 'flex',
        paddingBottom: 65,
      } : null}
      data={data?.dares}
      keyExtractor={(item, index) => `${index}_${item?.id}`}
      renderItem={({item, index}) => (
        ((index === 0 && data?.dares[0]?.status !== 'public') || item?.status !== data?.dares[index - 1]?.status) ? (
          <View key={`${index}_${item?.id}`}>
            <DareHead status={item?.status}>
              <DareHeadText status={item?.status}>
                {item?.status === ACTIVE_DARE_STATUS ? <Text>{"new"}</Text>: <Text>{"closed"}</Text>}
              </DareHeadText>
            </DareHead>
          </View>
          
        ) : (
          <Group height={height} key={index} dare={item} />
        )
      )}
      height={height + 10}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={3}
    />
  );
};

export default DareBar;

// const StyledSwiperSlider = styled(SwiperSlide)`
//   width: 18px !important;
// `;

const DareHead = styled.View`
  border-left: 1px solid ${props => (props.status === ACTIVE_DARE_STATUS ? "#C947FF" : "#898989")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DareHeadText = styled.View`
  padding-top: 4.2px;
  transform: rotate(-90deg);
  font-family: "Metropolis-Regular";
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: ${props => (props.status === ACTIVE_DARE_STATUS ? "#FEFBFF" : "#C7C7C7")};
`;