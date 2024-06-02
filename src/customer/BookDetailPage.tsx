// fetch detail info from web and present it
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookInfo } from '../types/BookTypes.tsx'
import LoadingPage from '../LoadingPage.tsx';

interface Prop {
  bookId: string
  setBookId: Function
  setOnPage: Function
  BookActionSection: (props: {
    bookData: BookInfo
    setOnPage: Function
  }) => JSX.Element
}

// show the detailed info
export default function BookDetailPage({ bookId, setBookId, setOnPage, BookActionSection }: Prop) {
  const [bookData, setBookData] = useState<BookInfo | null>(null);

  function BookDetailInfo() {
    if (bookData === null)
      return <LoadingPage /> ;
    const base64Image = `data:${bookData.image_type};base64,${bookData.image_description}`;
    return <>
      <h1>{bookData.name}</h1>
      <div className="card" style={{ width: '32rem'}}>
        <img src={base64Image} className="card-img-top" alt={bookData.name} />
        <div className="card-body">
          <h5 className="card-title">{bookData.name}</h5>
          <p className="card-text">{bookData.text_description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">商家：{bookData.added_by_user}</li>
          <li className="list-group-item">上市时间：{bookData.online_date.split('.')[0].replace('T', ' ')}</li>
          <li className="list-group-item">价格：{bookData.price}</li>
          <li className="list-group-item">存货：{bookData.stock_inventory}</li>
        </ul>
        <div className="card-body">
          <BookActionSection bookData={bookData} setOnPage={setOnPage} />
        </div>
      </div>
    </>
  }

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
    {bookData === null ? <LoadingPage /> : <BookDetailInfo />}
    <ReturnButton />
  </>);
}
