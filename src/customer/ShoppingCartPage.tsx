import {useEffect, useState} from "react"
import LoadingPage from "../LoadingPage";
import axios, {AxiosResponse} from "axios";

interface ShoppingCartPageProp {
  setOnPage: Function
}

interface Prop {
  cartItem: OrderInfo
}

function ShoppingCartListPresent({cartItem}: Prop) {
  return <>cart id is {cartItem.id}</>
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
      return <>{cartList.map((item, key) => (
        <li key={key}>
          <ShoppingCartListPresent cartItem={item} />
          <ShoppingCartControls
            cartItem={item}
            reloadPage={() => {getCartList()}}
            pageToOrders={(orderId: string) => {
              localStorage.setItem('focusOrderId', orderId);
              setOnPage('orders');
            }}
          />
        </li>
      ))}</>;
    }
  }

  useEffect(() => { getCartList() }, []);

  if (ordersCount === null)
    return <LoadingPage />
  else {
    return <>
      <ul>
      <button className="btn btn-success" disabled>total: {ordersCount}</button>
      <ShoppingCartList />
      </ul>
    </>;
  }
}
