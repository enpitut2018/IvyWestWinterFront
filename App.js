import React, { Component } from "react";
import { AsyncStorage, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthScreen from "./src/components/screens/AuthScreen";
import SigninScreen from "./src/components/screens/SigninScreen";
import SignupScreen from "./src/components/screens/SignupScreen";
import DownloadPhotosScreen from "./src/components/screens/DownloadPhotosScreen";
import UploadPhotosScreen from "./src/components/screens/UploadPhotosScreen";
import PhotoDetailScreen from "./src/components/screens/PhotoDetailScreen";
import UserScreen from "./src/components/screens/UserScreen";
import CameraScreen from "./src/components/screens/CameraScreen";
import { Actions, Router, Scene, Tabs } from "react-native-router-flux";
import { asyncStorageKeyPrefix } from "./src/libs/const";

const cameraIcon = () => (
  <Icon
    style={{ marginRight: 10 }}
    size={23}
    name="camera"
    color="#999"
    onPress={() => Actions.camera()}
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(asyncStorageKeyPrefix + "token").then(token => {
      if (token !== null) {
        this.setState({ isLogin: true });
      }
    });
  }

  photoDetailScene = () => (
    <Scene key="photoDetail" title="写真詳細" component={PhotoDetailScreen} />
  );

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Tabs key="tab">
            <Scene
              key="downloads"
              initial={this.state.isLogin == true}
              tabBarLabel="ダウンロード"
              icon={() => <Icon size={20} name="download" color="#999" />}
            >
              <Scene
                key="downloadPhoto"
                initial={true}
                title="ダウンロード"
                component={DownloadPhotosScreen}
                renderRightButton={cameraIcon}
              />
              {this.photoDetailScene()}
            </Scene>
            <Scene
              key="uploads"
              tabBarLabel="アップロード"
              icon={() => <Icon size={20} name="upload" color="#999" />}
            >
              <Scene
                key="uploadPhoto"
                initial={true}
                title="アップロード"
                component={UploadPhotosScreen}
                tabBarLabel="アップロード"
                icon={() => <Icon size={20} name="upload" color="#999" />}
                renderRightButton={cameraIcon}
              />
              {this.photoDetailScene()}
            </Scene>
            <Scene
              key="user"
              title="ユーザー情報"
              component={UserScreen}
              tabBarLabel="ユーザー"
              icon={() => <Icon size={20} name="user" color="#999" />}
              renderRightButton={cameraIcon}
            />
          </Tabs>
          <Scene key="auth" initial={this.state.isLogin == false}>
            <Scene key="authHome" component={AuthScreen} />
            <Scene key="signin" title="サインイン" component={SigninScreen} />
            <Scene key="signup" title="サインアップ" component={SignupScreen} />
          </Scene>
          <Scene key="camera" component={CameraScreen} />
        </Scene>
      </Router>
    );
  }
}

export default App;
