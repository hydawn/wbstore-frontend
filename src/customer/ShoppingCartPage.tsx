import {useEffect, useState} from "react"
import LoadingPage from "../LoadingPage";
import axios, {AxiosResponse} from "axios";
import { BookInfo } from "../types/BookTypes";

interface ShoppingCartPageProp {
  setOnPage: Function
}

interface Props {
  cartItem: OrderInfo
  OrderActions: () => JSX.Element
}

function ShoppingCartListPresent({cartItem, OrderActions}: Props) {
  const [bookData, setBookData] = useState<BookInfo | null>(null);

  useEffect(() => {
    console.log(`try /api/get_merchandise detail ${cartItem.merchandise_id}`)
    axios.get(
      '/api/get_merchandise',
      {params: {merchandise_id: cartItem.merchandise_id} }
    ).then((resp) => {
      console.log('get /api/get_merchandise detail')
      setBookData(resp.data.data as BookInfo);
    }).catch((resp) => {
      console.error('/api/get_merchandise error:', resp)
    })
  }, []);

  if (bookData === null)
    return <></>;
  const base64Image = `data:${bookData.image_type};base64,${bookData.image_description}`;
  return <div className="card" style={{width: '22rem'}}>
    <img src={base64Image} className="card-img-top" alt={bookData.name} />
    <div className="card-body">
      <h5 className="card-title">{bookData.name}</h5>
      <p className="card-text">用户{cartItem.username}创立的购物车</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">数量：{cartItem.count}</li>
      <li className="list-group-item">总价格：{cartItem.total_price}</li>
      <li className="list-group-item">加入购物车日期：{cartItem.added_date.split('.')[0].replace('T', ' ')}</li>
    </ul>
    <div className="card-body">
      <OrderActions />
    </div>
  </div>
}

interface ShoppingCartControlsProp {
  reloadPage: Function
  cartItem: OrderInfo
  pageToOrders: Function
}

async function actOnCart(cartItem: OrderInfo, action: string, onSuccess: Function) {
  await axios.post(
    '/api/change_shopping_cart',
    { runningorder_id: cartItem.id, action: action }
  ).then(resp => {
    onSuccess(resp);
  }).catch(
    resp => {console.error('error changing it: ', resp)}
  )
}

function ShoppingCartControls({ reloadPage, cartItem, pageToOrders }: ShoppingCartControlsProp) {
  async function makeItOrder() {
    actOnCart(cartItem, 'order', (resp: AxiosResponse) => {
      pageToOrders(resp.data.data.orderId);
    })
  }

  async function deleteCartItem() {
    actOnCart(cartItem, 'delete', (_: AxiosResponse) => { reloadPage() })
  }

  function MakeItOrderButton() {
    return <button className="btn btn-primary" onClick={makeItOrder}>订购</button>;
  }

  function DeleteItButton() {
    return <button className="btn btn-danger" onClick={deleteCartItem}>删除</button>;
  }

  return <>
    <MakeItOrderButton />
    <DeleteItButton />
  </>
}

export default function ShoppingCartPage({setOnPage}: ShoppingCartPageProp) {
  const [ordersCount, setOrdersCount] = useState<number | null>(null);
  const [cartList, setCartList] = useState<Array<OrderInfo> | null>(null);

  async function getCartList() {
    await axios.get(
      '/api/get_shopping_cart',
      { params: { per_page: 10, page_number: 1 } }
    ).then(resp => {
      console.log('got: ', resp)
      setOrdersCount(resp.data.data.total_count);
      setCartList(resp.data.data.cart_list as Array<OrderInfo>);
    }).catch(
      resp => { console.error('error resp: ', resp); }
    )
  }

  function ShoppingCartList() {
    console.log('cartList is: ', cartList);
    if (cartList === null)
      return <LoadingPage />;
    else {
      return <>{cartList.map((item, index) => {
        function LocalActions() {
          return <ShoppingCartControls
            cartItem={item}
            reloadPage={() => {getCartList()}}
            pageToOrders={(orderId: string) => {
              localStorage.setItem('focusOrderId', orderId);
              setOnPage('orders');
            }}
          />
        }
        return <div key={index}><ShoppingCartListPresent cartItem={item} OrderActions={LocalActions} /></div>;
      })}</>;
    }
  }

  useEffect(() => { getCartList() }, []);

  if (ordersCount === null)
    return <LoadingPage />
  else {
    return <>
      <button className="btn btn-success" disabled>购物车：{ordersCount}件</button>
      <ShoppingCartList />
    </>;
  }
}
