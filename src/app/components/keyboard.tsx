import React, { useState } from "react";

type appProps = {
    answerList: string[][];
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
    rowcnt: number;
    setColumncnt: React.Dispatch<React.SetStateAction<number>>;
    columncnt: number;
    setRowcnt: React.Dispatch<React.SetStateAction<number>>;
    answerList: string[][];
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
    keyLayout: string[];
    outputList: string[];
    setOutputList: React.Dispatch<React.SetStateAction<string[]>>;
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeyboardRow = (props: Props) => {

    const updateAnswer = (output: string[]) => {
        let copyAnswer = Array.from(props.answerList);

        // outputを空文字埋め
        let tmpOutput = Array.from(output);
        for (let i=tmpOutput.length; i<=5; i++){
            tmpOutput.push("");
        }

        copyAnswer[props.rowcnt] = tmpOutput;
        props.setAnswerList(copyAnswer);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // let copyList: string[] = [...props.outputList, event.currentTarget.value];
        let copyList: string[] = [...props.outputList];
        const letter = event.currentTarget.value;

        // Enter入力
        // if (copyList.indexOf("Enter") !== -1 && copyList.length < 6) {
        if (letter === "Enter") {
            if (props.columncnt < 5){
                alert("文字数が足りません");
            }

            else {
                console.log("Enter");
                props.answerList[props.rowcnt] = props.outputList;
                let insertList: string[][] = [...props.answerList];
                props.setAnswerList(insertList);
                props.setOutputList(new Array(0));
                props.setJudge(true);
                props.setRowcnt(props.rowcnt+1);
                props.setColumncnt(0);
            }
        }
        // Delete入力
        // else if(copyList.indexOf("Delete") !== -1 ){
        else if(letter === "Delete"){
            if (props.columncnt > 0){
                console.log("Delete");
                copyList[props.columncnt-1] = ""
                props.setOutputList(copyList);
                updateAnswer(copyList);
                props.setColumncnt(props.columncnt-1);
            }
        } 
        // アルファベット入力
        // else if (copyList.length < 6) {
        else {
                if (props.columncnt < 5) {
                    console.log("Alphabet");
                    copyList[props.columncnt] = event.currentTarget.value
                    props.setOutputList(copyList);
                    updateAnswer(copyList);
                    props.setColumncnt(props.columncnt+1);
                }
        }

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
    const upKeyLayout: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const middleKeyLayout: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const downKeyLayout: string[] = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"];

    const initList: string[] = new Array(5).fill(" ");
    // const initList: string[] = new Array(0);
    const [outputList, setOutputList] = useState<string[]>(initList);

    const [rowcnt,setRowcnt] = useState(0);
    const [columncnt,setColumncnt] = useState(0);
    
    return (
        <div className="Keyboard">
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={upKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={middleKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={downKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
            setJudge={props.setJudge}
        />
        </div>
    );
};
