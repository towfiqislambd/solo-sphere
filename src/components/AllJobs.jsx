import axios from "axios";
import { useEffect, useState } from "react";
import Job from "./Job";

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');

    // Pagination Config
    const [totalJobsCount, setTotalJobCount] = useState(null)
    useEffect(() => {
        axios.get('https://solo-sphere-iota.vercel.app/totalJobs')
            .then(data => {
                const { totalJobs } = data.data
                setTotalJobCount(totalJobs)
            })
    }, [])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const numberOfPages = Math.ceil(totalJobsCount / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]
    const handleItemsPerPage = e => {
        setItemsPerPage(parseInt(e.target.value))
        setCurrentPage(0)
    }
    const handlePrevPage = e => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Filter, Search, Sort, Reset Config
    useEffect(() => {
        axios.get(`https://solo-sphere-iota.vercel.app/all-jobs?filter=${filter}&search=${search}&sort=${sort}&page=${currentPage}&size=${itemsPerPage}`)
            .then(data => setJobs(data.data));
    }, [filter, search, sort, currentPage, itemsPerPage]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target.title.value);
    }
    const handleReset = () => {
        setSearch('')
        setFilter('')
        setSort('')
    }
    return (
        <div className="my-10">
            <form onSubmit={handleSubmit} className="flex items-center my-3 justify-center gap-10">
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-lg px-4 py-3"
                    defaultValue="Filter By Category"
                    name="category"
                >
                    <option disabled>Filter By Category</option>
                    <option>Web Development</option>
                    <option>Graphic Design</option>
                    <option>Digital Marketing</option>
                </select>
                <div className="relative">
                    <input
                        className="input w-80 input-bordered"
                        type="text"
                        placeholder="Enter Job Title"
                        name="title"
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="bg-gray-700 cursor-pointer absolute right-1 top-1 text-white px-3 py-2 rounded-lg"
                    />
                </div>
                <select
                    onChange={(e) => setSort(e.target.value)}
                    defaultValue="Sort By Deadline"
                    className="border rounded-lg px-4 py-3"
                    name="sort"
                >
                    <option disabled>Sort By Deadline</option>
                    <option value='dsc'>Descending Order</option>
                    <option value='asc'>Ascending Order</option>
                </select>
                <input
                    onClick={handleReset}
                    type="reset"
                    value="Reset"
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg"
                />
            </form>
            <div className="grid mt-14 grid-cols-4 gap-y-8 gap-x-5">
                {
                    jobs.map(job => <Job job={job} key={job._id}></Job>)
                }
            </div>
            <div className="pagination">
                <button id='prevBtn' onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button className={currentPage === page ? 'active' : ''} onClick={() => setCurrentPage(page)} key={page}>{page}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
                <select onChange={handleItemsPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default AllJobs;
