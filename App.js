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
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {store} from './shared/redux-ui-state/store';
import HomeIcon from './shared/images/home-icon.svg';
import SearchIcon from './shared/images/search-icon.svg';
import DareCenterIcon from './shared/images/dare-center-icon.svg';
import CreateDareIcon from './shared/images/create-dare.svg';
import ProfileIcon from './shared/images/profile-icon.svg';
import HomeIconFilled from './shared/images/home-icon-filled.svg';
import SearchIconFilled from './shared/images/search-icon-filled.svg';
import DareCenterIconFilled from './shared/images/dare-center-filled.svg';
import ProfileIconFilled from './shared/images/profile-icon-filled.svg';
import FeedScreen from './shared/screens/feed';
import SearchScreen from './shared/screens/search';
import Header from './shared/components/header';
import BottomDrawer from './shared/components/bottom-drawer';

const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#290C54',
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
}

const App = () => {
  function onAppStateChange(status) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
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
            component={SearchScreen}
            options={{
              tabBarIcon: ({focused}) => {
                return <CreateDareIcon style={{marginBottom: 4}} />;
              },
            }}
          />
          <Tab.Screen
            name="Dare Center"
            component={SearchScreen}
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
            component={SearchScreen}
            options={{
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
      </NavigationContainer>
      <BottomDrawer />
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
