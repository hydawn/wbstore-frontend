import { BookInfo } from "../types/BookTypes"

interface Prop {
  bookData: BookInfo | null
  setOnPage: Function
}

// for merchant
export default function BookAction({bookData, setOnPage}: Prop) {
  // take, accept cancel, accept finish
  return (<>for book {bookData?.id} <button className="btn btn-primary" onClick={() => {console.log('hit to take')}}>Take</button></>);
}
