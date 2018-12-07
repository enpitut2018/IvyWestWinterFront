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
        // TODO 以下、サーバサイドの表記揺れのため暫定的に三項演算子で処理
        source={{ uri: photo.url }}
        resizeMethod="resize"
      />
    </TouchableOpacity>
  );
};

export default TouchablePhoto;
