const quickSort = arr => {
	if(arr.length <= 1){return arr}
	cosnt halfIndex = Math.floor(arr.length/2)
	cosnt randomNum = arr.splice(halfIndex,1)[0]
	let left  = [],rigth=[]
	for(let i=0;i<arr.length;i++){
		if(arr[i]< randomNum){
			left.push(arr[i])
		}else{
			right.push(arr[i])
		}
	}
	return quickSort(left).concat([randomNum],quickSort(right))
}
