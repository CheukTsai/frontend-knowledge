class MinHeap {

    arr = [];

    constructor(inputArr=[]) {
        this.arr = inputArr;
        this.#heapify();
    }

    #heapify() {
        for (let i = Math.floor(this.arr.length / 2) - 1; i >= 0; i--) {
            this.#shiftDown(i);
        }
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    add(el) {
        this.arr.push(el);
        this.#shiftUp(this.arr.length - 1);
    }

    poll() {
        if (this.arr.length === 0) throw "Heap is empty";
        let ans = this.arr.shift();
        this.#swap(0, this.arr.length - 1);
        this.#shiftDown(0);
        return ans;
    }

    #shiftUp(u) {
        if (u === 0) return;
        let child = this.arr[u];
        let parentIdx = Math.floor((u - 1) / 2);
        let parent = this.arr[parentIdx];
        if (parent < child) return;
        this.#swap(u, parentIdx);
        this.#shiftUp(parentIdx);
    }

    #shiftDown(u) {
        let leftChildIdx = u * 2 + 1;
        let rightChildIdx = u * 2 + 2;

        let smallestChildIdx = u;
        if (leftChildIdx < this.arr.length && this.arr[leftChildIdx] < this.arr[smallestChildIdx]) {
            smallestChildIdx = leftChildIdx;
        }
        if (rightChildIdx < this.arr.length && this.arr[rightChildIdx] < this.arr[smallestChildIdx]) {
            smallestChildIdx = rightChildIdx;
        }

        if (smallestChildIdx === u) return;
        this.#swap(u, smallestChildIdx);
        this.#shiftDown(smallestChildIdx);
    }

    #swap(i, j) {
        let tmp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = tmp;
    }
}

const heap = new MinHeap();

heap.add(4);
heap.add(7);
heap.add(2);
heap.add(9);
console.log(heap.poll());
console.log(heap.poll());
console.log(heap.poll());
console.log(heap.poll());

