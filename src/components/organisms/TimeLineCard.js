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
        avatarURL={photo.uploader.avatar_url}
        userID={photo.uploader.id}
      />
      <AutoHeightImage width={width} source={{ uri: photo.url }} />
      <PeopleAvatarArea photoID={photo.id} people={photo.downloaders} />
    </TouchableOpacity>
  );
};

export default TimeLineCard;
