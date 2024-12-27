import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import axios from "axios";

const BidRequests = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [jobs, setJobs] = useState([])
    axiosSecure.get(`/bidsRequests/${user?.email}`)
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
            <h2 className="text-xl font-semibold mb-3">Bid Requests: <span className="bg-blue-200 px-3 py-1  font-medium text-xs rounded-full">{jobs.length}</span></h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Email</th>
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
                                <td>{job.seller_email}</td>
                                <td>{job.deadline}</td>
                                <td>{job.price}</td>
                                <td>{job.category}</td>
                                <td>
                                    <select onChange={(e) => handleStatus(e, job._id)}
                                        defaultValue={job?.status || 'Change Status'}
                                        className="select select-bordered select-xs w-full max-w-xs">
                                        <option disabled>Change Status</option>
                                        <option>Accept</option>
                                        <option>Reject</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                    </select>
                                </td>
                                {
                                    job.status === 'Complete' ?
                                        <td className="flex gap-3 text-red-400">
                                            <button disabled value='Accept' onClick={(e) => handleStatus(e, job._id)}>A</button>
                                            <button disabled value='Reject' onClick={(e) => handleStatus(e, job._id)}>R</button>
                                        </td> :
                                        <td className="flex gap-3 text-red-400">
                                            <button value='Accept' onClick={(e) => handleStatus(e, job._id)}>A</button>
                                            <button value='Reject' onClick={(e) => handleStatus(e, job._id)}>R</button>
                                        </td>
                                }

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BidRequests;