import { ChangeEvent, useRef } from 'react';
import axios from 'axios';

interface AddBookFormProp {
  onInsert: Function
}

function handleFileChange(event: ChangeEvent<HTMLInputElement>, setImage: Function) {
  if (!event.target.files || event.target.files.length <= 0) {
    return ;
  }
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
   if (reader.result && typeof reader.result === 'string') {
      // Extract base64 string from the data URL
      const base64 = reader.result.split(',')[1];
      setImage(base64, file.type);
    }
  };
  reader.readAsDataURL(file);
}

function AddBookForm({onInsert}: AddBookFormProp) {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const stockInventoryRef = useRef<HTMLInputElement>(null);
  const textDescriptionRef = useRef<HTMLTextAreaElement>(null);

  var imageForm = {
    name: '',
    text_description: '',
    image_type: '',
    image_description: '',
    price: 0,
    stock_inventory: 0
  };
  function setImageString(b64String: string, filetype: string) {
    imageForm.image_description = b64String;
    imageForm.image_type = filetype;
  }

  async function submitForm() {
    if (nameRef.current === null) {
      alert('name cannot be null');
      return;
    }
    if (priceRef.current === null) {
      alert('price cannot be null');
      return;
    }
    if (stockInventoryRef.current === null) {
      alert('stock inventory cannot be null');
      return;
    }
    imageForm.name = nameRef.current.value;
    imageForm.price = parseFloat(priceRef.current.value);
    imageForm.stock_inventory = parseInt(stockInventoryRef.current.value);
    imageForm.text_description = textDescriptionRef.current?.value || '';
    console.log(imageForm);
    await axios.post('/api/insert_merchandise', imageForm)
    .then(resp => {
      console.log('insert good:', resp);
      onInsert();
    })
    .catch(resp => {
      console.error('error posting /api/insert_merchandise:', resp);
    })
  }

  return (<>
  <div className="mb-3">
    <label htmlFor="inputName" className="form-label">商品名</label>
    <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" ref={nameRef} />
    <div id="nameHelp" className="form-text">输入商品名</div>
  </div>
  <div className="mb-3">
    <label htmlFor="inputPicture" className="form-label">商品主图片</label>
    <input type="file" className="form-control" id="inputPicture" onChange={event => { handleFileChange(event, setImageString) }} />
  </div>
  <div className="mb-3">
    <label htmlFor="inputDescription" className="form-label">商品介绍</label>
    <textarea className="form-control" id="inputDescription" ref={textDescriptionRef} />
  </div>
  <div className="mb-3">
    <label htmlFor="inputPrice" className="form-label">价格</label>
    <input type="number" className="form-control" id="inputPrice" ref={priceRef} />
  </div>
  <div className="mb-3">
    <label htmlFor="inputStockInventory" className="form-label">库存</label>
    <input type="number" className="form-control" id="inputStockInventory" ref={stockInventoryRef} />
  </div>
  <button className="btn btn-primary" onClick={submitForm}>提交</button>
  </>
  );
}

interface AddBookProp {
  setOnPage: Function
}

export default function AddBookPage({setOnPage}: AddBookProp) {
  return <><h1>添加商品</h1><AddBookForm onInsert={() => {alert('insert good'); setOnPage('books')}} /></>;
}
