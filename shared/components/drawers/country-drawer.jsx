import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {closeCountryBottomDrawer, selectedCountry} from '../../redux-ui-state/slices/authenticationSlice';
import {WINDOW_HEIGHT} from '../../constants';
import Picker from '../common/picker';
import { useCountryList } from '../../hooks/useMasterAPI';

const ANIMATION_DURATION = 500; // 5 sec

const CountryDrawer = (props) => {
  const dispatch = useDispatch();
  const { data } = useCountryList()
  const {countryShow} = useSelector(state => state.authentication);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: countryShow ? WINDOW_HEIGHT / 4 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeCountryBottomDrawer());
  };

  const handleSelectItem = (item) => {
    dispatch(selectedCountry({name: item.name, value: item.code}));
    onCloseIconClick();
  }

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, countryShow]);
  
  return (
    <Animated.View
      style={{
        ...props.style,
        position: 'absolute',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%',
        transform: [{translateY: slideAnimation}],
      }}>
      <SafeAreaView>
        <Body>
          <Picker
              title={'Country'} 
              data={data}
              onCloseIconClick={onCloseIconClick}
              handleSelectItem={handleSelectItem}
          />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default CountryDrawer;

const Body = styled.View`
  height: 100%;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  padding: 5px;
`;
