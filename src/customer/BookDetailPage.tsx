// fetch detail info from web and present it
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookInfo } from '../types/BookTypes.tsx'

interface Prop {
  bookId: string
  setBookId: Function
  setOnPage: Function
}

interface BookDetailInfoProp {
  bookId: string
}

// show the detailed info
function BookDetailInfo({bookId}: BookDetailInfoProp) {
  return <> this is a more detail page for book with bookid of [{bookId}] </>;
}

export default function BookDetailPage({ bookId, setBookId, setOnPage }: Prop) {
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

  function BookOrderForm() {
    let merchandiseCount = 1;
    // order bookId
    function orderBook(bookId: string, setOnPage: Function) {
      console.log(`ordering book ${bookId} with ${merchandiseCount}`);
      // make orders here, then set the focusOrderId here
      if (bookData === null) {
        console.log(`can't order with null bookData`);
        return;
      }
      const post_payload = {
        merchandise_id: bookId,
        count: merchandiseCount,
        total_price: merchandiseCount * bookData.price,
        status_paid: false,
        status_taken: false,
        status_cancelling: false
      }
      console.log('ready to post with', post_payload);
      axios.post('/api/make_order', post_payload)
      .then((resp) => {
        console.log('got response', resp);
        console.log('got order id', resp.data.data.orderId);
        localStorage.setItem('focusOrderId', resp.data.data.orderId);
        setOnPage('orders');
      }).catch(resp => {
        console.error('/api/make_order error:', resp)
      })
    }

    function NumberInput() {
      const [num, setNum] = useState(1);
      function moreInput() {
        merchandiseCount = num + 1;
        setNum(num + 1);
      }
      function lessInput() {
        if (num === 1)
          return;
        merchandiseCount = num - 1;
        setNum(num - 1);
      }
      return (<>
        <div className="btn-group" role="group" aria-label="NumberInput">
          <button type="button" className="btn btn-primary" onClick={lessInput}>-</button>
          <button type="button" className="btn">{num}</button>
          <button type="button" className="btn btn-primary" onClick={moreInput}>+</button>
        </div>
      </>);
    }


    return (<>
      <NumberInput />
      <button className="btn" onClick={() => {orderBook(bookId, setOnPage)}}>购买</button>
    </>);
  }

  console.log('get book id', bookId);
  return (<>
      <BookDetailInfo bookId={bookId} />
      <BookOrderForm />
      <ReturnButton />
  </>);
}
