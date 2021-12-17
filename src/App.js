import { Provider } from "react-redux";
import store from "./store/store";
import Whatsapp from "./Whatsapp";
function App() {
    return (
        <Provider store={store}>
            <Whatsapp />
        </Provider>
    );
}

export default App;
