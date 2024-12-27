import { Link } from "react-router-dom";

const Job = ({ job }) => {
    return (
        <Link to={`/jobs/details/${job._id}`} className="border-b space-y-2 py-5 px-3 rounded shadow-lg text-sm text-gray-700">
            <div className="flex justify-between items-center">
                <span>Deadline: {job.deadline}</span>
                <span className="bg-blue-200 text-xs rounded-full px-3 py-1">{job.category}</span>
            </div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-500">{job.description}</p>
            <p className="font-medium">Range:${job.max_price} - ${job.min_price}</p>
            <p className="font-medium">Total Bids: {job.bid_count}</p>
        </Link>
    );
};

export default Job;