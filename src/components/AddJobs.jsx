import useAuth from "./useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const notify1 = () => toast.success('Posted Successfully')

const AddJobs = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        const { buyer_email, ...data } = initialData;
        const buyer = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL
        }
        const allData = {
            ...data,
            buyer,
            bid_count: 0
        }
        axiosSecure.post('/jobs', allData)
            .then(data => {
                if (data.data.insertedId ) {
                    navigate(`/myPostedJobs?email=${user?.email}`)
                    notify1()
                }
            })
    }
    return (
        <div className="container mx-auto px-5 my-10">
            <form onSubmit={handleAddJob} className="border w-[550px] mx-auto grid grid-cols-2 gap-5 rounded-lg shadow-lg p-5">
                <h2 className="font-semibold text-2xl col-span-2">Post A Job</h2>
                <input required type="text" name="title" placeholder="Job Title" className="input input-bordered w-full" />
                <input type="email" disabled defaultValue={user?.email} name="buyer_email" placeholder="Email Address" className="input input-bordered text-gray-400 w-full" />
                <div className="w-full input input-bordered pt-3">
                    <DatePicker name="deadline" className="w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <select defaultValue='Select Category' name="category" className="border rounded-lg border-gray-300 p-3 text-gray-400">
                    <option disabled>Select Category</option>
                    <option name=''>Web Development</option>
                    <option name=''>Graphic Design</option>
                    <option name=''>Digital Marketing</option>
                </select>
                <input required type="number" name="min_price" placeholder="Min Price" className="input input-bordered w-full" />
                <input required type="number" name="max_price" placeholder="Max Price" className="input input-bordered w-full" />
                <textarea name="description" className="col-span-2 border rounded-lg p-3" rows={5} placeholder="Description"></textarea>
                <input type="submit" value='Save' className="w-full input col-span-2 bg-gray-800 text-white" />
            </form>
        </div>
    )
}

export default AddJobs;