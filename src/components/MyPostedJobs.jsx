import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";

const MyPostedJobs = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/myPostedJobs?email=${user?.email}`)
            .then(data => {
                setJobs(data.data)
            })
    }, [user?.email])
    return (
        <div className="container my-5 mx-auto px-5">
            <h2 className="text-xl font-semibold mb-3">My Posted Jobs: <span className="bg-blue-200 px-3 py-1  font-medium text-xs rounded-full">{jobs.length} jobs</span></h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Category</th>
                            <th>Total Applicant</th>
                            <th>View Applications</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map(job => <tr key={job._id}>
                                <td>{job.title}</td>
                                <td>{job.deadline}</td>
                                <td>
                                    <p className={`${(job.category === 'Web Development' && 'text-red-500') || (job.category === 'Digital Marketing' && 'text-green-500') || (job.category === 'Graphic Design' && 'text-blue-500')}`}>
                                        {job.category}
                                    </p>
                                </td>

                                <td>{job.bid_count && job.bid_count}</td>
                                <td>
                                    <Link to={`/jobs/viewApplications/${job._id}`} className="underline text-blue-600">View Applications</Link>
                                </td>
                                {/* <td>{job.description.substring(0, 30)}...</td> */}
                                <td className="flex gap-3 text-red-400">
                                    <button>E</button>
                                    <button>X</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;