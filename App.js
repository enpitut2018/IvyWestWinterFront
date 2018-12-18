import React, { Component } from "react";
import { AsyncStorage, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CameraIcon from "./src/components/parts/CameraIcon";
import AuthScreen from "./src/components/screens/AuthScreen";
import SigninScreen from "./src/components/screens/SigninScreen";
import SignupScreen from "./src/components/screens/SignupScreen";
import DownloadTimeLineScreen from "./src/components/screens/DownloadTimeLineScreen";
import DownloadPhotosScreen from "./src/components/screens/DownloadPhotosScreen";
import UploadPhotosScreen from "./src/components/screens/UploadPhotosScreen";
import PhotoDetailScreen from "./src/components/screens/PhotoDetailScreen";
import UserScreen from "./src/components/screens/UserScreen";
import { Router, Scene, Tabs } from "react-native-router-flux";
import { asyncStorageKeyPrefix } from "./src/libs/const";

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
              title="ダウンロード"
              renderRightButton={CameraIcon}
              tabBarLabel="ダウンロード"
              icon={() => <Icon size={20} name="download" color="#999" />}
            >
              <Tabs
                key="downloadTab"
                // TODO カラーの設定
                // activeBackgroundColor="#FF0000"
                // activeTintColor="#FF0000"
                // inactiveBackgroundColor="#00FF00"
                // inactiveTintColor="#00FF00"
                tabBarPosition="top"
                headerMode="none"
              >
                <Scene
                  key="downloadTimeLine"
                  initial={true}
                  tabBarLabel="タイムライン"
                  component={DownloadTimeLineScreen}
                />
                <Scene
                  key="downloadPhoto"
                  tabBarLabel="サムネイル"
                  component={DownloadPhotosScreen}
                />
              </Tabs>
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
                renderRightButton={CameraIcon}
              />
              {this.photoDetailScene()}
            </Scene>
            <Scene
              key="user"
              title="ユーザー情報"
              component={UserScreen}
              tabBarLabel="ユーザー"
              icon={() => <Icon size={20} name="user" color="#999" />}
              renderRightButton={CameraIcon}
            />
          </Tabs>
          <Scene key="auth" initial={this.state.isLogin == false}>
            <Scene key="authHome" component={AuthScreen} />
            <Scene key="signin" title="サインイン" component={SigninScreen} />
            <Scene key="signup" title="サインアップ" component={SignupScreen} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
