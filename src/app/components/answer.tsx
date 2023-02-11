import React, { useState, useEffect } from 'react';

type Props = {
    answerList: string[][];
    judge: boolean;
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
    // matchList: string[][];
    // setMatchList: React.Dispatch<React.SetStateAction<string[][]>>;
    answerWord: string;
}

export const Answer = (props: Props) => {

    // 回答のCSSスタイル
    const answerStyle: React.CSSProperties = {
        borderSpacing: '6px 6px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px'
    };

    /* td要素のCSSスタイル */
    // Whiteスタイル
    const whiteTdStyle: React.CSSProperties = {
        border: '2px solid rgb(217, 217, 217)',
        width: '60px',
        height: '60px',

        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '60px',

        // 文字色
        color: 'Black',  // 背景色Whiteの時のみ

        // 背景色
        backgroundColor: 'White',
    };

    console.log("loop??");

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
    const [ round, setRound ] = useState<number>(1);

    // リストの初期化
    let initMatchStyleList: React.CSSProperties[][] = new Array(6);
    for (let i=0; i<6; i++){
        // initMatchStyleList[i] = new Array(5).fill(whiteTdStyle);
        initMatchStyleList[i] = new Array(5).fill(greenTdStyle);
    }

    // 回答欄のCSSリスト
    // White: 判定していない
    // Black: 文字も位置も無一致
    // Yellow: 文字のみ一致
    // Green: 文字も位置も一致
    const [ matchStyleList, setMatchStyleList ] = useState<React.CSSProperties[][]>(initMatchStyleList);

    // 判定
    const judgement = () => {

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

        console.log(tmpMatchStyleList);

        // 反映
        setMatchStyleList(tmpMatchStyleList);
    }

    // Enterを押したら
    if (props.judge === true){
        // 判定
        judgement();
        props.setJudge(false);

        // ラウンドを増やす
        setRound(round+1);
    }

    // テスト用
    // useEffect(() => {
    //     props.setJudge(true);
    // }, []);

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