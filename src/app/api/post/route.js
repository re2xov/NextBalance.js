// Для POST-запросов
export async function POST(request) {
    try {
      const data = await request.json(); // Получаем JSON-данные
      console.log('Получены POST-данные:', data);
  
      // Возвращаем ответ (используем `Response.json()` вместо `res.status()`)
      return Response.json(
        { message: 'Данные получены!', receivedData: data },
        { status: 200 }
      );
    } catch (error) {
      return Response.json(
        { message: 'Ошибка сервера' },
        { status: 500 }
      );
    }
  }
  
  // Для других методов (GET, PUT и т.д.) можно добавить аналогичные функции
  export async function GET() {
    return Response.json(
      { message: 'GET-запрос не поддерживается' },
      { status: 405 }
    );
  }