import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { RNCamera } from "react-native-camera";

class CameraScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"カメラへのアクセスを求めています"}
          permissionDialogMessage={""}
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Icon size={20} name="camera" color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      let json = { data: data };
      // @TODO APIとの接続を行う
      // fetch("/photo", {
      //   method: "POST",
      //   mode: "no-cors", // @TODO これで良いか要検証
      //   credentials: "include"
      // })
      //   .then(response => response.json())
      //   .then(json => {
      //     // @TODO レスポンスによって処理を行う
      //     console.log(json);
      //   })
      //   .catch(error => console.log(error));
    }
  };
}
CameraScreen.navigationOptions = {
  title: "カメラ"
};

export default createStackNavigator(
  {
    Camera: { screen: CameraScreen }
  },
  {
    initialRouteName: "Camera"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
