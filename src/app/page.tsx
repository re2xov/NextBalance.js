'use client'
import Image from "next/image";
import Head from "next/head";
import useWindowSize from '@/hooks/useWindowSize';
import {useState, useEffect} from 'react';




export default function Home() {
  const {width, height} = useWindowSize();
  const [inputValue, setInputValue] = useState('');

  const [selectedItems, setSelectedItems] = useState([])

  const toggleItem = (item) => {
    setSelectedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    )
  }
  let resultAmount;
  let forResult;

  let widthInt;


  
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
  
  const items = ['Option 1', 'Option 2', 'Option 3']
  var user = 'User';
  var currentFee = 10;


  var noteByDevice = "~ Комиссия пополнения составляет {currentFee} процентов";
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
       
       <form className="w-full  flex justify-center ">
        <div className="block-with-upbalance h-full pb-4 flex w-7/10  bg-white rounded-lg ">
        
        {/* Выбор платежной системы и мб чот еще (подумать над: промокоды) */} 
          <div className="flex flex-col w-1/2 rounded-l-lg mx-auto">
          {/* Адаптировать под платежки + добавить промики и текст */} 
          <div className="space-y-2  grid flex-col grid-cols-2 ml-auto w-full mt-6">
      {items.map(item => (
        //Блок-селект
        <label key={item} className="block pr-2">
          <input
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={() => toggleItem(item)}
            className="hidden" // Скрываем нативный чекбокс
          />
          <div className={`
            p-4 border rounded-lg cursor-pointer transition-all
            ${selectedItems.includes(item) 
              ? 'bg-blue-50 border-blue-500 text-blue-800' 
              : 'bg-white border-gray-300 hover:border-gray-400'}
          `}>
            {item}
          </div>
        </label>
      ))}
    </div>
          </div>
         
          <div className="flex flex-col w-1/2 rounded-r-lg">
          
              {/* Блок приветствия пользователя + кликабельная ссылка на личный кабинет*/} 
              <h3 className="text-xl mt-6 m-auto mb-4">
                Привет, <a href="/dashboard/" className="underline">{user}!</a>
              </h3>
              
              {/* Блок ввода суммы */} 
              <div className="flex flex-col amount mb-2 m-auto w-2/3">
              <input type="number" name="steam_amountTopUp" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="formInput-main border-1 rounded-lg m-auto w-full p-2" id="amount" placeholder="Введите сумму платежа"/>
              <p className="italic text-sm opacity-50 ">{isMobile ? `~ Комиссия - ${currentFee}%` : `~ Комиссия за пополнение составит  ${currentFee}  процентов`}</p>
              </div>
              {/* Блок ввода суммы */} 
              <div className="flex flex-col nickname m-auto w-2/3">
                <input type="text" name="steam_nickname" id="nickname" className="formInput-main border-1 rounded-lg m-auto w-full p-2" placeholder="Введите лог-ин Steam"/>
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
    </div>
    
    </>
  );
}
