import type { DFSCallBack, Node, NodeType, RenderOptions } from './type';
export declare class Tree<D = any> {
    private root;
    private nodes;
    private key;
    private collapsible;
    constructor(data: D, type: NodeType, collapsible: boolean | undefined, rootPreserveData: Record<any, any>);
    /**
     * 判断是否根节点，可以优化代码语义
     * @param node 节点
     * @returns 是否根节点
     */
    isRoot(node: Node<D>): boolean;
    getRoot(): Node<D>;
    /**
     * 切换关系节点的折叠状态
     * @param key 节点 key
     */
    toggleCollapse(key: number): void;
    /**
     * 遍历所有父节点判断其是否需要折叠
     * @param key 节点 key
     */
    shouldCollapse(key: number): boolean;
    /**
     * 创建节点，节点和数据分离，数据将携带在节点的data字段中
     * @param data 数据内容
     * @returns 一个新的节点
     */
    createNode(data: D, type: NodeType, collapse?: boolean, preserveData?: Record<any, any>): Node<D>;
    /**
     * 深度优先遍历
     * @param node 遍历的开始节点
     * @param cb 观察函数
     */
    dfs(node: Node<D>, cb: DFSCallBack<Node<D>>): void;
    /**
     * 广度优先遍历
     * @param node 遍历开始的节点
     * @param cb 观察函数
     */
    bfs(node: Node<D>, cb: DFSCallBack<Node<D>>): void;
    /**
     * 寻找节点
     * @param key 查找的字段（这个 key 的含义不是节点的 key 属性）
     * @param value 查找的值
     * @returns 返回找到的节点，没有找到时为 undefined
     */
    find(key: any, value: any): Node<D>;
    findByKey(key: number): Node<D>;
    /**
     * 添加节点到根节点
     * @param child 节点
     */
    appendToRoot(child: Node<D>): void;
    /**
     * 添加节点
     * @param parentKey 添加到对应 key 的节点
     * @param child 节点
     * @param order 添加到节点时的顺序
     * @returns 添加成功返回根节点，否则返回false
     */
    appendByKey(parentKey: number, child: Node<D>, order?: number): false | Node<D>;
    /**
     * 在树中删除节点
     * @param childKey 删除的节点的 key
     * @returns 返回删除的节点
     */
    removeByKey(childKey: number): undefined;
    /**
     * 移动节点
     * @param fromKey 移动的节点 key
     * @param toKey 移动到的节点 key
     * @param order 移动的新的节点的顺序
     * @returns 移动结果
     */
    move(fromKey: number, toKey: number, order?: number): boolean;
    /**
     * 渲染方法
     * @param renderOptions 渲染设置
     */
    render(...renderOptions: RenderOptions<D>[]): void;
    /**
     * 获取纯数据（不包含渲染所需的数据）
     * @param startNode 从某个节点开始获取
     * @returns 纯数据
     */
    getChildrenData(startNode: Node<D>): {};
    /**
     * 获取全部纯数据（不包含渲染所需的数据）
     * @returns 纯数据
     */
    getPureData(): {};
    /**
     * 从数据初始化树
     * @param data 初始化的数据
     * @param format 整理数据的方法
     * @returns 用于渲染的树实例
     */
    static initWithData(data: any, collapsible: boolean, fieldKeys: string[]): any;
    /**
     * 获得节点的最后节点距离左侧的距离
     * @returns {number} maxLeft
     */
    getMaxLeft(): number;
}
