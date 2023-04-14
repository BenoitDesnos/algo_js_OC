fetch("http://127.0.0.1:5500/mockData.json")
  .then((response) => response.json())
  .then((json) => console.log(json));
