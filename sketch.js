//sketch.js
let values = [];
let quickStack = [];
let mergeWidth = 1;
let mergeIndex = 0;
const NUM_BARS = 100;
let i = 0;
let j = 0;
let sorting = false;
let sortingStep = bubbleSortStep;
let speedSlider;
let pivotIndex = -1;
let descriptionDiv;


function createRandomArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(random(height));
    }
    return arr;
}

function setup() {
    createCanvas(800, 400); //Setting up screen
    let resetButton = createButton('Reset');
    resetButton.mousePressed(() => {
        values = createRandomArray(NUM_BARS);
        i = 0;
        j = 0;
        sorting = false;
        mergeWidth = 1;
        mergeIndex = 0;

    });
    let bubbleButton = createButton('Bubble Sort');
    bubbleButton.mousePressed(() => {
        i = 0;
        j = 0;
        sorting = true;
        sortingStep = bubbleSortStep;
        updateDescription(); // ← add this

    });
    let QuickSortButton = createButton('Quick Sort');
    QuickSortButton.mousePressed(() => {
        i = 0;
        j = 0;
        sorting = true;
        sortingStep = QuickSortStep;
        quickStack = [{ start: 0, end: values.length - 1 }];
        updateDescription(); // ← add this

    });
        let MergeSortButton = createButton('Merge Sort');
    MergeSortButton.mousePressed(() => {
        i = 0;
        j = 0;
        mergeWidth = 1;
        mergeIndex = 0;
        sorting = true;
        sortingStep = mergeSortStep;
        updateDescription(); // ← add this


    });
    speedSlider = createSlider(1, 60, 30);
    createP("Speed").position(450, 467);
    descriptionDiv = createDiv();
    descriptionDiv.style('color', 'black');
    descriptionDiv.style('font-family', 'monospace');
    descriptionDiv.style('margin-top', '10px');
    descriptionDiv.style('max-width', '700px');
    descriptionDiv.style('line-height', '1.5');
    descriptionDiv.position(10, height + 85);

    updateDescription(); // Set initial description

    values = createRandomArray(NUM_BARS)
    
}

function draw() {
    background(0); //black background
    textSize(10);
    fill(255);
    textAlign(LEFT, TOP);
    text(`Algorithm: ${getCurrentAlgorithmName()}`, 10, 10);

    if (sorting) {
        sortingStep(values)
        if (sortingStep == bubbleSortStep) {
            drawBars(values, [j, j + 1]);
        } else if (sortingStep == mergeSortStep) {
            drawBars(values, Array.from({length: 2 * mergeWidth }, (_, k) => mergeIndex - 2 * mergeWidth + k));
        } else if (sortingStep == QuickSortStep) {
            drawBars(values, [pivotIndex]);
        }
        frameRate(speedSlider.value());

    } else {
        drawBars(values);
}
}


function drawBars(arr, highlightIndicies = []){
    let barWidth = width / arr.length;
        for (let i = 0; i < arr.length; i++) {
            stroke(255); //bar outline
            if (highlightIndicies.includes(i)) {
                fill(0, 255, 0); //highlights green
            } else {
                fill(255, 0, 0); //Red bar
            }
            rect(i * barWidth, height - arr[i], barWidth, arr[i]);
        }
}

function bubbleSortStep(values) {
    if (values[j] > values[j + 1]) {
        swap(values, j, j + 1);
    }
    j++;

    if (j >= values.length - i - 1) {
        j = 0;
        i++;
    }
    
    if (i >= values.length) {
        sorting = false;
    }


}
function mergeSortStep(values) {
    if (mergeIndex < values.length){
        let left = values.slice(mergeIndex, mergeIndex + mergeWidth);
        let right = values.slice(mergeIndex + mergeWidth, mergeIndex + 2 * mergeWidth);
        let merged = doMerge(left, right)
        for (let k = 0; k < merged.length; k++) {
            values[mergeIndex + k] = merged[k];
        }
        mergeIndex += 2 * mergeWidth;
    } else {
        mergeIndex = 0;
        mergeWidth *= 2;
        if (mergeWidth >= values.length) {
            sorting = false;
        }
    }
}
function doMerge(arr1, arr2) {
    let i = 0;
    let j = 0;
    let sorted = []
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            sorted.push(arr1[i++]);
        } else {
            sorted.push(arr2[j++]);
        }
    }
    while (i < arr1.length) sorted.push(arr1[i++]);
    while (j < arr2.length) sorted.push(arr2[j++]);
    return sorted;
}
function keyPressed() {
    if (key == 'B') {
        i = 0;
        j = 0;
        sorting = true;
        sortingStep = bubbleSortStep;
    }
    if (key == 'R') {
        values = createRandomArray(NUM_BARS)
    }
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function QuickSortStep(values) {
    if (quickStack.length > 0) {
        let { start, end } = quickStack.pop();

        if (start < end) {
            pivotIndex = partition(values, start, end);
            quickStack.push({start: start, end: pivotIndex -1 });
            quickStack.push({start: pivotIndex + 1, end: end });
        }
    } else {
        sorting = false;
    }
}

function partition(arr, start, end) {
    let pivot = arr[end];
    let i = start;
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            swap(arr, i, j)
            i++
        } 
    }
    swap(arr, i, end);
    return i;
}
function getCurrentAlgorithmName() {
  if (sortingStep === bubbleSortStep) return 'Bubble Sort';
  if (sortingStep === QuickSortStep) return 'Quick Sort';
  if (sortingStep === mergeSortStep) return 'Merge Sort';
  return '';
}

function updateDescription() {
    let title = getCurrentAlgorithmName();
    let desc = '';

    if (title === 'Bubble Sort') {
        desc = `
            Bubble Sort is a simple comparison-based algorithm.<br><br>
            It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. This process is repeated until no more swaps are needed — meaning the list is sorted.<br><br>
            Although easy to understand and implement, it's highly inefficient for large datasets because it performs many unnecessary comparisons.<br><br>
            <b>Best case:</b> O(n) – when already sorted<br>
            <b>Average/Worst case:</b> O(n²)<br>
            <b>Space complexity:</b> O(1)<br>
            <b>Stable:</b> Yes
        `;
    } else if (title === 'Quick Sort') {
        desc = `
            Quick Sort is a highly efficient divide-and-conquer algorithm.<br><br>
            It works by selecting a 'pivot' element and partitioning the other elements into two groups: those less than the pivot and those greater than it. The pivot is then in its final position, and the same process is recursively applied to the left and right subarrays.<br><br>
            Quick Sort is very fast for average cases but can degrade if poor pivots are consistently chosen (e.g., already sorted input).<br><br>
            <b>Best/Average case:</b> O(n log n)<br>
            <b>Worst case:</b> O(n²) – typically avoided with good pivot selection<br>
            <b>Space complexity:</b> O(log n) due to recursion<br>
            <b>Stable:</b> No
        `;
    } else if (title === 'Merge Sort') {
        desc = `
            Merge Sort is a reliable and predictable divide-and-conquer algorithm.<br><br>
            It works by splitting the array into halves until single-element arrays are reached, then merging them back together in sorted order. Because of this, it's very consistent regardless of input.<br><br>
            It's ideal for sorting large datasets or linked lists, but it requires extra memory for the merged arrays.<br><br>
            <b>Time complexity:</b> O(n log n) in all cases<br>
            <b>Space complexity:</b> O(n)<br>
            <b>Stable:</b> Yes
        `;
    }

    descriptionDiv.html(`<h3>${title}</h3><p>${desc}</p>`);
}
