import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import PeopleAvatarArea from "../parts/PeopleAvatarArea";
import AutoHeightImage from "react-native-auto-height-image";
import { createImageProgress } from "react-native-image-progress";
import * as Progress from "react-native-progress";
import UserInfo from "../parts/UserInfo";
import PeopleList from "../parts/PeopleList";

// 画面サイズを取得
const { width, height } = Dimensions.get("window");

const ImageWithProgress = createImageProgress(AutoHeightImage);

const PhotoDetail = ({ photo, photoWidth, photoHeight }) => {
  return (
    <View>
      <UserInfo
        avatarURL="http://jiyuubito21102.com/wp-content/uploads/2018/02/yosiokariho.jpg.pagespeed.ce.Shw1B9OFrq.jpg"
        userID="yoshioka"
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
      <PeopleList
        photoID={photo.id}
        people={"test"}
        // TODO きちんとしたデータに差し替える
      />
    </View>
  );
};

export default PhotoDetail;
