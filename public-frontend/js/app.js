import 'babel/polyfill';
import App from './components/app';
import AppRoute from './routes/appRoute';

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppRoute()}
  />,
  document.getElementById('root')
);

