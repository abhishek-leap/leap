import * as React from 'react';
import {AppState, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Provider} from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from '@tanstack/react-query';
import styled from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';

import {store} from './shared/redux-ui-state/store';
import HomeIcon from './shared/images/home-icon.svg';
import SearchIcon from './shared/images/search-icon.svg';
import DareCenterIcon from './shared/images/dare-center-icon.svg';
import ProfileIcon from './shared/images/profile-icon.svg';
import HomeIconFilled from './shared/images/home-icon-filled.svg';
import SearchIconFilled from './shared/images/search-icon-filled.svg';
import DareCenterIconFilled from './shared/images/dare-center-filled.svg';
import ProfileIconFilled from './shared/images/profile-icon-filled.svg';
import FeedScreen from './shared/screens/feed';
import RealScreen from './shared/screens/reel';
import SearchScreen from './shared/screens/search';
import Header from './shared/components/header';
// import DemoScreen from './shared/screens/demo';
import DareCenterScreen from './shared/screens/dareCenter';
import ProfileScreen from './shared/screens/profile';
import {storage} from './shared/mmkv-store/store';
import createDare from './shared/screens/createDare';
import { SignInUp } from './shared/components/authentication';
import AuthenticationDrawer from './shared/components/drawers/authentication';
import GenderDrawer from './shared/components/drawers/gender-drawer';
import CountryDrawer from './shared/components/drawers/country-drawer';
import CreateDareDrawer from './shared/components/drawers/create-dare-drawer';
import { getData, isUserMinor } from './shared/utils/helper';
import SkillsDrawer from './shared/components/drawers/skills-drawer';
import HashtagsDrawer from './shared/components/drawers/hashtag-drawer';
import SportsDrawer from './shared/components/drawers/sports-drawer';
import CompetitorDrawer from './shared/components/drawers/competitor-drawer';
import ProgressBar from './shared/components/common/progressBar';
import Toaster from './shared/components/common/toaster';
import DareBackDrawer from './shared/components/drawers/dare-back-drawer';
import DareBackSecondStepDrawer from './shared/components/drawers/dare-back-second-step-drawer';
import { useInfiniteFeeds } from './shared/hooks/useInfiniteFeeds';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#290C54', //rgb(41,12,84)
    secondary: '#ff00ac', //rgb(255,0,172)
    PLAYLEAP_DARK_BLUE: '#371270', //rgb(55, 18, 112);
    PLAYLEAP_WHITE: '#FFFFFF',
    PLAYLEAP_OFF_WHITE: 'rgba(255, 255, 255, 0.6)',
    PLAYLEAP_GREY: '#323232',
    PLAYLEAP_LIGHT_GREY: '#848484',
    PLAYLEAP_SILVER: '#a0b5c7',
    PLAYLEAP_DARK_PINK: 'rgba(153, 0, 217, 0.5)',
    PLAYLEAP_PINK: '#9900d9',
  },
};

// Event Listner for checking network online/offline status
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

// Create a client
const queryClient = new QueryClient();

// Devtool plugin for Flipper
if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });

  // console.log("Fliper storage ", storage);
  // register mmkv flipper plugin
  initializeMMKVFlipper({default: storage});
}

const App = () => {
  let CreateStatus = true;
  // updateTabBar();

  const updateTabBar = () => {
    let date = getData('user_dob');
    if(date !== undefined && !isUserMinor(date)) {
      CreateStatus = false;
    } else if (date) {
      CreateStatus = true;
    } else {
      CreateStatus = true;
    }
  }

  function onAppStateChange(status) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
    
  }, []);

  function Home() {
    return (
      <Tab.Navigator
        screenOptions={{
          header: Header,
          tabBarStyle: {
            backgroundColor: AppTheme.colors.primary,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({focused}) => {
              if (focused) {
                updateTabBar();
                return (
                  <IconContainer>
                    <HomeIconFilled />
                  </IconContainer>
                );
              }
              return <HomeIcon />;
            },
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              if (focused) {
                updateTabBar();
                return (
                  <IconContainer>
                    <SearchIconFilled />
                  </IconContainer>
                );
              }
              return <SearchIcon />;
            },
          }}
        />
        {CreateStatus &&
          <Tab.Screen
            name="Create Dare"
            component={createDare}
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({focused}) => {
                const { progressStatus, progressBarShow } = useSelector(state => state.createDare);
                return <ProgressBar percent={progressStatus} progressBarShow={progressBarShow} />;
              },
            }}
          />
        }
        <Tab.Screen
          name="Dare Center"
          component={DareCenterScreen}
          options={{
            tabBarIcon: ({focused}) => {
              if (focused) {
                updateTabBar();
                return (
                  <IconContainer>
                    <DareCenterIconFilled />
                  </IconContainer>
                );
              }
              return <DareCenterIcon />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              if (focused) {
                updateTabBar();
                return (
                  <IconContainer>
                    <ProfileIconFilled />
                  </IconContainer>
                );
              }
              return <ProfileIcon />;
            },
          }}
        />
      </Tab.Navigator>
    )
  }
  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignInUp"
              component={SignInUp}
              options={{ headerShown: false }}
            />
        </Stack.Navigator>
        
        <AuthenticationDrawer />
        <DareBackDrawer />
        <DareBackSecondStepDrawer />
        <GenderDrawer />
        <CountryDrawer />
        <CreateDareDrawer />
        <SportsDrawer />
        <SkillsDrawer />
        <HashtagsDrawer />
        <CompetitorDrawer />
      </NavigationContainer>
    </Provider>
  );
};

const AppWithReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default AppWithReactQuery;

const IconContainer = styled.View`
  border-bottom-width: 2px;
  padding-vertical: 12px;
  padding-horizontal: 5px;
  border-color: white;
`;
