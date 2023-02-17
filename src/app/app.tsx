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

    return (
        <div className="App">
            <Answer answerList={answerList}/>
            <Keyboard answerList={answerList} setAnswerList={setAnswerList} />
        </div>
    );
}

ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);