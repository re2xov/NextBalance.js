'use client'
import useWindowSize from '@/hooks/useWindowSize';
import {useState, type ChangeEvent, type FormEvent} from 'react';




export default function Home() {
  const {width} = useWindowSize();
  const [inputValue, setInputValue] = useState('');


  

  
 const calculateResult = () => {
  const number = parseFloat(inputValue)
  if(!isNaN(number)){
    return (number * 1.1).toFixed(2);
  }
  return '';
 }
 
  let isMobile;
 

  if(parseInt(width) < 960){
    isMobile = true;
  } else{
    isMobile = false;
  }
  

  const user = 'User';
  const currentFee = 10;
  const [formData, setFormData] = useState({ paymentsys: '', amount: '', nickname: '', promo: '' });
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      setResponse(data);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert(data.error || "Ошибка платежа");
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Обновляем inputValue
    setFormData({ ...formData, amount: value });
  }

  return (<>

    <div className="flex flex-col items-center h-screen  justify-center">
       <div className="text-part items-center flex flex-col pb-8 ml-auto mr-auto">
        <h1 className="heading">
          NextBalance.js
        </h1>
        <h2 className="semi-heading">
          NextBalance.js - pet project by re2xov based on Next.JS and Rust.
        </h2>
       </div>
       
       <form className="w-full  flex justify-center " onSubmit={handleSubmit}>
        <div className="block-with-upbalance h-full pb-4 flex w-7/10 glass-effect rounded-lg ">
        
        {/* Выбор платежной системы и мб чот еще (подумать над: промокоды) */} 
          <div className="flex flex-col w-1/2 rounded-l-lg mx-auto">
          {/* Адаптировать под платежки + добавить промики и текст */} 
          <div className="space-y-2  grid flex-col  ml-auto w-2/3 m-auto">

      {//grid-cols-2 
      }
        <label className="paymentsys_block  pr-2 w-full">
          <input
            type="checkbox"
            name="paymentsys_ccloud"
            onChange={(e) => setFormData({ ...formData, paymentsys: e.target.name })}
            className="hidden"
            // Скрываем нативный чекбокс
          />
          <div className=" paymentsys_ccloud p-8  border rounded-lg cursor-pointer transition-all">
          <img src="https://brand.cryptocloud.plus/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F0qmF7ZfuUysWkk3Ugz0i%2Fblobs%2FiLCCqV5aGRlH06swUT6M%2FMain%2520logo.png&width=768&dpr=1&quality=100&sign=373be6e5&sv=2" alt="" />
          </div>
        </label>
        <label className="paymentsys_block  pr-2 w-full">
          <input
            type="checkbox"
            name="paymentsys_rkassa"
            onChange={(e) => setFormData({ ...formData, paymentsys: e.target.name })}
            className="hidden"
             // Скрываем нативный чекбокс
          />
          <div className=" paymentsys_rkassa p-6 border rounded-lg cursor-pointer transition-all">
          <img src="https://softolet.ru/wp-content/uploads/2018/10/5-15.jpg" alt="" />  
            
          </div>
        </label>
 
    </div>
    <div className="flex flex-col amount mb-2 m-auto w-2/3">
              <input type="text" name="promo"
              value={formData.promo}
              onChange={(e) => setFormData({ ...formData, promo: e.target.value })}
               className="formInput-main border-1 rounded-lg m-auto w-full p-2" 
               id="amount" placeholder="Промокод"/>
              <p className="italic text-sm opacity-50 ">~ Узнать его можно в нашей группе ТГ</p>
              </div>
          </div>
         
          <div className="flex flex-col w-1/2 rounded-r-lg">
          
              {/* Блок приветствия пользователя + кликабельная ссылка на личный кабинет*/} 
              <h3 className="text-xl mt-6 m-auto mb-4">
                Привет, <a href="/dashboard/" className="underline">{user}!</a>
              </h3>
              
              {/* Блок ввода суммы */} 
              <div className="flex flex-col amount mb-2 m-auto w-2/3">
              <input type="number" name="steam_amountTopUp" value={inputValue || formData.amount} onChange={handleChange} className="formInput-main border-1 rounded-lg m-auto w-full p-2" id="amount" placeholder="Введите сумму платежа"/>
              <p className="italic text-sm opacity-50 ">{isMobile ? `~ Комиссия - ${currentFee}%` : `~ Комиссия за пополнение составит  ${currentFee}  процентов`}</p>
              </div>
              {/* Блок ввода суммы */} 
              <div className="flex flex-col nickname m-auto w-2/3">
                <input type="text"
                 value={formData.nickname}
                 onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                 name="steam_nickname" id="nickname" className="formInput-main border-1 rounded-lg m-auto w-full p-2" placeholder="Введите лог-ин Steam"/>
                <p className="italic items-start text-sm opacity-50 "><a className="underline" href="/instruction/steam-login/">~ Как узнать логин Steam</a></p>
              </div>

              <div className="resultSum flex flex-col  mt-4 m-auto w">
              <h2 className="font-bold text-xl ">
                Итого:
              </h2>
              <h3 className="font-semibold text-lg " id="resultForPay">Оплатите: {calculateResult()}</h3>
              <h3 className="font-semibold text-lg " id="resultForBalance">Прийдёт на Steam: ~{inputValue}</h3>
              </div>
              <button type="submit" className="submitButton font-bold border-1 w-2/3 m-auto mt-4 rounded-lg p-2">Оплатить</button>
          </div>
          
              
        </div>
        </form>

        {response && (
        <div>
          <h3>Ответ сервера:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}


    </div>
    


    </>
  );
}
