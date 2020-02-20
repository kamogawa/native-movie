import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import DetailScreen from "../screens/Detail";
import { headerStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigation,
      navigationOptions: {
      headerBackTitleVisible: false,
        headerShown: false
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
      headerBackTitleVisible: false,
        ...headerStyles
      }
    },
  },
  {
    headerMode: "screen"
  }
);

export default createAppContainer(MainNavigation);