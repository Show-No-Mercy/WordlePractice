import React, { useState } from "react";

type appProps = {
    answerList: string[][];
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
};

type Props = {
    rowcnt: number;
    setRowcnt: React.Dispatch<React.SetStateAction<number>>;
    answerList: string[][];
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
    keyLayout: string[];
    outputList: string[];
    setOutputList: React.Dispatch<React.SetStateAction<string[]>>;
};

const KeyboardRow = (props: Props) => {
    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let copyList = [...props.outputList, event.target.value];
        if (copyList.indexOf("Enter") !== -1 && copyList.length < 6) {
            alert("文字数が足りません");
        }
        else if(copyList.indexOf("Delete") !== -1){
            if(copyList.length == 1){
                copyList.splice(copyList.length-1,1);
            }
            else{
                copyList.splice(copyList.length-2,2);
            }
            props.setOutputList(copyList);
        } 
        else if (copyList.length < 6) {
            props.setOutputList(copyList);
        } else if (copyList.indexOf("Enter") !== -1 && copyList.length === 6) {
            props.answerList[props.rowcnt] = props.outputList;
            let insertList: string[][] = [...props.answerList];
            props.setAnswerList(insertList);
            props.setOutputList(new Array(0));
            props.setRowcnt(props.rowcnt+1);
            console.log(props.answerList);
        }
        else if (copyList.length >= 6) {
            alert("入力できるのは5文字までです。");
        }
        else{
            alert("error");
        }
        console.log(copyList);
    };

    // キーボードのCSSスタイル
    const keyboardStyle: React.CSSProperties = {
        borderSpacing: "6px 6px",
        display: "flex",
        justifyContent: "center"
    };

    // ボタンのCSSスタイル
    const buttonStyle: React.CSSProperties = {
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
    const upKeyLayout = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const middleKeyLayout = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const downKeyLayout = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"];

    const initList = new Array(0);
    const [outputList, setOutputList] = useState<string[]>(initList);

    const [rowcnt,setRowcnt] = useState(0);
    
    return (
        <div className="Keyboard">
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={upKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={middleKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={downKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
        />
        </div>
    );
};
