import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import DownloadPhotosScreen from "./src/components/DownloadPhotosScreen";
import CameraScreen from "./src/components/CameraScreen";
import UploadPhotosScreen from "./src/components/UploadPhotosScreen";

const MainTabNavigator = createBottomTabNavigator(
  {
    DownloadPhotos: {
      screen: DownloadPhotosScreen,
      navigationOptions: {
        title: "ダウンロード",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={20} name="download" color="#999" />
        )
      }
    },
    UploadPhotos: {
      screen: UploadPhotosScreen,
      navigationOptions: {
        title: "アップロード",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={20} name="upload" color="#999" />
        )
      }
    }
  },
  {
    initialRouteName: "DownloadPhotos"
  }
);

const CameraStackNavigator = createStackNavigator({
  Camera: { screen: CameraScreen }
});

export default createStackNavigator(
  {
    MainTabNavigator: { screen: MainTabNavigator },
    CameraStackNavigator: { screen: CameraStackNavigator }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: true,
      gestureDirection: "inverted" // @TODO invertedにすると動かない
    },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const width = layout.initWidth;

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0]
          }),
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-width, 0, width]
              })
            }
          ]
        };
      }
    })
  }
);
