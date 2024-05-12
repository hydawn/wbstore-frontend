import { useState } from 'react';
import BookListPage from '../customer/BookListPage';
import BookDetailPage from './BookDetailPage';
import { getMerchantBooks } from '../query/QueryBooks';

export default function BookStorePage() {
  const [bookId, setBookId] = useState<string>('');

  return (<>
    {bookId === '' ?
    <BookListPage setBookId={setBookId} getBooks={getMerchantBooks} /> :
    <BookDetailPage bookId={bookId} setBookId={setBookId} />}
  </>);
}
