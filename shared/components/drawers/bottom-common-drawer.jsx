import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import CountryPicker from './components/countryPicker';
import GenderPicker from './components/genderPicker';
import SportsPicker from './components/sportsPicker';
import DareBackSecondStepBottomDrawer from './components/dareBackSecondStepBottomDrawer';
import HashtagPicker from './components/hashtagPicker';
import CompetitorPicker from './components/competitorPicker';
import DareBackFirstStep from './components/dareBackFirstStep';
// import Authentication from './components/authentication';
import SkillsPicker from './components/skillsPicker';
//  import CreateDare from '../../screens/createDare';

const ANIMATION_DURATION = 500; // 5 sec

const BottomCommonDrawer = (props) => {
  const {countryShow, genderShow} = useSelector(state => state.authentication);
  const {creatDareshow, sportsShow, skillsShow, hashtagShow, competitorShow} = useSelector(state => state.createDare);
  const {darBackshow} = useSelector(state => state.dareBack);
  const {secondStepShow} = useSelector(state => state.dareBack);
  // const {show, authStatus} = useSelector(state => state.authentication);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = (toValueSelected, duration) => {
    Animated.timing(slideAnimation, {
      toValue: toValueSelected,
      duration: duration, //ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let toValue = WINDOW_HEIGHT;
    let animationDuration = ANIMATION_DURATION
    if(countryShow || sportsShow || hashtagShow || competitorShow) {
        toValue = WINDOW_HEIGHT / 4;
    } else if (genderShow) {
        toValue = WINDOW_HEIGHT / 1.3;
    } else if (secondStepShow) { //creatDareshow || show
        toValue = 0;
        animationDuration = secondStepShow ? 100 : ANIMATION_DURATION;
    } else if (skillsShow) {
        toValue = WINDOW_HEIGHT / 1.7;
    } else if (darBackshow) {
      toValue = WINDOW_HEIGHT / 6;
    }
    toggleDrawer(toValue, animationDuration);
  }, [toggleDrawer, countryShow, genderShow, sportsShow, skillsShow, hashtagShow, competitorShow, secondStepShow, darBackshow]);
  
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
          {countryShow ? 
            <CountryPicker />
            :
            genderShow ?
                <GenderPicker />
                :
                sportsShow ? 
                  <SportsPicker />
                  :
                  skillsShow ?
                    <SkillsPicker />
                    :
                    hashtagShow ? 
                      <HashtagPicker />
                      :
                      competitorShow ? 
                        <CompetitorPicker />
                        :
                        secondStepShow ?
                          <DareBackSecondStepBottomDrawer />
                          :
                          darBackshow ?
                            <DareBackFirstStep />
                            :
                            <></>
          }
          {/* {
            show ?
              <Authentication authStatus={authStatus}/>
              :
              creatDareshow ?
                  <CreateDare />
                  :
                  <></>
          } */}
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default BottomCommonDrawer;

const Body = styled.View`
  height: 100%;
`;