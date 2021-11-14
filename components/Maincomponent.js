import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./navigation/Drawernavigation";

function Main() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default Main;
