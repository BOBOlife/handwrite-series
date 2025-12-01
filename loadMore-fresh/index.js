/**
 * 下拉刷新和上拉加载更多实现
 * 
 * 实现思路总结:
 * 1. 下拉刷新:
 *    - 监听 touchstart 记录初始触摸位置
 *    - 监听 touchmove 计算下拉距离,当滚动到顶部且继续下拉时显示刷新提示
 *    - 监听 touchend 判断下拉距离是否达到阈值,达到则触发刷新
 *    - 刷新完成后重置状态
 * 
 * 2. 上拉加载:
 *    - 监听 scroll 事件
 *    - 计算滚动位置: scrollTop + clientHeight >= scrollHeight - threshold
 *    - 当接近底部时触发加载更多
 *    - 加载完成后更新状态,防止重复加载
 */

class PullRefresh {
    constructor(options = {}) {
        this.container = options.container || document.body;
        this.onRefresh = options.onRefresh || (() => Promise.resolve());
        this.onLoadMore = options.onLoadMore || (() => Promise.resolve());
        
        // 下拉刷新相关状态
        this.startY = 0; // 触摸起始位置
        this.moveY = 0; // 当前移动位置
        this.isPulling = false; // 是否正在下拉
        this.isRefreshing = false; // 是否正在刷新
        this.pullThreshold = 60; // 触发刷新的阈值(px)
        
        // 上拉加载相关状态
        this.isLoading = false; // 是否正在加载
        this.loadThreshold = 100; // 距离底部多少px时触发加载
        this.hasMore = true; // 是否还有更多数据
        
        this.init();
    }
    
    init() {
        this.createRefreshElement();
        this.createLoadingElement();
        this.bindEvents();
    }
    
    // 创建下拉刷新提示元素
    createRefreshElement() {
        this.refreshEl = document.createElement('div');
        this.refreshEl.className = 'pull-refresh-indicator';
        this.refreshEl.innerHTML = '<span>下拉刷新</span>';
        this.refreshEl.style.cssText = `
            position: absolute;
            top: -60px;
            left: 0;
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            transition: transform 0.3s;
        `;
        this.container.style.position = 'relative';
        this.container.insertBefore(this.refreshEl, this.container.firstChild);
    }
    
    // 创建上拉加载提示元素
    createLoadingElement() {
        this.loadingEl = document.createElement('div');
        this.loadingEl.className = 'load-more-indicator';
        this.loadingEl.innerHTML = '<span>加载中...</span>';
        this.loadingEl.style.cssText = `
            height: 50px;
            display: none;
            align-items: center;
            justify-content: center;
            color: #666;
        `;
        this.container.appendChild(this.loadingEl);
    }
    
    bindEvents() {
        // 下拉刷新事件
        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // 上拉加载事件
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    // 触摸开始
    handleTouchStart(e) {
        if (this.isRefreshing) return;
        this.startY = e.touches[0].pageY;
        this.isPulling = false;
    }
    
    // 触摸移动
    handleTouchMove(e) {
        if (this.isRefreshing) return;
        
        const currentY = e.touches[0].pageY;
        const distance = currentY - this.startY;
        
        // 只有在页面滚动到顶部且向下拉时才触发
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop === 0 && distance > 0) {
            this.isPulling = true;
            this.moveY = Math.min(distance, this.pullThreshold * 2); // 限制最大下拉距离
            
            // 更新提示文字和位置
            const pullDistance = this.moveY;
            this.refreshEl.style.transform = `translateY(${pullDistance}px)`;
            
            if (pullDistance >= this.pullThreshold) {
                this.refreshEl.innerHTML = '<span>释放刷新</span>';
            } else {
                this.refreshEl.innerHTML = '<span>下拉刷新</span>';
            }
            
            // 阻止默认滚动行为
            e.preventDefault();
        }
    }
    
    // 触摸结束
    handleTouchEnd(e) {
        if (!this.isPulling || this.isRefreshing) return;
        
        // 判断是否达到刷新阈值
        if (this.moveY >= this.pullThreshold) {
            this.triggerRefresh();
        } else {
            this.resetRefresh();
        }
        
        this.isPulling = false;
    }
    
    // 触发刷新
    async triggerRefresh() {
        this.isRefreshing = true;
        this.refreshEl.innerHTML = '<span>刷新中...</span>';
        this.refreshEl.style.transform = `translateY(${this.pullThreshold}px)`;
        
        try {
            await this.onRefresh();
        } catch (error) {
            console.error('刷新失败:', error);
        } finally {
            this.resetRefresh();
        }
    }
    
    // 重置刷新状态
    resetRefresh() {
        this.refreshEl.style.transform = 'translateY(0)';
        this.refreshEl.innerHTML = '<span>下拉刷新</span>';
        this.moveY = 0;
        this.isRefreshing = false;
    }
    
    // 滚动事件处理
    handleScroll() {
        if (this.isLoading || !this.hasMore) return;
        
        // 计算滚动位置
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        
        // 判断是否接近底部
        if (scrollTop + clientHeight >= scrollHeight - this.loadThreshold) {
            this.triggerLoadMore();
        }
    }
    
    // 触发加载更多
    async triggerLoadMore() {
        this.isLoading = true;
        this.loadingEl.style.display = 'flex';
        
        try {
            const hasMore = await this.onLoadMore();
            // 如果返回 false 表示没有更多数据
            if (hasMore === false) {
                this.hasMore = false;
                this.loadingEl.innerHTML = '<span>没有更多了</span>';
            }
        } catch (error) {
            console.error('加载失败:', error);
            this.loadingEl.innerHTML = '<span>加载失败,请重试</span>';
        } finally {
            this.isLoading = false;
            if (this.hasMore) {
                setTimeout(() => {
                    this.loadingEl.style.display = 'none';
                }, 500);
            }
        }
    }
    
    // 重置加载状态(用于刷新后重置)
    resetLoadMore() {
        this.hasMore = true;
        this.isLoading = false;
        this.loadingEl.style.display = 'none';
        this.loadingEl.innerHTML = '<span>加载中...</span>';
    }
}

// 使用示例
// const pullRefresh = new PullRefresh({
//     container: document.querySelector('.content'),
//     onRefresh: async () => {
//         // 模拟刷新数据
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         console.log('刷新完成');
//     },
//     onLoadMore: async () => {
//         // 模拟加载更多
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         console.log('加载更多完成');
//         // 返回 false 表示没有更多数据
//         return true;
//     }
// });
