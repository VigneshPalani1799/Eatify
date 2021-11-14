import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyStack from "./Stacknavigation";
import { DrawerContent } from "./DrawerContent";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MyStack} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
