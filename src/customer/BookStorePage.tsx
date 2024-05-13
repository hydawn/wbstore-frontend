import { useState } from 'react';
import BookListPage from './BookListPage';
import BookDetailPage from './BookDetailPage';
import { getAllBooks } from '../query/QueryBooks';
import BookActionsUser from '../customer/BookActions';

interface Prop {
  setOnPage: Function
}

export default function BookStorePage({setOnPage}: Prop) {
  const [bookId, setBookId] = useState<string>('');

  return (<>
    {bookId === '' ?
    <BookListPage setBookId={setBookId} getBooks={getAllBooks} /> :
    <BookDetailPage bookId={bookId} setBookId={setBookId} setOnPage={setOnPage} BookActionSection={BookActionsUser} />}
  </>);
}
