import React, { useState, useEffect } from 'react';

type Props = {
    answerList: string[][];
    answerWord: string;
    round: number;
}

export const wordTovec = (props: Props) => {
    let word:string = "";
    for(let i = 0;i < 5;i++){
        word += props.answerList[props.round-1][i];
    }

    return (
        <div className='wordTovec'>
            0%
        </div>
    )
}