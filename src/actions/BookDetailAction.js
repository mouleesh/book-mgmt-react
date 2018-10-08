export const retrieveBookByIdAction = () => dispatch => {
    dispatch({
        type: 'RETRIEVE_BOOK',
        payload: 'result_of_retreive_book'
    })
}