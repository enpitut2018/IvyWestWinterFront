import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import UserInfo from "../parts/UserInfo";
import PeopleAvatarArea from "../parts/PeopleAvatarArea";
import AutoHeightImage from "react-native-auto-height-image";
import { createImageProgress } from "react-native-image-progress";
import * as Progress from "react-native-progress";

// 画面サイズを取得
const { width, height } = Dimensions.get("window");

const ImageWithProgress = createImageProgress(AutoHeightImage);

const PhotoDetail = ({ photo, photoWidth, photoHeight }) => {
  return (
    <View>
      <UserInfo
        avatarURL="https:/s3-ap-northeast-1.amazonaws.com/ivy-west-winter/user-face-photos/bfn7ucj3spn4isqqr1bg.jpg"
        userID="guri3"
        // TODO きちんとしたデータに差し替える
      />
      <ImageWithProgress
        style={{
          width: photoWidth * (width / photoWidth),
          height: photoHeight * (width / photoWidth)
        }}
        width={width}
        source={{ uri: photo.url }}
        indicator={Progress.Pie}
      />
      <PeopleAvatarArea
        photoID={photo.id}
        people={"test"}
        // TODO きちんとしたデータに差し替える
      />
    </View>
  );
};

export default PhotoDetail;
