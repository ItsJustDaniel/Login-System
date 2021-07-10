const login = async () => {
  console.log("hello world");

  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const isLogin = await fetch("https://loginsystem123.herokuapp.com/signin");

  const data = await isLogin.json();

  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].password === password && data[i].email === email) {
      location.href = "Home.html";
    } else {
      console.log("error");
    }
  }
};

const signup = async () => {
  console.log("signup");

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const isLogin = await fetch("https://loginsystem123.herokuapp.com/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });

  const data = await isLogin.json();

  console.log(data);

  location.href = "Home.html";
};
