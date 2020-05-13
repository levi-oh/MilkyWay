import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Dimensions } from "react-native";
import HomeScreen from "./screens/HomeScreen";

//获取屏幕宽高
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

//redux中初始状态值
const initialState = {
  text: "Milky Way",
  fontSize: 80,
  fontWeight: "bold",
  textWidth: 900,
  textSpeed: 0.2,
  durationTime: 2000,
};
//状态包装器,把状态打包
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "UPDATE_FONT":
      return {
        ...state,
        fontSize: action.fontSize,
        fontWeight: action.fontWeight,
      };
    case "UPDATE_SPEED":
      return {
        ...state,
        textSpeed: action.textSpeed,
        durationTime: (screenWidth + state.textWidth) / action.textSpeed,
      };
    case "UPDATE_WIDTH":
      return {
        ...state,
        textWidth: action.textWidth,
        durationTime: (screenWidth + action.textWidth) / state.textSpeed,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;
