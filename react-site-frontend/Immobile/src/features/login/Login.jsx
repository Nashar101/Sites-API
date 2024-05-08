import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../constants.js";

function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    async function handleSubmit(e) {
        /we dont want our function to redirect us/
        e.preventDefault();
        /changed postData to post to allow it to pass post_params of API/
        const credentials = {email, password};
        /we are passing this to RAILS API so it needs to be in a JSON format/
        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Specify that we accept JSON in the response
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok){
            const{ id } = await response.json();
            console.log("Logged in successfully!");
            navigate(`/posts/${id}`);
        }
        else{
            setError(data.error || 'Login failed');
        }
    }



    return(<div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={"emailInput"}>Email</label>

                <input id="emailInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div>
                <label htmlFor={"passWord"}>Password</label>
                <textarea id={"passWord"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div>
                <button type={"submit"}>Login</button>
            </div>
            {error && <div>{error}</div>}
        </form>
    </div>)
}

export default Login;