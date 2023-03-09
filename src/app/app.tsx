import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Answer } from './components/answer';
import { Keyboard } from './components/keyboard';

const App: React.FC<{ compiler: string, framework: string }> = (props) => {
    // 6*5の配列の初期化
    let initAnswerList: string[][] = new Array(6);
    for (let i=0; i<6; i++){
        // initAnswerList[i] = new Array(5).fill("A");
        initAnswerList[i] = new Array(5).fill("");
    }

    // 回答一覧
    // キーボードの文字入力により更新
    const [ answerList, setAnswerList ] = useState<string[][]>(initAnswerList);

    // 回答の判定を行うフラグ
    // キーボードのEnter入力により更新
    const [ judge, setJudge ] = useState<boolean>(false);

    console.log("- App Start -");
    console.log(judge);

    // 現在の状態
    // playing: ゲーム中
    // success: 成功
    // fail: 失敗
    const [ gameStatus, setGameStatus ] = useState<string>("playing");

    // 正解単語
    const [ answerWord, setAnswerWord ] = useState<string>("WORLD");

    return (
        <div className="App">

            <Answer 
                answerList={answerList}
                judge={judge}
                setJudge={setJudge}
                answerWord={answerWord}
                gameStatus={gameStatus}
                setGameStatus={setGameStatus}
            />
            <Keyboard 
                answerList={answerList} 
                setAnswerList={setAnswerList}
                setJudge={setJudge}
            />
        </div>
    );
}

ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);