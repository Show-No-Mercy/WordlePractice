import React from 'react';

type Props = {
    keyLayout: string[]
}

const KeyboardRow = (props: Props) => {

    // キーボードのCSSスタイル
    const keyboardStyle: React.CSSProperties = {
        borderSpacing: '6px 6px',
        display: 'flex',
        justifyContent: 'center'
    }

    // ボタンのCSSスタイル
    const buttonStyle: React.CSSProperties = {
        backgroundColor: 'rgb(217, 217, 217)',
        borderRadius: '4px',
        border: 'none',
        width: '45px',
        height: '60px',

        fontSize: '13px',
        fontWeight: 'bold',
        cursor: 'pointer'
    }

    return (
        // mapによりキーボードtable作成
        <table id="keyboard-row" style={keyboardStyle}>
            <tbody>
            <tr>
                {props.keyLayout.map((key, i) => (
                    <td id="alphabet-key" key={i}>
                        {/* ボタン */}
                        <button onClick={() => alert(key)} style={buttonStyle}>{key}</button>
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );

}

export const Keyboard = () => {
    const upKeyLayout = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const middleKeyLayout = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const downKeyLayout = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"];

    return (
        <div className="Keyboard">
            <KeyboardRow keyLayout={upKeyLayout}/>
            <KeyboardRow keyLayout={middleKeyLayout}/>
            <KeyboardRow keyLayout={downKeyLayout}/>
        </div>
    );
}