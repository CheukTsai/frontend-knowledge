function kLargest(arr, k) {
    return quickSelect(arr, 0, arr.length - 1, k);
}

function quickSelect(arr, start, end, k) {
    if (start >= end) return arr[start];
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

    if (start + k - 1 <= j) {
        return quickSelect(arr, start, j, k);
    }

    if (start + k - 1 >= i) {
        return quickSelect(arr, i, end, k - (i - start));
    }

    return arr[j + 1];
}

console.log(kLargest([2,7,5,4,3,8], 4))