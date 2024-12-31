// src/App.tsx
import { Provider } from 'react-redux';
import store from './store';
import BarChart from './components/BarChart';

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ width: '100%' }}>
        <BarChart />
      </div>
    </Provider>
  );
};

export default App;
