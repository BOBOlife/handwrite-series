const arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 6, name: "部门6", pid: 5 },
];

// 扁平数组转tree

// 方法一：递归法 时间复杂度O(2^n)

// 转换法
function arrayToTree(data, pid) {
  const result = []
  getChildren(data,result,pid)
  return result 
}
// 递归查找，获取children
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
};

console.log(arrayToTree(arr,0))

// 方法二： 不适用递归方式

// 主要思路将数据转成 Map 去存储，之后遍历的同时借助对象的引用，直接从 Map 找到对应的数据做存储

function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // hashMap 
    
  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = {...item, children: []}
  }
  
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    const treeItem =  itemMap[id];
    if (pid === 0) { // 
      result.push(treeItem); 
    } else {
      if (!itemMap[pid]) { // pid和id没有对应上的情况
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}


// 最优解 O(n)
function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}

// 总结 这个版本 写的一般 还需要优化