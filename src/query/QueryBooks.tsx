import axios from "axios";
import { BookInfo } from '../types/BookTypes.tsx';

// for user book list
export function getAllBooks(setBookInfoList: Function, page_number: number, per_page: number) {
  axios.get(
    '/api/search_merchandise',
    { params: {merchandise_name: '.*', per_page: per_page, page_number: page_number} }
  ).then(resp => {
    console.log('got /api/search_merchandise: ', resp);
    setBookInfoList(resp.data.data as Array<BookInfo>);
  }).catch(resp => {
    console.error('/api/search_merchandise error:', resp)
  })
}

// for merchant book list
export function getMerchantBooks(setBookInfoList: Function, page_number: number, per_page: number) {
}
