import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import UserInfo from "../parts/UserInfo";
import PeopleAvatarArea from "../parts/PeopleAvatarArea";
import AutoHeightImage from "react-native-auto-height-image";
import { Actions } from "react-native-router-flux";

// 画面サイズを取得
const { width } = Dimensions.get("window");

const TimeLineCard = ({ photo }) => {
  const onPressTimeLineCard = () => Actions.photoDetail({ photo: photo });

  return (
    <TouchableOpacity
      style={{ marginBottom: 10 }}
      onPress={onPressTimeLineCard}
    >
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
    </TouchableOpacity>
  );
};

export default TimeLineCard;
