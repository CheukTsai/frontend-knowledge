function main(mat, dir) {
    if (dir === 'l') {
        mergeRows(mat);
    } else if (dir === 'r') {
        rotateLeft(mat);
        rotateLeft(mat);
        mergeRows(mat);
        rotateRight(mat);
        rotateRight(mat);
    } else if (dir == 'u') {
        rotateLeft(mat);
        mergeRows(mat);
        rotateRight(mat);
    } else if (dir == 'd') {
        rotateRight(mat);
        mergeRows(mat);
        rotateLeft(mat);
    }
}

function mergeRows(mat) {
    combine(mat);
    merge(mat);
    combine(mat);
}

function combine(mat) {
    for (let arr of mat) {
        let idx = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                let tmp = arr[i];
                arr[i] = 0;
                arr[idx++] = tmp;
            }
        }
    }
}

function merge(mat) {
    for (let arr of mat) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] != 0 && arr[i] === arr[i-1]) {
                arr[i - 1] *= 2;
                arr[i] = 0;
            }
        }
    }
}

function rotateLeft(mat) {
    const m = mat.length, n = mat[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = i; j < n; j++) {
            let tmp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = tmp;
        }
    }

    for (let i = 0; i < m / 2; i++) {
        let tmp = mat[i];
        mat[i] = mat[m - i - 1];
        mat[m - i - 1] = tmp;
    }
}

function rotateRight(mat) {
    const m = mat.length, n = mat[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = i; j < n; j++) {
            let tmp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = tmp;
        }
    }

    for (let i = 0; i < n / 2; i++) {
        for (let rows of mat) {
            let tmp = rows[i];
            rows[i] = rows[n - i - 1];
            rows[n - i - 1] = tmp;
        }
    }
}
const mat = [
    [0,0,2,2],
    [2,0,2,2],
    [0,0,2,2],
    [0,2,2,4],
]
for (let row of mat) {
    console.log(row);
}
console.log();
main(mat, 'd');
for (let row of mat) {
    console.log(row);
}