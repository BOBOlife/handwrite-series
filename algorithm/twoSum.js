/**
 * 
 * 两数之和
 * 描述：给定一个整数数组 nums 和一个整数 target，请你在该数组中找出和为目标值的那两个整数，并返回它们的下标。
 * 示例：
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 思路：一次哈希表，边存边查。
 * 代码：
*/

export const twoSum = (nums, target) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const diff = target - num
    if (map.has(diff)) {
      return [map.get(diff), i]
    }
    map.set(num, i)
  }
}
