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
        avatarURL="http://jiyuubito21102.com/wp-content/uploads/2018/02/yosiokariho.jpg.pagespeed.ce.Shw1B9OFrq.jpg"
        userID="yoshioka"
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
