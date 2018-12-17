import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { postFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// react-native-image-picker用オプション変数
const options = {
  mediaType: "photo",
  quality: "0.1", // TODO 検証をしやくするため、品質を落としている本番では0.5ほどに設定したい
  storageOptions: {
    skipBackup: true, // iCloudのバックアップをしない
    path: "ivy-west-winter", // 画像を保存するフォルダ名
    cameraRoll: true // 本体のカメラロールに画像を保存する
  }
};

// classで実装するとなぜかアイコンが表示されなくなるため、関数として実装した
const CameraIcon = () => (
  <Icon
    style={{ marginRight: 10 }}
    size={23}
    name="camera"
    color="#999"
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
  />
);

export default CameraIcon;
