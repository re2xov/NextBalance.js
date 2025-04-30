'use client'; // Обязательно для клиентских хуков в Next.js 13+

import { useState, useEffect } from 'react';

export default function useWindowSize() {
  // Инициализируем состояние с undefined (для SSR)
  const [windowSize, setWindowSize] = useState({
    width: 'undefined',
    height: 'undefined',
  });

  useEffect(() => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Устанавливаем начальные размеры
      handleResize();

      // Подписываемся на изменения
      window.addEventListener('resize', handleResize);

      // Отписываемся при размонтировании
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Пустой массив зависимостей = эффект только при монтировании

  return windowSize;
}