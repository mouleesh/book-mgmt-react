
export const growlData = {
  loginSuccess: { severity: 'success', summary: 'Login Success', detail: 'Welcome to LMS!' },
  loginError: { severity: 'error', summary: 'Invalid Credentials', detail: 'Please check the entered credentials.' },
  requestFailed: { severity: 'error', summary: 'Invalid Request', detail: 'The request is invalid !' },
  thanks: { severity: 'info', summary: 'Logged Out', detail: 'Thankyou for visiting LMS!' },
  bookAdded: { severity: 'info', summary: 'New Book added', detail: 'New Book added successfully !' },
  bookRemoved: { severity: 'error', summary: 'Book adding failed', detail: 'Unfortunately the new book is not added !' },
  fillBookDetails:{ severity: 'error', summary: 'Oops!', detail: 'Please fill Book Name, Author and Description.' },
  fillBookName: { severity: 'error', summary: 'Book Already Exists!', detail: 'Please provide a different book name.' }
}

export const APIserverURL = {
  bookAPI: 'https://my-json-server.typicode.com/vcoderz/lms-json-api/book',
  loginAPI: 'https://my-json-server.typicode.com/vcoderz/lms-json-api/loginDetail',
  userAPI: 'https://my-json-server.typicode.com/vcoderz/lms-json-api/user'
}
