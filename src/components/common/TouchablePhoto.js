import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

const TouchablePhoto = props => {
  const { photo, width, height } = props;

  const onPressPhoto = () => Actions.photoDetail({ photo: photo });

  return (
    <TouchableOpacity onPress={onPressPhoto}>
      <Image
        key={photo.ID}
        style={{ width: width, height: height }}
        source={{ uri: photo.Url }}
      />
    </TouchableOpacity>
  );
};

export default TouchablePhoto;
