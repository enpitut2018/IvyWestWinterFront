import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import UserInfo from "../parts/UserInfo";
import PeopleAvatarArea from "../parts/PeopleAvatarArea";
import AutoHeightImage from "react-native-auto-height-image";

// 画面サイズを取得
const { width } = Dimensions.get("window");

const TimeLineCard = ({ photo }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <UserInfo
        avatarURL="https:/s3-ap-northeast-1.amazonaws.com/ivy-west-winter/user-face-photos/bfn7ucj3spn4isqqr1bg.jpg"
        userID="guri3"
        // TODO きちんとしたデータに差し替える
      />
      <AutoHeightImage width={width} source={{ uri: photo.url }} />
      <PeopleAvatarArea
        photoID={photo.id}
        people={"test"}
        // TODO きちんとしたデータに差し替える
      />
    </View>
  );
};

export default TimeLineCard;
