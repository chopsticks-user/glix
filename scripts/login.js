const res = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: "admin@glix.com",
        password: "YYB6_}S:LKAR2=n",
    }),
});

const data = await res.json();
console.log(data);

