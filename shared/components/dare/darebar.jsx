import React from 'react';
import Group from './group';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import { useInfiniteDares } from '../../hooks/useInfiniteDares';
import { ACTIVE_DARE_STATUS } from '../../constants';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { setAudioOff } from '../../redux-ui-state/slices/feedsSlice';
import { handlePush } from '../../navigation/navigationService';

const TEXT_LENGTH = 47
const TEXT_HEIGHT = 35
const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2

const paddingBottom = Platform.OS == 'ios' ? 15 : 8;

const DareBar = ({height}) => {
  const dispatch = useDispatch();
  const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteDares();
  
  const onClickHandle = (dare) => {
    dispatch(setAudioOff());
    handlePush({name: 'DarePreview', params: {dare, source: 'bar', allDares: data?.dares}})
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={Platform.OS === 'web' ? {
        width: '100%',
        // height: `${height + 10}'px`,
        flexDirection: 'row',
        display: 'flex',
        paddingBottom: 65,
      } : {
        // height: 200
        paddingBottom: paddingBottom,
        paddingLeft: 15
      }}
      data={data?.dares}
      keyExtractor={(item, index) => `${index}_${item?.id}`}
      renderItem={({item, index}) => (
        <>
        {index === 0 || (item.status !== data.dares[index - 1]?.status && data.dares[index - 1]?.status !== undefined) ? (
          item?.status === ACTIVE_DARE_STATUS ? 
            <LinearGradient 
                style={[styles.linearGradient, {borderLeftColor: "#c947ff"}]} 
                start={{x: 0, y: 0}} 
                end={{x: 0.9, y: 0}} 
                colors={['rgba(153, 0, 216, 0.58)', 'rgba(153, 0, 216, 0.25)', 'rgba(217, 217, 217, 0)']}>
                  <View style={{ width: TEXT_HEIGHT, height: TEXT_LENGTH }}>
                    <Text style={{
                      color: '#FEFBFF',
                      fontWeight: '400',
                      fontSize: 11,
                      fontFamily: 'Metropolis-Medium',
                      letterSpacing: 0.13,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      transform: [
                        { rotate: "-90deg" }, 
                        { translateX: -OFFSET }, 
                        { translateY: OFFSET }
                      ],
                      width: TEXT_LENGTH,
                      height: TEXT_HEIGHT
                    }}>
                      {'new'}
                    </Text>
                  </View>
            </LinearGradient>
            :
            <LinearGradient 
              style={[styles.linearGradient, {borderLeftColor: "rgb(137, 137, 137)"}]}
              start={{x: 0, y: 0}} 
              end={{x: 0.9, y: 0}} 
              colors={['rgba(122, 122, 122, 0.58)', 'rgba(217, 217, 217, 0.15)', 'rgba(217, 217, 217, 0)']}
               >
              <View style={{ width: TEXT_HEIGHT, height: TEXT_LENGTH }}>
              <Text style={{
                color: 'rgb(199, 199, 199)',
                fontWeight: '400',
                fontSize: 11,
                fontFamily: 'Metropolis-Medium',
                letterSpacing: 0.13,
                textTransform: 'uppercase',
                transform: [
                  { rotate: "-90deg" }, 
                  { translateX: -OFFSET }, 
                  { translateY: OFFSET }
                ],
                width: TEXT_LENGTH,
                height: TEXT_HEIGHT
              }}>
                {'closed'}
              </Text>
            </View>
            </LinearGradient>
          
        ) : (
          <></>
        )}
        <Group key={index} dare={item} index={index} allDares={data?.dares} onClick={onClickHandle} />
        </>
      )}
      // height={height + 10}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={3}
    />
  );
};

export default DareBar;

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    justifyContent: 'center',
    borderLeftWidth: 1,
  }
});

// const DareHeadTextNew = styled.Text`
//   color: #FEFBFF;
//   font-family: Metropolis-Medium;
//   font-weight: 400;
//   font-size: 10px;
//   letter-spacing: 0.13px;
//   line-height: 10px;
//   text-transform: uppercase;
//   transform: rotate(-90deg);
// `;

// const DareHeadTextClosed = styled.Text`
//   font-family: Metropolis-Medium;
//   font-weight: 500;
//   font-size: 12px;
//   color: rgb(199, 199, 199);
//   letter-spacing: 0.13px;
//   line-height: 10px;
//   text-transform: uppercase;
//   transform: rotate(-90deg);
// `;