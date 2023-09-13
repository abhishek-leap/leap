import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

if (module.hot) {
  module.hot.accept();
}

// Register the main component with AppRegistry
AppRegistry.registerComponent(appName, () => App);

// Run the app on the web
if (window.document) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
}
