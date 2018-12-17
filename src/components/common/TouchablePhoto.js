import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

const photoMarginSize = 1;

const TouchablePhoto = props => {
  const { photo, width, height } = props;

  const onPressPhoto = () => Actions.photoDetail({ photo: photo });

  return (
    <TouchableOpacity onPress={onPressPhoto}>
      <Image
        key={photo.ID}
        style={{
          width: width - photoMarginSize * 2,
          height: height - photoMarginSize * 2,
          backgroundColor: "#EEEEEE",
          margin: photoMarginSize
        }}
        source={{ uri: photo.url }}
      />
    </TouchableOpacity>
  );
};

export default TouchablePhoto;
