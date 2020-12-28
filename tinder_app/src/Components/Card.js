import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";

const Card = () => {
  const alreadySwiped = []; // スワイプしたカードをいれる配列

  const [characters, setCharacters] = useState([]); // ユーザーデータを管理
  const [lastDirection, setLastDirection] = useState([]); // スワイプした方向を管理
  let charactersState = characters; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

  // json-serverからユーザーデータ取得
  useEffect(() => {
    const url = "http://localhost:3000/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  // 引数に作成用関数とそれが依存する配列を渡す
  const childRefs = useMemo(
    () =>
      Array(characters.length)
        .fill(0)
        .map((i) => React.createRef()),
    [alreadySwiped]
  );

  // カードがスワイプされる時の関数　引数はスワイプ方向と消すカードの名前
  const swiped = (direction, nameToDelete) => {
    // console.log(nameToDelete + "が消されました");
    setLastDirection(direction); // スワイプされた方向を格納;
    alreadySwiped.push(nameToDelete); // alreadySwipedにスワイプされた名前を代入;
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
    const cardsLeft = characters.filter(
      (person) => !alreadySwiped.includes(person.name)
    );

    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = characters
        .map((person) => person.name)
        .indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadySwiped.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
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
        {characters.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.image + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
              <p>{character.age}</p>
            </div>
          </TinderCard>
        ))}
        {/* 全てのカードが仕分けできた時 */}
        {characters.length === 0 ? (
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
          {/* {lastDirection}しました！ */}
        </h2>
      ) : (
        <h2 className="infoText">Swipe the Card or Click Button!</h2>
      )}
    </div>
  );
};

export default Card;
