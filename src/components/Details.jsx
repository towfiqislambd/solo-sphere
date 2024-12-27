import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
const notify2 = () => toast.error('Action Not Permitted For You')
const notify3 = () => toast.error('Price should not more than max price')
const notify4 = () => toast.error('Deadline is over')
const notify5 = () => toast.success('Place Bid Successful')
const notify6 = (err) => {
    toast.error(err)
}

const Details = () => {
    const { user } = useAuth();
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure()
    const { id } = useParams();
    const [job, setJob] = useState([])
    useEffect(() => {
        axiosSecure.get(`/jobs/details/${id}`)
            .then(data => {
                setJob(data.data)
            })
    }, [])
    const handleBid = e => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const deadlineTimestamp = new Date(job.deadline).getTime();
        const currentTimestamp = new Date(startDate).getTime();
        const allData = {
            id,
            title: job.title,
            category: job.category,
            status: 'pending',
            buyer_email: job?.buyer?.email,
            ...data
        }
        const maxPriceNumber = parseInt(job.max_price);
        const recentPriceNumber = parseInt(data.price);

        if (job.buyer.email === data.seller_email) {
            return notify2()
        }
        if (recentPriceNumber > maxPriceNumber) {
            return notify3()
        }
        if (currentTimestamp > deadlineTimestamp) {
            return notify4()
        }
        axiosSecure.post('/bids', allData)
            .then(data => {
                if (data.data.insertedId) {
                    notify5()
                    navigate(`/myBids/${user?.email}`)
                }
                navigate(`/myBids/${user?.email}`)
            })
            .catch(err => {
                notify6(err.response.data)
            })
    }
    return (
        <div className="container mx-auto px-5 my-10 grid grid-cols-2 gap-10 items-center">
            <div className="border-b space-y-2 py-5 px-3 rounded shadow-lg text-sm text-gray-700">
                <div className="flex justify-between items-center">
                    <span>Deadline: {job.deadline}</span>
                    <span className="bg-blue-200 text-xs rounded-full px-3 py-1">{job.category}</span>
                </div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-500 ">{job.description}</p>
                <p className="font-semibold text-lg">Buyer Details: </p>
                <div className="flex gap-3 items-center">
                    <div className="">
                        <p className="mb-2">Name: {job?.buyer?.name}</p>
                        <p className="">Email: {job?.buyer?.email}</p>
                    </div>
                    <img referrerPolicy="no-referrer" src={job?.buyer?.photoURL} className="w-14 h-14 border rounded-full" />
                </div>
                <p className="font-medium">Range:${job.min_price} - ${job.max_price}</p>
                <p className="font-medium">Total Bids: {job.bid_count}</p>
            </div>
            <div className="">
                <form onSubmit={handleBid} className="border w-[550px] mx-auto grid grid-cols-2 gap-5 rounded-lg shadow-lg p-5">
                    <h2 className="font-semibold text-xl mb-1 col-span-2">Place A Bid</h2>
                    <input required type="number" name="price" placeholder="Price" className="input input-bordered w-full" />
                    <input required type="email" defaultValue={user?.email} name="seller_email" placeholder="Email Address" className="input input-bordered text-gray-400 w-full" />
                    <input required type="text" name="comment" placeholder="Comment" className="input text-gray-400 input-bordered w-full" />
                    <div className="w-full input input-bordered pt-3">
                        <DatePicker name="deadline" className="w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className=""></div>
                    <input type="submit" value='Place Bid' className="input w-32 ms-auto bg-gray-800 text-white" />
                </form>
            </div>
        </div>
    )
}

export default Details;