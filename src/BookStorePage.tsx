import { useState } from 'react';
import BookListPage from './BookListPage';
import BookDetailPage from './BookDetailPage';

interface Prop {
  setOnPage: Function
}

export default function BookStorePage({setOnPage}: Prop) {
  const [bookPageState, setBookPageState] = useState('book list');
  // const [bookId, setBookId] = useState<string | null>(null);
  let bookId = '';
  const setBookId = (newBookId: string) => {
    bookId = newBookId;
  };

  return (<>
    {bookPageState == 'book list' && <BookListPage setOnPage={setOnPage} setBookId={setBookId} setBookPageState={setBookPageState} />}
    {bookPageState == 'book detail' && bookId && <BookDetailPage bookId={bookId} setBookId={setBookId} setPageState={setBookPageState} />}
  </>);
}
