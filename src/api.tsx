export function fetchUsers() {
  return fetch("/fakedata/users.json").then((response) => response.json());
}

export function fetchMessages() {
  return fetch("/fakedata/messagesData.json").then((response) =>
    response.json()
  );
}
