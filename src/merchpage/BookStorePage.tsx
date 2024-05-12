import { useState } from 'react';
import BookListPage from '../customer/BookListPage';
import BookAction from './BookAction';
import { getMerchantBooks } from '../query/QueryBooks';
import BookDetailPage from '../customer/BookDetailPage';

export default function BookStorePage() {
  const [bookId, setBookId] = useState<string>('');

  function mockSetOnPage(mockPage: string) { return mockPage; }

  return (<>
    {bookId === '' ?
    <BookListPage setBookId={setBookId} getBooks={getMerchantBooks} /> :
    <BookDetailPage bookId={bookId} setBookId={setBookId} setOnPage={mockSetOnPage} BookActionSection={BookAction} />}
  </>);
}
