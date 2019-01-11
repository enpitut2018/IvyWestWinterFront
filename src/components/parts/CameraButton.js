import React from "react";
import { TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { postFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// react-native-image-picker用オプション変数
const options = {
  mediaType: "photo",
  quality: "0.5",
  storageOptions: {
    skipBackup: true, // iCloudのバックアップをしない
    path: "ivy-west-winter", // 画像を保存するフォルダ名
    cameraRoll: true // 本体のカメラロールに画像を保存する
  }
};

// classで実装するとなぜかアイコンが表示されなくなるため、関数として実装した
const CameraButton = () => (
  <TouchableOpacity
    onPress={() => {
      ImagePicker.launchCamera(options, response => {
        console.log("Response = ", response);

        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          const data = response.data;
          let body = { source: data };
          postFetchWithToken(baseURL + "/uploads", body)
            .then(json => {
              console.log(json);
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    }}
    style={{
      width: 76,
      height: 76,
      borderRadius: 38,
      borderWidth: 4,
      borderColor: "#4c91ff",
      backgroundColor: "white",
      position: "absolute",
      right: 12,
      bottom: 9
    }}
  >
    <Icon
      style={{ position: "absolute", top: 19, left: 18 }}
      size={30}
      name="camera"
      color="#4c91ff"
    />
  </TouchableOpacity>
);

export default CameraButton;
