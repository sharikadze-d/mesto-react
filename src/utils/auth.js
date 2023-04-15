const BASE_URL = 'https://auth.nomoreparties.co'

const handleResponse = res => { //Обработка ответа
  if (res.ok) {
    if (res.item) { return res.item };
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

export function register (email, password) {
  return fetch(`${BASE_URL}/signup`, {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(handleResponse)
}