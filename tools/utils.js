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
    }

}
module.exports = utils
