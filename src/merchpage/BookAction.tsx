import { BookInfo } from "../types/BookTypes";
import axios from 'axios';

interface Prop {
  bookData: BookInfo
  setOnPage: Function
}

function removeBook(bookData: BookInfo, onRemove: Function) {
  console.log(`removing book ${bookData.name} of id [${bookData.id}]`);
  // TODO: remove book here
  axios.post('/api/remove_book', {id: bookData.id}).then(resp => {onRemove()});
}

// for merchant
export default function BookAction({bookData, setOnPage}: Prop) {
  function RemoveButton() {
    return <button className="btn btn-primary" onClick={() => {removeBook(bookData, () => {setOnPage('books')} )}}>Remove</button>;
  }
  return (<><RemoveButton /></>);
}
