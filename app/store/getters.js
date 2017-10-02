export const itemList = state => {
    return state.items.filter((item) => !item.deleted)
}

export const deletedItemList = state => {
    return state.items.filter((item) => item.deleted)
}

export const isProcessing = state => {
    return state.processingTasks.length >= 1
}