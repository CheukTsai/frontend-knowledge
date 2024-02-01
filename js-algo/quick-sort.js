function quickSort(arr) {
    quickSortAux(arr, 0, arr.length - 1);
    return arr
}

function quickSortAux(arr, start, end) {
    if (start >= end) return;
    let i = start, j = end;
    let pivot = arr[Math.floor((start + end) / 2)];
    while (i <= j) {
        while (i <= j && arr[i] > pivot) {
            i++;
        }
        while (i <= j && arr[j] < pivot) {
            j--;
        }
        if (i <= j) {
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }

    quickSortAux(arr, start, j);
    quickSortAux(arr, i, end);
}

console.log(quickSort([2,5,7,3,10,8,9,2]));