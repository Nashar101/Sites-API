import { useEffect, useRef } from "react";

const Login = ({ setCurrUser, setShow }) => {
    const formRef = useRef();

    useEffect(() => {
        const autoLogin = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const url = "http://localhost:3000/login"; // Endpoint for auto-login
                    const response = await fetch(url, {
                        method: "get",
                        headers: {
                            Authorization: token,
                        },
                    });
                    const data = await response.json();
                    console.log(data)
                    console.log(response)
                    if (!response.ok) throw data.error;
                    setCurrUser(data);
                }
            } catch (error) {
                console.log("Auto-login error", error);
            }
        };

        autoLogin();
    }, [setCurrUser]);

    const login = async (userInfo) => {
        const url = "http://localhost:3000/login";
        try {
            const response = await fetch(url, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(userInfo),
            });
            const data = await response.json();
            if (!response.ok) throw data.error;
            localStorage.setItem("token", response.headers.get("Authorization"));
            setCurrUser(data);
        } catch (error) {
            console.log("Login error", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
            user: { email: data.email, password: data.password },
        };
        login(userInfo);
        e.target.reset();
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShow(false);
    };

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit}>
                Email: <input type="email" name="email" placeholder="email" />
                <br />
                Password: <input type="password" name="password" placeholder="password" />
                <br />
                <input type="submit" value="Login" />
            </form>
            <br />
            <div>
                Not registered yet, <a href="#signup" onClick={handleClick}>Signup</a>
            </div>
        </div>
    );
};

export default Login;
