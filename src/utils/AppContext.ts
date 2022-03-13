import {createContext} from "react";
import {WebSocketClient} from "./WebSocketClient";
import  {EventEmitter} from "./EventEmitter";

type AppContextType = {
    webSocketClient?: WebSocketClient;
    eventEmitterClient?: EventEmitter;
};
export const AppContext = createContext<AppContextType>({})
