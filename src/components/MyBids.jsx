import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";

const MyBids = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [jobs, setJobs] = useState([])
    axiosSecure.get(`/myBids/${user?.email}`)
        .then(data => {
            setJobs(data.data);
        })
    const handleStatus = (e, id) => {
        const data = {
            status: e.target.value || e.target.innerText
        }
        axios.patch(`https://solo-sphere-iota.vercel.app/job-applications/${id}`, data)
    }
    return (
        <div className="container my-5 mx-auto px-5">
            <h2 className="text-xl font-semibold mb-3">My Bids: <span className="bg-blue-200 px-3 py-1  font-medium text-xs rounded-full">{jobs.length} Bids</span></h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map(job => <tr key={job._id}>
                                <td>{job.title}</td>
                                <td>{job.deadline}</td>
                                <td>${job.price}</td>
                                <td>{job.category}</td>
                                <td>{job.status}</td>
                                <td className="flex gap-3 text-red-400">
                                    {
                                        job.status === 'Accept' ? <button value='Complete' onClick={(e) => handleStatus(e, job._id)}>C</button> :
                                            <button disabled value='Complete' onClick={(e) => handleStatus(e, job._id)}>C</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyBids;