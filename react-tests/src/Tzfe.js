import {useState, useEffect} from 'react'
import "./Tzfe.css"

function Tile({uid, val}) {
    return (
        <div className={`boxT box${val}`} key={uid}>
            {val == 0 ? "": val}
        </div>
    )
}

function Board({board}) {
    let mat = [];
    
    for (let i = 0; i < board.length; i++) {
        let arr = [], curArr = board[i];
        for (let j = 0; j < curArr.length; j++) {
            arr.push((<Tile key={i * curArr.length + j} val={board[i][j]}/>))
        }
        
        let pushedArr = (
            <div className='rowT' key={i}>
                {arr}
            </div>
        )
        mat.push(pushedArr);
    }
    return (
    <div className='boardT'>
        {mat}
    </div>)
}

export default function Tzfe() {
    const [board, setBoard] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])

    useEffect(() => {
        function handleKeyDown(event) {
            let keyCode = event.keyCode;
            if (keyCode === 37) {
                randomGenerate(moveLeft(board));
            } else if (keyCode === 38) {
                randomGenerate(moveUp(board));
            } else if (keyCode === 39) {
                randomGenerate(moveRight(board));
            } else if (keyCode === 40) {
                randomGenerate(moveDown(board));
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [board]);
    
    function checkEmpty(b) {
        let arr = [];
        for (let i = 0; i < b.length; i++) {
            for (let j = 0; j < b[0].length; j++) {
                if (b[i][j] == 0) {
                    arr.push([i, j]);
                }
            }
        }
        if (arr.length === 0) return [];
        let idx = Math.floor(Math.random() * arr.length)
        return arr[idx];
    }

    function randomGenerate(b) {
        let pos = checkEmpty(b);
        if (pos.length === 0) return;
        let mat = [];
        for (let i = 0; i < b.length; i++) {
            let row = [];
            for (let j = 0; j < b[i].length; j++) {
                if (i === pos[0] && j === pos[1]) {
                    row.push(2);
                } else {
                    row.push(b[i][j]);
                }
            }
            mat.push(row);
        }
        setBoard(mat);
    }

    return (
        <div className='containerT'>
            <Board board={board}></Board>
        </div>)

    function moveLeft(b) {
        let mat = [];
        for (let i = 0; i < b.length; i++) {
            let curRow = b[i], row = [], output = [];
            for (let j = 0; j < curRow.length; j++) {
                if (curRow[j] != 0) {
                    row.push(curRow[j]);
                } 
            }
            for (let j = 1; j < row.length; j++) {
                if (row[j] != 0 && row[j] == row[j - 1]) {
                    row[j - 1] = 2 * row[j];
                    row[j] = 0;
                }
            }
            for (let j = 0; j < row.length; j++) {
                if (row[j] != 0) output.push(row[j]);
            }
            for (let j = output.length; j < curRow.length; j++) {
                output.push(0);
            }
            mat.push(output);
            
        }
        return mat;
    }
    
    function moveRight(b) {
        let mat = [];
        for (let i = 0; i < b.length; i++) {
            let curRow = b[i], row = [], output = [];
            for (let j = curRow.length - 1; j >= 0; j--) {
                if (curRow[j] != 0) {
                    row.push(curRow[j]);
                } 
            }

            for (let j = row.length - 2; j >= 0; j--) {
                if (row[j] != 0 && row[j] == row[j + 1]) {
                    row[j + 1] = 2 * row[j];
                    row[j] = 0;
                }
            }
            for (let j = 0; j < row.length; j++) {
                if (row[j] != 0) output.unshift(row[j]);
            }
            for (let j = output.length; j < curRow.length; j++) {
                output.unshift(0);
            }
            mat.push(output);
        }
        return mat;
    }
    
    function moveUp(b) {
        let mat = rotateLeft(b);
        mat = moveLeft(mat);
        mat = rotateRight(mat);
        return mat;
    }

    function moveDown(b) {
        let mat = rotateLeft(b);
        mat = moveRight(mat);
        mat = rotateRight(mat);
        return mat;
    }

    function rotateRight(b) {
        let n = b[0].length;
        for (let i = 0; i < b.length; i++) {
            for (let j = i; j < b[0].length; j++) {
              let tmp = b[i][j];
              b[i][j] = b[j][i];
              b[j][i] = tmp;
            }
          }
        
        for(let i = 0; i < Math.floor(b[0].length / 2); i++) {
            for(let row of b) {
                let tmp = row[i];
                row[i] = row[n - i - 1];
                row[n - i - 1] = tmp;
            }
        }
        
        return b;
    }

    function rotateLeft(b) {
        let n = b.length;
        for (let i = 0; i < b.length; i++) {
            for (let j = i; j < b[0].length; j++) {
              let tmp = b[i][j];
              b[i][j] = b[j][i];
              b[j][i] = tmp;
            }
          }
        
        for (let i = 0; i < Math.floor(b.length / 2); i++) {
            let row = b[i];
            b[i] = b[n - i - 1];
            b[n - i - 1] = row;
        }
        
        return b;
    }
      
}