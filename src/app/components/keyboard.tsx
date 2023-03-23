import React, { useState } from "react";

type appProps = {
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
    rowcnt: number;
    setColumncnt: React.Dispatch<React.SetStateAction<number>>;
    columncnt: number;
    setRowcnt: React.Dispatch<React.SetStateAction<number>>;
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
    keyLayout: string[];
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeyboardRow = (props: Props) => {
    const updateAnswer = (prevState: string[][], letter: string, row: number, column: number) => {
        const tmpList = Array.from(prevState);
        tmpList[row][column] = letter;

        return tmpList;
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const letter = event.currentTarget.value;

        // Enter入力
        if (letter == "Enter") {
            // 文字数不足
            if (props.columncnt < 5){
                alert("文字数が足りません");
            }

            // 5文字入力した状態
            else {
                // フラグ送信（正解判定の依頼）
                props.setJudge(true);

                // 列数リセット
                props.setColumncnt(0);

                // 次の行へ移行
                props.setRowcnt((prev) => prev+1);
            }
        }

        // Delete入力
        else if(letter == "Delete"){
            // 1文字以上入力
            if(props.columncnt > 0){
                props.setAnswerList((prevState) => updateAnswer(prevState, "", props.rowcnt, props.columncnt-1));
                props.setColumncnt((prev) => prev-1);
            }       
        } 

        // アルファベット入力
        else if (props.columncnt < 5) {
            if(letter != ""){
                props.setAnswerList((prevState) => updateAnswer(prevState, letter, props.rowcnt, props.columncnt));
                props.setColumncnt((prev) => prev+1);
            }
        }
    };

    // キーボードのCSSスタイル
    const keyboardStyle: React.CSSProperties = {
        borderSpacing: "3px 3px",
        display: "flex",
        justifyContent: "center"
    };

    // ボタンのCSSスタイル
    const buttonStyle: React.CSSProperties = {
        backgroundColor: "rgb(217, 217, 217)",
        borderRadius: "4px",
        border: "none",
        width: "30px",
        height: "30px",

        fontSize: "13px",
        fontWeight: "bold",
        cursor: "pointer"
    };

    const buttonStyleKeys: React.CSSProperties = {
        backgroundColor: "rgb(217, 217, 217)",
        borderRadius: "4px",
        border: "none",
        width: "45px",
        height: "60px",

        fontSize: "13px",
        fontWeight: "bold",
        cursor: "pointer"
    };

    return (
        // mapによりキーボードtable作成
        <table id="keyboard-row" style={keyboardStyle}>
        <tbody>
            <tr>
            {props.keyLayout.map((key, i) => (
                <td id="alphabet-key" key={i}>
                {/* ボタン */}
                <button value={key} onClick={handleClick} style={buttonStyle}>
                    {key}
                </button>
                </td>
            ))}
            </tr>
        </tbody>
        </table>
    );
};


export const Keyboard = (props: appProps) => {
    const keyboardListRow1: string[] = ["わ", "ら", "や", "ま", "は", "な", "た", "さ", "か", "あ","Delete"];
    const keyboardListRow2: string[] = ["を", "り", "", "み", "ひ", "に", "ち", "し", "き", "い",""];
    const keyboardListRow3: string[] = ["ん", "る", "ゆ", "む", "ふ", "ぬ", "つ", "す", "く", "う",""];
    const keyboardListRow4: string[] = ["", "れ", "", "め", "へ", "ね", "て", "せ", "け", "え",""];
    const keyboardListRow5: string[] = ["ー", "ろ", "よ", "も", "ほ", "の", "と", "そ", "こ", "お","Enter"];

    const [rowcnt,setRowcnt] = useState(0);
    const [columncnt,setColumncnt] = useState(0);
    
    return (
        <div className="Keyboard">
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            setAnswerList={props.setAnswerList}
            keyLayout={keyboardListRow1}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            setAnswerList={props.setAnswerList}
            keyLayout={keyboardListRow2}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            setAnswerList={props.setAnswerList}
            keyLayout={keyboardListRow3}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            setAnswerList={props.setAnswerList}
            keyLayout={keyboardListRow4}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            setAnswerList={props.setAnswerList}
            keyLayout={keyboardListRow5}
            setJudge={props.setJudge}
        />
        </div>
    );
};