
 const sortArray = (nums) => {
   function sort(left, right) {
    const res = []
    while(left.length>0 && right.length >0) {
      if(left[0]< right[0]) {
        res.push(left.shift())
      } else {
        res.push(right.shift())
      }
    }
    return res.concat(left).concat(right)

   }
   
   function merge(nums) {
      if(nums.length <= 1) return nums
      const midIndex = Math.floor(nums.length / 2)
      const left = nums.slice(0,midIndex)
      const right = nums.slice(midIndex)

      return sort(merge(left), merge(right))
    
    }

    nums = merge(nums)
    return nums
 }