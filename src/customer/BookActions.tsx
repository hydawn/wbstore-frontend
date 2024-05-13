import { useState, useEffect } from 'react';
import axios from "axios";
import { BookInfo } from '../types/BookTypes.tsx'
import LoadingPage from '../LoadingPage.tsx';

interface BookOrderFormProp {
  bookData: BookInfo
  setOnPage: Function
}

function postOrderBook(bookData: BookInfo, merchandiseCount: number, setOnPage: Function) {
  console.log(`ordering book ${bookData.id} with ${merchandiseCount}`);
  // make orders here, then set the focusOrderId here
  const post_payload = {
    merchandise_id: bookData.id,
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

function BookOrderForm({ bookData, setOnPage }: BookOrderFormProp) {
  let merchandiseCount = 1;

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
    <button className="btn btn-primary" onClick={() => {postOrderBook(bookData, merchandiseCount, setOnPage)}}>购买</button>
  </>);
}

async function postAddedToShoppingCart(bookId: string, onAdded: Function) {
  axios.post(
    '/api/add_to_shopping_cart',
    {merchandise_id: bookId}
  ).then(resp => {
    console.log('added to shopping cart:', resp);
    onAdded();
  }).catch(
    resp => { console.error('/api/make_order error:', resp) }
  )
}

interface BookAddToShoppingCartProp{
  bookData: BookInfo
}

function BookAddToShoppingCart({ bookData }: BookAddToShoppingCartProp) {
  const [disableButton, setDisableButton] = useState<boolean | null>(null);

  async function checkShoppingCart() {
    await axios.get(
        '/api/check_shopping_cart',
        {params: { merchandise_id: bookData.id }}
    ).then(resp => {
      console.log('resp:', resp);
      if (resp.data.status == 'ok')
        setDisableButton(true);
      else
        setDisableButton(false);
    })
  }

  useEffect(() => {checkShoppingCart()}, []);

  if (disableButton === null)
    return <LoadingPage />;
  if (disableButton)
    return <button className="btn btn-success" disabled>（已经）加入购物车</button>;
  else
    return <button className="btn btn-success" onClick={() => { postAddedToShoppingCart(bookData.id, () => {setDisableButton(true)}); }}>加入购物车</button>;
}

export default function BookActionsUser({ bookData, setOnPage }: BookOrderFormProp) {
  return <><BookOrderForm bookData={bookData} setOnPage={setOnPage} /><BookAddToShoppingCart bookData={bookData} /></>
}
