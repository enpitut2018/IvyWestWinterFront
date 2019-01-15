import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { Text } from "native-base";
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
        avatarURL={photo.uploader.avatar_url}
        userID={photo.uploader.id}
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
      {photo.downloaders ? (
        <PeopleList photoID={photo.id} people={photo.downloaders} />
      ) : (
        <Text>写っている人はいません</Text>
      )}
    </View>
  );
};

export default PhotoDetail;
