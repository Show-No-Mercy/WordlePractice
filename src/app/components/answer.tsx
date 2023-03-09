import React, { useState, useEffect } from 'react';

type Props = {
    answerList: string[][];
    judge: boolean;
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
    answerWord: string;
    gameStatus: string;
    setGameStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const Answer = (props: Props) => {
    console.log("- Answer start -");
    console.log(props.judge);

    // 回答のCSSスタイル
    const answerStyle: React.CSSProperties = {
        borderSpacing: '6px 6px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        marginTop: '100px',
    };

    /* td要素のCSSスタイル */
    // Whiteスタイル
    const whiteTdStyle: React.CSSProperties = {
        border: '2px solid rgb(217, 217, 217)',
        width: '60px',
        height: '70px',

        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '60px',

        // 文字色
        color: 'Black',  // 背景色Whiteの時のみ

        // 背景色
        backgroundColor: 'White',
    };

    // Blackスタイル
    let blackTdStyle = {...whiteTdStyle};
    blackTdStyle['color'] = 'White';
    blackTdStyle['backgroundColor'] = '3a3a3c';

    // Yellowスタイル
    let yellowTdStyle = {...whiteTdStyle};
    yellowTdStyle['color'] = 'White';
    yellowTdStyle['backgroundColor'] = 'b59f3b';

    // Greenスタイル
    let greenTdStyle = {...whiteTdStyle};
    greenTdStyle['color'] = 'White';
    greenTdStyle['backgroundColor'] = '538d4e';

    // ラウンド
    const [ round, setRound ] = useState<number>(0);

    // リストの初期化
    let initMatchList: string[][] = new Array(6);
    for (let i=0; i<6; i++){
        initMatchList[i] = new Array(5).fill("White");
    }

    // 回答欄のCSSリスト
    // White: 判定していない
    // Black: 文字も位置も無一致
    // Yellow: 文字のみ一致
    // Green: 文字も位置も一致
    const [ matchList, setMatchList ] = useState<string[][]>(initMatchList);

    // リストの初期化
    let initMatchStyleList: React.CSSProperties[][] = new Array(6);
    for (let i=0; i<6; i++){
        initMatchStyleList[i] = new Array(5).fill(whiteTdStyle);
    }

    // 回答欄のCSSリスト
    // White: 判定していない
    // Black: 文字も位置も無一致
    // Yellow: 文字のみ一致
    // Green: 文字も位置も一致
    const [ matchStyleList, setMatchStyleList ] = useState<React.CSSProperties[][]>(initMatchStyleList);

    // 単語一致判定
    const wordMatchJudgement = () => {
        // 一度ディープコピーする
        let tmpMatchStyleList = Array.from(matchStyleList);

        // 1文字ずつ判定
        for (let i=0; i<5; i++){

            // 文字が一致
            if (props.answerWord.indexOf(props.answerList[round-1][i]) !== -1){
                
                // 位置も一致(Green)
                if (props.answerList[round-1][i] === props.answerWord[i]){
                    tmpMatchStyleList[round-1][i] = greenTdStyle;
                }

                // 文字だけ一致(Yellow)
                else {
                    tmpMatchStyleList[round-1][i] = yellowTdStyle;
                }
            }

            // 文字も位置も一致していない(Black)
            else {
                tmpMatchStyleList[round-1][i] = blackTdStyle;
            }
        }

        return tmpMatchStyleList;
    }

    // クリア判定
    const clearJudgement = () => {

        // ワードを抽出
        let wordList = [];
        for (let j = 0; j < 5; j++) {
            wordList.push(props.answerList[round-1][j]);
        }
        const submitWord = wordList.join("");
        console.log(wordList);
        console.log(submitWord);

        if (submitWord == props.answerWord){
            alert("clear!!");
            return "success";
        }

        else if (round == 6) {
            alert("fail...");
            return "fail";
        }

        return "playing";
    }


    // Appコンポーネントのjudgeが変化した時に呼ばれる
    useEffect(() => {

        // Enterを押したら
        if (props.judge === true){
            // 一度フラグをおろす
            props.setJudge(false);
        }

        // フラグをおろしてからここへ
        else {
            // コンポーネント初期化時にここを通る
            if (round == 0){
                setRound(round+1); // ラウンドを1に
                return;
            }

            // ゲーム継続中なら
            if (props.gameStatus == "playing"){
                // 単語一致判定
                // const [tmpMatchList, tmpMatchStyleList] = wordMatchJudgement();

                const tmpMatchStyleList = wordMatchJudgement();

                // クリア判定
                const status = clearJudgement();

                // スタイル更新
                setMatchStyleList(tmpMatchStyleList);
                // ラウンド更新
                setRound(round+1);
            }
        }

    }, [props.judge]);
    
    /* テスト用 */
    const divStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center'
    }

    const buttonStyle: React.CSSProperties = {
        backgroundColor: '3a3a3c',
        borderRadius: '4px',
        border: 'none',
        width: '45px',
        height: '60px',

        fontSize: '13px',
        fontWeight: 'bold',
        color: 'White',

        cursor: 'pointer',
    }
    /*  */

    return (
        // mapにより回答table作成
        <div className="Answer">

            <table id="answer" style={answerStyle}>
                <tbody>
                    {props.answerList.map((answer, i) => (
                        <tr key={i}>
                            {answer.map((letter, j) => (
                                <td key={j} style={matchStyleList[i][j]}>{letter}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>            
    );
}