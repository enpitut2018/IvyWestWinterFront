import { AsyncStorage } from "react-native";
import { asyncStorageKeyPrefix, baseURL } from "../libs/const";

export function signin(userId, pass) {
  const body = {
    userid: userId,
    password: pass
  };
  url = baseURL + "/signin";
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {
        // ログイン完了処理
        AsyncStorage.setItem(asyncStorageKeyPrefix + "token", json.token);
        resolve(json);
      })
      .catch(error => console.log(error));
  });
}

export function signup(userId, pass) {
  const body = {
    userid: userId,
    password: pass
  };
  url = baseURL + "/signup";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(json => {
      // サインアップ完了処理
      // TODO Tokenが返ってくるようになったらTokenを保存する
      AsyncStorage.setItem(asyncStorageKeyPrefix + "token", "");
    })
    .catch(error => console.log(error));
}
