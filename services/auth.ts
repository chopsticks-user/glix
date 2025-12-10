export async function login(email: string, password: string) {
    return await fetch("http://localhost:3000/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}

export async function logout() {
    return await fetch(
        'http://localhost:3000/api/users/logout?allSessions=false',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
}

