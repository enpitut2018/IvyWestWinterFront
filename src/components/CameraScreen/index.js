import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import { postFetchWithToken } from "../../models/fetchUtil";
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
            onPress={() => this.takePicture()}
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
      postFetchWithToken(baseURL + "/uploads", body)
        .then(json => {
          console.log(json);
        })
        .catch(error => {
          console.error(error);
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
