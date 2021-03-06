import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import CardContainer from "@material-ui/core/Card";
import Profile from "./Profile";

const alreadySwiped = []; // スワイプしたカードをいれる配列
const skip = []; // いいねしたカードをいれる配列
const favorite = []; // スキップしたカードをいれる配列
const Card = ({ userData }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [characters, setCharacters] = useState([]); // ユーザーデータを管理
  const [lastDirection, setLastDirection] = useState(); // スワイプ方向を管理

  let charactersState = userData; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

  // 引数に作成用関数とそれが依存する配列を渡す
  const childRefs = useMemo(
    () =>
      Array(userData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [charactersState]
  );

  // カードがスワイプされる時の関数　引数はスワイプ方向と消すカードの名前
  const swiped = (direction, nameToDelete, deleteInfo) => {
    console.log(nameToDelete + "が消されました");
    if (direction === "left" || direction === "right") {
      setLastDirection(direction); // スワイプされた方向を格納;
      alreadySwiped.push(nameToDelete); // alreadySwipedにスワイプされた名前を代入;
      if (direction === "left") {
        skip.push(deleteInfo);
      }
      if (direction === "right") {
        favorite.push(deleteInfo);
      }
    }
  };

  // カードが枠から出た時の関数
  const outOfFrame = (name) => {
    console.log(name + "が画面外に行きました！");

    // 枠から出たカード(削除されたカード)を除いた配列を新しく作成
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    // ↑で作成したものをsetCharactersに更新する
    setCharacters(charactersState);
  };

  // スワイプする時(ボタンが押された時)の関数　引数はスワイプする方向を受け取る
  const swipe = (dir) => {
    console.log(dir + "に移動するボタンを押しました！");
    // スワイプするときに、alreadySwipedに入っていなかった配列を取得
    const cardsLeft = userData.filter(
      (person) => !alreadySwiped.includes(person.name)
    );

    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // 削除するカードの名前を取得
      const index = userData.map((person) => person.name).indexOf(toBeRemoved); // 削除するカードの名前をみて、インデックスを取得
      alreadySwiped.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); //カードをスワイプする
      // // プロフ詳細を開いたままスワイプした時
      // if (expanded === true) {
      //   setExpanded(!expanded);
      // }
    }
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Tinder_app</h1>
      <div className="cardContainer">
        {userData.map((character, index) => (
          <CardContainer>
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, character)}
              onCardLeftScreen={() => outOfFrame(character.name)}
              preventSwipe="up,down"
            >
              <Profile
                expanded={expanded}
                handleExpandClick={handleExpandClick}
                character={character}
              />
            </TinderCard>
          </CardContainer>
        ))}
        {/* 全てのカードが仕分けできた時 */}
        {alreadySwiped.length >= userData.length ? (
          <div className="empty">
            <h3>empty!</h3>
          </div>
        ) : null}
      </div>
      <div className="buttons">
        <button onClick={() => swipe("left")}>スキップ</button>
        <button onClick={() => swipe("right")}>いいね!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">Swipe the Card or Click Button!</h2>
      )}
    </div>
  );
};

export default Card;
