import { useState, useEffect } from 'react';
import axios, {AxiosResponse} from "axios";
import { BookInfo } from '../types/BookTypes.tsx'
import LoadingPage from '../LoadingPage.tsx';

interface BookOrderFormProp {
  bookData: BookInfo
  setOnPage: Function
}

function postOrderBook(endpoint: string, bookData: BookInfo, merchandiseCount: number, onSuccess: Function) {
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
  axios.post(endpoint, post_payload)
  .then(resp => { onSuccess(resp) }).catch(resp => {
    console.error(`${endpoint} error:`, resp)
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

  const handleClickPurchase = () => {
    const handlePurchaseSuccess = (resp: AxiosResponse) => {
      localStorage.setItem('focusOrderId', resp.data.data.orderId);
      setOnPage('orders');
    }
    postOrderBook('/api/make_order', bookData, merchandiseCount, handlePurchaseSuccess);
  }

  return (<>
    <NumberInput />
    <button className="btn btn-primary" onClick={handleClickPurchase}>购买</button>
  </>);
}

function BookAddToShoppingCart({ bookData, setOnPage }: BookOrderFormProp) {
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
        <button type="button" className="btn btn-success" onClick={lessInput}>-</button>
        <button type="button" className="btn">{num}</button>
        <button type="button" className="btn btn-success" onClick={moreInput}>+</button>
      </div>
    </>);
  }

  const handleAddedToCart = () => {
    const handlePurchaseSuccess = (resp: AxiosResponse) => {
      // set focus shopping cart
      //setOnPage('shopping cart');
      setDisableButton(true);
    }
    postOrderBook('/api/add_to_shopping_cart', bookData, merchandiseCount, handlePurchaseSuccess);
  }


  if (disableButton === null)
    return <LoadingPage />;
  if (disableButton)
    return <><NumberInput /><button className="btn btn-success" disabled>（已经）加入购物车</button></> ;
  else
    return <><NumberInput /><button className="btn btn-success" onClick={handleAddedToCart}>加入购物车</button></>;
}

export default function BookActionsUser({ bookData, setOnPage }: BookOrderFormProp) {
  return <>
    <BookOrderForm bookData={bookData} setOnPage={setOnPage} />
    <BookAddToShoppingCart bookData={bookData} setOnPage={setOnPage} />
  </>;
}
