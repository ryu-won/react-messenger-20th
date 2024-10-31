export function fetchUsers() {
  return fetch("/fakedata/users.json").then((response) => response.json());
}
