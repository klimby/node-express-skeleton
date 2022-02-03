import {
  Lang,
  Locales,
} from '../types/common-types';

export class RequestCodes {

  static getRequestByCode(code: number, locale: Locales = Locales.en): string {
    const requestCodes: Map<number, Lang> = RequestCodes.#getCodes();
    const entity = requestCodes.has(code) ? requestCodes.get(code) : { en: 'Internal Server Error', ru: '' };
    return entity ? entity[locale] : '';
  }

  static #getCodes(): Map<number, Lang> {
    return new Map<number, Lang>([
      [100, { en: 'Continue', ru: 'Продолжайте' }],
      [101, { en: 'Switching Protocols', ru: 'Переключение протоколов' }],
      [102, { en: 'Processing', ru: 'Идёт обработка' }],
      [200, { en: 'OK', ru: 'Успешно' }],
      [201, { en: 'Created', ru: 'Создано' }],
      [202, { en: 'Accepted', ru: 'Принято' }],
      [203, { en: 'Non-Authoritative Information', ru: 'Информация не авторитетна' }],
      [204, { en: 'No Content', ru: 'Нет содержимого' }],
      [205, { en: 'Reset Content', ru: 'Сбросить содержимое' }],
      [206, { en: 'Partial Content', ru: 'Частичное содержимое' }],
      [207, { en: 'Multi-Status', ru: 'Многостатусный' }],
      [208, { en: 'Already Reported', ru: 'Уже сообщалось' }],
      [226, { en: 'IM Used', ru: 'Использовано IM' }],
      [300, { en: 'Multiple Choices', ru: 'Множество выборов' }],
      [301, { en: 'Moved Permanently', ru: 'Перемещено навсегда' }],
      [302, { en: 'Moved Temporarily', ru: 'Перемещено временно' }],
      [303, { en: 'See Other', ru: 'Смотреть другое' }],
      [304, { en: 'Not Modified', ru: 'Не изменялось' }],
      [305, { en: 'Use Proxy', ru: 'Использовать прокси' }],
      [307, { en: 'Temporary Redirect', ru: 'Временное перенаправление' }],
      [308, { en: 'Permanent Redirect', ru: 'Постоянное перенаправление' }],
      [400, { en: 'Bad Request', ru: 'Неверный запрос' }],
      [401, { en: 'Unauthorized', ru: 'Не авторизован' }],
      [402, { en: 'Payment Required', ru: 'Необходима оплата' }],
      [403, { en: 'Forbidden', ru: 'Доступ запрещен' }],
      [404, { en: 'Not Found', ru: 'Не найдено' }],
      [405, { en: 'Method Not Allowed', ru: 'Метод не поддерживается' }],
      [406, { en: 'Not Acceptable', ru: 'Неприемлемо' }],
      [407, { en: 'Proxy Authentication Required', ru: 'Необходима аутентификация прокси' }],
      [408, { en: 'Request Timeout', ru: 'Истекло время ожидания' }],
      [409, { en: 'Conflict', ru: 'Конфликт' }],
      [410, { en: 'Gone', ru: 'Удалён' }],
      [411, { en: 'Length Required', ru: 'Необходима длина' }],
      [412, { en: 'Precondition Failed', ru: 'Условие ложно' }],
      [413, { en: 'Payload Too Large', ru: 'Слишком большой объем данных' }],
      [414, { en: 'URI Too Long', ru: 'URI слишком длинный' }],
      [414, { en: 'Unsupported Media Type', ru: 'Неподдерживаемый тип данных' }],
      [416, { en: 'Range Not Satisfiable', ru: 'Диапазон не достижим' }],
      [417, { en: 'Expectation Failed', ru: 'Ожидание не удалось' }],
      [418, { en: 'I’m a teapot', ru: 'Я — чайник' }],
      [419, { en: 'Authentication Timeout', ru: 'Ошибка проверки CSRF' }],
      [421, { en: 'Misdirected Request', ru: 'Misdirected Request' }],
      [422, { en: 'Unprocessable Entity', ru: 'Логическая ошибка' }],
      [423, { en: 'Locked', ru: 'Заблокировано' }],
      [424, { en: 'Failed Dependency', ru: 'Невыполненная зависимость' }],
      [426, { en: 'Upgrade Required', ru: 'Необходимо обновление' }],
      [428, { en: 'Precondition Required', ru: 'Необходимо предусловие' }],
      [429, { en: 'Too Many Requests', ru: 'Слишком много запросов' }],
      [431, { en: 'Request Header Fields Too Large', ru: 'Поля заголовка запроса слишком большие' }],
      [449, { en: 'Retry With', ru: 'Повторить с' }],
      [451, { en: 'Unavailable For Legal Reasons', ru: 'Недоступно по юридическим причинам' }],
      [499, { en: 'Client Closed Request', ru: 'Клиент закрыл соединение' }],
      [500, { en: 'Internal Server Error', ru: 'Внутренняя ошибка сервера' }],
      [501, { en: 'Not Implemented', ru: 'Не реализовано' }],
      [502, { en: 'Bad Gateway', ru: 'Ошибочный шлюз' }],
      [503, { en: 'Service Unavailable', ru: 'Сервис недоступен' }],
      [504, { en: 'Gateway Timeout', ru: 'Шлюз не отвечает' }],
      [505, { en: 'HTTP Version Not Supported', ru: 'Версия HTTP не поддерживается' }],
      [506, { en: 'Variant Also Negotiates', ru: 'Variant Also Negotiates' }],
      [507, { en: 'Insufficient Storage', ru: 'Переполнение хранилища' }],
      [508, { en: 'Loop Detected', ru: 'Обнаружено бесконечный цикл' }],
      [510, { en: 'Not Extended', ru: 'Не расширено' }],
      [511, { en: 'Network Authentication Required', ru: 'Требуется сетевая аутентификация' }],
      [520, { en: 'Unknown Error', ru: 'Неизвестная ошибка' }],
      [521, { en: 'Web Server Is Down', ru: 'Веб-сервер не работает' }],
      [522, { en: 'Connection Timed Out', ru: 'Соединение не отвечает' }],
      [523, { en: 'Origin Is Unreachable', ru: 'Источник недоступен' }],
      [524, { en: 'A Timeout Occurred', ru: 'Время ожидания истекло' }],
      [525, { en: 'SSL Handshake Failed', ru: 'SSL Handshake Failed' }],
      [526, { en: 'Invalid SSL Certificate', ru: 'Недействительный сертификат SSL' }],

    ]);
  }

}
