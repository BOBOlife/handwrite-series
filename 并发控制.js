function createConcurrency(limit = 3) {
  const queue = [];          // 待调度任务队列
  let running = 0;           // 当前占用的并发槽

  // 把任务“登记”进来，但先不执行
  function enqueue(task) {
    return new Promise((resolve, reject) => {
      queue.push({ run: task, resolve, reject });
      schedule();            // 尝试调度
    });
  }

  // 真正执行一个任务
  async function runJob({ run, resolve, reject }) {
    running++;
    try {
      const data = await run();
      resolve(data);
    } catch (e) {
      reject(e);
    } finally {
      running--;
      schedule();            // 释放槽位后再检查队列
    }
  }

  // 调度器：有空槽就弹任务执行
  function schedule() {
    while (queue.length && running < limit) {
      runJob(queue.shift());
    }
  }

  return enqueue;            // 调用者只需拿这个函数往里塞任务
}

/* ====== 用法 ====== */
const enqueue = createConcurrency(2);

[1, 2, 3, 4, 5].forEach(i =>
  enqueue(() => fetch(`/api/${i}`))   // 返回 Promise，但会受并发限制
    .then(res => console.log('done', i))
    .catch(console.error)
);