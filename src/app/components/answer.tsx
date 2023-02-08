import React from 'react';

type Props = {
    answerList: string[][];
}

export const Answer = (props: Props) => {

    // 回答のCSSスタイル
    const answerStyle: React.CSSProperties = {
        borderSpacing: '6px 6px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px'
    };

    // td要素のCSSスタイル
    const answerTdStyle: React.CSSProperties = {
        border: '2px solid rgb(217, 217, 217)',
        width: '60px',
        height: '60px',

        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '60px'
    };

    return (
        // mapにより回答table作成
        <div className="Answer">

            <table id="answer" style={answerStyle}>
                <tbody>
                    {props.answerList.map((answer, i) => (
                        <tr key={i}>
                            {answer.map((letter, j) => (
                                <td key={j} style={answerTdStyle}>{letter}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>            
    );
}