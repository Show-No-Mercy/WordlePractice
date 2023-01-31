import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC<{ compiler: string, framework: string }> = (props) => {
  const rowNOs = [0, 1, 2, 3, 4, 5];
  const columnNOs = [0, 1, 2, 3, 4];

  const upKeyBoards = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleKeyBoards = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const downKeyBoards = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"];

  const answerStyle: React.CSSProperties = {
    borderSpacing: '6px 6px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px'
  };

  const answerTdStyle: React.CSSProperties = {
    border: '2px solid rgb(217, 217, 217)',
    width: '60px',
    height: '60px',

    fontSize: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '60px'
  };

  const keyboardStyle: React.CSSProperties = {
    borderSpacing: '6px 6px',
    display: 'flex',
    justifyContent: 'center'
  }

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
    <div className="App">
      <table id="answer" style={answerStyle}>
        <tbody>
          {rowNOs.map((i) => (
            <tr key={i}>
              {columnNOs.map((j) => (
                <td key={j} style={answerTdStyle}>A</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <table id="keyboard-row" style={keyboardStyle}>
        <tbody>
          <tr>
            {upKeyBoards.map((key, i) => (
              <td id="alphabet-key" key={i}>
                <button onClick={() => alert(key)} style={buttonStyle}>{key}</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table id="keyboard-row" style={keyboardStyle}>
        <tbody>
          <tr>
            {middleKeyBoards.map((key, i) => (
              <td id="alphabet-key" key={i}>
                <button onClick={() => alert(key)} style={buttonStyle}>{key}</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table id="keyboard-row" style={keyboardStyle}>
        <tbody>
          <tr>
            {downKeyBoards.map((key, i) => (
              <td id="alphabet-key" key={i}>
                <button onClick={() => alert(key)} style={buttonStyle}>{key}</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.render(
  <App compiler="TypeScript" framework="React" />,
  document.getElementById("root")
);