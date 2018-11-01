import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { createStackNavigator } from "react-navigation";
import Icon, { Button } from "react-native-vector-icons/FontAwesome";
import { RNCamera } from "react-native-camera";
import { baseURL } from "../../libs/const";

export default class CameraScreen extends Component {
  // App.jsでCameraScreenにヘッダーを追加するとヘッダーが2重になってしまうため暫定ここで定義
  // TODO 調査・修正
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "写真撮影"
  });

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
          permissionDialogMessage={
            "これによりアプリで写真を取ることができます。"
          }
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
      let body = { source: data.base64 };
      console.log(body);
      AsyncStorage.getItem("@IvyWest:token").then(token => {
        fetch(baseURL + "/uploads", {
          method: "POST",
          mode: "no-cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(json => {
            this.setState({ photos: json });
          })
          .catch(error => console.log(error));
      });
    }
  };
}

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
