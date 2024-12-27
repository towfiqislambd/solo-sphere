import Lottie from "lottie-react";
import RegisterAnimation from "../assets/register.json";
import useAuth from "./useAuth";

const Registration = () => {
    const { registrationUser, userProfileUpdate, setUser } = useAuth()
    const handleRegister = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const name = data.name;
        const photo = data.photoURL;

        registrationUser(data.email, data.password)
            .then(result => {
                userProfileUpdate(name, photo)
                    .then(() => {
                        setUser({ ...result, displayName: name, photoURL: photo })
                    })
            })
    }
    return (
        <div className="container mx-auto px-5 grid grid-cols-2 gap-20 my-10">
            <form onSubmit={handleRegister} className="border rounded p-5 space-y-3">
                <input required type="text" name="name" placeholder="Name" className="input input-bordered w-full" />
                <input required type="url" name="photoURL" placeholder="Photo URL" className="input input-bordered w-full" />
                <input required type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                <input required type="password" name="password" placeholder="Password" className="input input-bordered w-full" />
                <input type="submit" value='Register' className="w-full input bg-gray-800 text-white" />
            </form>
            <div className="w-full mx-auto">
                <Lottie animationData={RegisterAnimation} className="w-8/12" loop={true} />
            </div>
        </div>
    );
};

export default Registration;