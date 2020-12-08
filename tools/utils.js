const utils = {
    /**
     * 一维数组结构==》树形结构
     * @param sourceArray
     * @param parentId
     * @returns {[]}
     */
    translateToTree(sourceArray,parentId = 0) {
        let targetTree = []
        let temp;
        sourceArray.forEach((item, index) => {
            if (sourceArray[index].parent_id === parentId) {
                let obj = sourceArray[index];
                temp = this.translateToTree(sourceArray,sourceArray[index].id);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                targetTree.push(obj);
            }
        })
        return targetTree
    },
    /**
     * 将数组结构的数据转换成Map结构
     * @param sourceArray
     * @param key
     * @constructor
     */
    ArrayToMap(sourceArray, key) {
        let targetMap = new Map();
        sourceArray.forEach(value => {
            targetMap.set(value.id, value);
        })
        return targetMap;
    }
}
module.exports = utils
