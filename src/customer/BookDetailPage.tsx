// fetch detail info from web and present it
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookInfo } from '../types/BookTypes.tsx'

interface Prop {
  bookId: string
  setBookId: Function
  setOnPage: Function
  BookActionSection: (props: {
    bookData: BookInfo | null
    setOnPage: Function
  }) => JSX.Element
}

interface BookDetailInfoProp {
  bookId: string
}

// show the detailed info
function BookDetailInfo({bookId}: BookDetailInfoProp) {
  return <> this is a more detail page for book with bookid of [{bookId}] </>;
}

export default function BookDetailPage({ bookId, setBookId, setOnPage, BookActionSection }: Prop) {
  const [bookData, setBookData] = useState<BookInfo | null>(null);

  // get data from backend
  useEffect(() => {
    console.log(`try /api/get_merchandise detail ${bookId}`)
    axios.get(
      '/api/get_merchandise',
      {params: {merchandise_id: bookId} }
    ).then((resp) => {
      console.log('get /api/get_merchandise detail')
      setBookData(resp.data.data as BookInfo);
    }).catch((resp) => {
      console.error('/api/get_merchandise error:', resp)
    })
  }, []);

  function ReturnButton() {
    return <button className="btn" onClick={() => {setBookId('')}}>返回</button>;
  }

  console.log('get book id', bookId);
  return (<>
    <BookDetailInfo bookId={bookId} />
    <BookActionSection bookData={bookData} setOnPage={setOnPage} />
    <ReturnButton />
  </>);
}
