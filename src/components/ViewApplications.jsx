import axios from "axios";
import { useLoaderData } from "react-router-dom";
const ViewApplications = () => {
    const applications = useLoaderData();
    const handleStatus = (e, id) => {
        const data = {
            status: e.target.value
        }
        axios.patch(`https://solo-sphere-iota.vercel.app/job-applications/${id}`, data)
    }
    return (
        <div className="container my-5 mx-auto px-5">
            <h2 className="text-xl font-semibold mb-3">View Applicants: <span className="bg-blue-200 px-3 py-1  font-medium text-xs rounded-full">{applications.length} jobs</span></h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Deadline</th>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map(applications => <tr key={applications._id}>
                                <td>{applications.deadline}</td>
                                <td>{applications.seller_email}</td>
                                <td>{applications.comment}</td>
                                <td>{applications.price}</td>
                                <td>
                                    <select
                                        onChange={(e) => handleStatus(e, applications._id)}
                                        defaultValue={applications.status || 'Change Status'}
                                        className="select select-bordered select-xs w-full max-w-xs">
                                        <option disabled>Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;