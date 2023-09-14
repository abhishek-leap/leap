import React, {useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as Sentry from '@sentry/browser';
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
import SearchScreen from './shared/screens/search';
// import DemoScreen from './shared/screens/demo';
import DareCenterScreen from './shared/screens/dareCenter';
import ProfileTab from './shared/components/profile';
import {storage} from './shared/mmkv-store/store';
import createDare from './shared/screens/createDare';
import PlayerProfile from './shared/screens/playerProfile';
import AuthenticationDrawer from './shared/components/drawers/authentication';
import SplashDrawer from './shared/components/drawers/splash';
import CreateDareDrawer from './shared/components/drawers/createDareDrawer';
import ProgressBar from './shared/components/common/progressBar';
import BottomCommonDrawer from './shared/components/drawers/bottomCommonDrawer';
import Toaster from './shared/components/common/toaster';
import Notification from './shared/screens/notification';
import SkillAndHashtag from './shared/screens/skillAndHashtag';
import DarePreviewScreen from './shared/screens/darePreview';
import DareVideoScreen from './shared/screens/dareVideo';
import DareResultScreen from './shared/screens/dareResult';
import {BOTTOM_BAR_HEIGHT} from './shared/constants';
import {configureFcm} from './shared/utils/messaging';

const Tab = createMaterialTopTabNavigator(); //createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#290C54', //rgb(41,12,84)
    secondary: '#ff00ac', //rgb(255,0,172)
    PLAYLEAP_DARK_BLUE: '#371270', //rgb(55, 18, 112);
    PLAYLEAP_BLUE: '#1b0d3d', ////rgb(27, 13, 61)
    PLAYLEAP_WHITE: '#FFFFFF',
    PLAYLEAP_OFF_WHITE: 'rgba(255, 255, 255, 0.6)',
    PLAYLEAP_GREY: '#323232',
    PLAYLEAP_LIGHT_GREY: '#848484',
    PLAYLEAP_SILVER: '#a0b5c7',
    PLAYLEAP_DARK_PINK: 'rgba(153, 0, 217, 0.5)',
    PLAYLEAP_PINK: '#9900d9',
    PLAYLEAP_PROGRESS_BG_COLOR: '#4f0e6c',
    PLAYLEAP_PROGRESS_COLOR: '#f400b0',
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

  // register mmkv flipper plugin
  initializeMMKVFlipper({default: storage});
} else {
  Sentry.init({
    dsn: 'https://c7bc7dd56e84489eba5f5d7a463a88dd@o4504874966843392.ingest.sentry.io/4504874979557376',
    autoSessionTracking: true,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
}

const App = () => {
  const onAppStateChange = status => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  const Home = () => {
    console.log('Home');
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: BOTTOM_BAR_HEIGHT,
            backgroundColor: AppTheme.colors.primary,
          },
          tabBarShowLabel: false,
          lazy: true,
        }}
        tabBarPosition="bottom">
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({focused}) => {
              if (focused) {
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
        <Tab.Screen
          name="Create Dare"
          component={createDare}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              const {progressStatus, progressBarShow} = useSelector(
                state => state.createDare,
              );
              return (
                <ProgressBar
                  percent={progressStatus}
                  progressBarShow={progressBarShow}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Dare Center"
          component={DareCenterScreen}
          options={{
            tabBarIcon: ({focused}) => {
              if (focused) {
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
          component={ProfileTab}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              if (focused) {
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
    );
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    configureFcm();
    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SkillAndHashtag"
            component={SkillAndHashtag}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="SignInUp"
            component={SignInUp}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="PlayerProfile"
            component={PlayerProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DarePreview"
            component={DarePreviewScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DareVideo"
            component={DareVideoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DareResult"
            component={DareResultScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        <SplashDrawer />
        <AuthenticationDrawer />
        <CreateDareDrawer />
        <BottomCommonDrawer />
        <Toaster />
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
  padding-bottom: 8px;
  border-color: white;
`;
