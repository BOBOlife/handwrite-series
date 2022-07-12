const request = new XMLHttpRequest();
request.open('GET', '/login.php?name=James', true);
request.onreadystatechange = function () {
  if (request.status === 200 && request.readyState === 4) {
    return request.responseText;
  }
};
request.send();
