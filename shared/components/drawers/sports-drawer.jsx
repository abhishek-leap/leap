import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import Picker from '../common/picker';
import { useSportList } from '../../hooks/useMasterAPI';
import { closeSportsBottomDrawer, selectedSport } from '../../redux-ui-state/slices/createDareSlice';

const ANIMATION_DURATION = 500; // 5 sec

const SportsDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const {  data } = useSportList()
  const {sportsShow} = useSelector(state => state.createDare);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: sportsShow ? WINDOW_HEIGHT / 4 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeSportsBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, sportsShow]);

  const handleItem = (item) => {
    dispatch(selectedSport({name: item.name, value: item.id}));
    onCloseIconClick();
  }

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
              title={'Sport #(Soccer)'} 
              data={data}
              onCloseIconClick={onCloseIconClick}
              handleSelectItem={handleItem}
          />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SportsDrawer;

const Body = styled.View`
  height: 100%;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  padding: 5px;
`;
