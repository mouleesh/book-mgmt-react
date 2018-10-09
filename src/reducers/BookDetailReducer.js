const initialState = {
    bookDetail: {
        image: '',
        bookName: '',
        bookId: '',
        comments: [],
        likes: '',
        author: '',
        description: '',
        isLike: ''
    }
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_BOOK':
            return {
                ...state,
                bookDetail: {
                    ...action.payload
                }
            }
        default:
            return state
    }
}