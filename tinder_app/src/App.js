import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import "../src/App.css";

const App = () => {
  // 一番上の階層でuserDataを取得
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const url =
      "https://my-json-server.typicode.com/natsuya-kume/user_data/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <div className="app">
      <Card userData={userData} />
    </div>
  );
};
export default App;
