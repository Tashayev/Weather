import MainPage from "./pages/MainPage.tsx";
import Header from "./components/Header.tsx";
import {WeatherProvider} from "./components/WeatherContext.tsx";

function App() {

  return (
      <WeatherProvider>
         <Header/>
         <MainPage/>
      </WeatherProvider>
  );
};

export default App;
