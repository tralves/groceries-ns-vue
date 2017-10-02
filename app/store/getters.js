export const itemList = state => {
    return state.items.filter((item) => !item.deleted)
}

export const deletedItemList = state => {
    return state.items.filter((item) => item.deleted)
}

export const isProcessing = state => {
    // while there is at least one task processing, return true
    return state.processingTasks.length >= 1
}