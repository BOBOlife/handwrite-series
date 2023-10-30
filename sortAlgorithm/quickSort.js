
//快速排序
const arr = [4, 1, 6, 9, 3, 2, 8, 7];

function quickSort(arr) {
	if (arr.length <= 1) {
		return arr
	}
	let pivot = arr[0]
	let left = []
	let right = []
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i])
		} else {
			right.push(arr[i])
		}
	}
	return quickSort(left).concat(pivot, quickSort(right))
}


console.log(quickSort(arr))

// 优化版本的快速排序 标准版
// 解决的是 如果数组特别长的 就会创建太多的数组了性能就不好

function swap(arr, i, j) {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

function quickSort2(arr, begin, end) {
	if (begin >= end - 1) return
	let left = begin
	let right = end
	do {
		do left++ ; while (left < right && arr[left] < arr[begin])
		do right-- ; while (left < right && arr[right] > arr[begin])
		if (left < right) swap(arr, left, right)
	}while (left < right)
	let swapPoint = left === right ? right - 1 : right
	swap(arr, begin, swapPoint)
	quickSort2(arr, begin, swapPoint)
	quickSort2(arr, swapPoint + 1, end)
}

const arr2 = [8,2,1,3,4,7,9,0,6, 5]
quickSort2(arr2, 0, arr2.length)
console.log(arr2);
