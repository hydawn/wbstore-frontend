import axios from "axios";
import { BookInfo } from '../types/BookTypes.tsx';

// for user book list
export function getAllBooks(setBookInfoList: Function, page_number: number, per_page: number) {
  var endpoint: string = '/api/search_merchandise'
  axios.get(
    endpoint,
    { params: {merchandise_name: '.*', per_page: per_page, page_number: page_number} }
  ).then(resp => {
    console.log(`got ${endpoint}: `, resp);
    setBookInfoList(resp.data.data.data_list as Array<BookInfo>);
  }).catch(resp => {
    console.error(`${endpoint} error:`, resp)
  })
}

// for merchant book list
export function getMerchantBooks(setBookInfoList: Function, page_number: number, per_page: number) {
  var endpoint: string = '/api/get_merchant_merchandise'
  axios.get(
    endpoint,
    { params: {per_page: per_page, page_number: page_number} }
  ).then(resp => {
    console.log(`got ${endpoint}: `, resp);
    setBookInfoList(resp.data.data as Array<BookInfo>);
  }).catch(resp => {
    console.error(`${endpoint} error:`, resp)
  })
}
