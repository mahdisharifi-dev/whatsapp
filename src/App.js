import { Provider } from "react-redux";
import store from "./store/store";
import Whatsapp from "./Whatsapp";
import "./store/parse";
function App() {
    return (
        <Provider store={store}>
            <Whatsapp />
        </Provider>
    );
}

export default App;
