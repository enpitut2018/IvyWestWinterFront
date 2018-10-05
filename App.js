import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import DownloadPhotosScreen from "./src/components/DownloadPhotosScreen";
import CameraScreen from "./src/components/CameraScreen";
import UploadPhotosScreen from "./src/components/UploadPhotosScreen";

export default createBottomTabNavigator(
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
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        title: "カメラ",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={20} name="camera" color="#999" />
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
