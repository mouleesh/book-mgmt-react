export default (state = {}, action) => {
    switch (action.type) {
        case 'RETRIEVE_BOOK':
            return {
                result: action.payload
            }
        default:
            return state
    }
}