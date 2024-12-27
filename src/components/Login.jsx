import Lottie from "lottie-react";
import LoginAnimation from "../assets/login.json";
import useAuth from "./useAuth";

const Login = () => {
    const { loginUser } = useAuth()
    const handleLogin = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        loginUser(data.email, data.password)
    }
    return (
        <div className="container mx-auto px-5 grid grid-cols-2 gap-20 my-10 items-center">
            <form onSubmit={handleLogin} className="border rounded p-5 space-y-3">
                <input required type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                <input required type="password" name="password" placeholder="Password" className="input input-bordered w-full" />
                <input type="submit" value='Login' className="w-full input bg-gray-800 text-white" />
            </form>
            <div className="w-full mx-auto">
                <Lottie animationData={LoginAnimation} className="w-8/12" loop={true} />
            </div>
        </div>
    );
};

export default Login;