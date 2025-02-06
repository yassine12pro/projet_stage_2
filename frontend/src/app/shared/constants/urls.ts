const BASE_URL = 'http://localhost:5001';

export const USER_LOGIN_URL=BASE_URL + '/api/users/login'
export const USER_REGISTER_URL=BASE_URL + '/api/users/register'

export const GET_ALL_COURSES_URL=BASE_URL + '/api/courses'
export const GET_Course_BY_ID_URL=BASE_URL + '/api/courses/' // + id 
export const POST_COURSE_URL=BASE_URL + '/api/courses/create'
export const PUT_COURSE_URL=BASE_URL + '/api/courses/update' // + id 
export const DELETE_COURSE_URL=BASE_URL + '/api/courses/delete' // + id 




export const GET_ALL_REVIEW_URL=BASE_URL + '/api/review/all'
export const POST_REVIEW_URL=BASE_URL + '/api/review/add'

