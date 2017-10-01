export const itemList = state => {
    return state.items.filter((item) => !item.delete)
}