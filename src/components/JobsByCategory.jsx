import axios from "axios";
import { useEffect, useState } from "react";
import Job from "./Job";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const JobsByCategory = () => {
    const [filter, setFilter] = useState('Web Development');
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get(`https://solo-sphere-iota.vercel.app/all-jobs?filter=${filter}`)
            .then(data => setJobs(data.data))
    }, [filter])

    return (
        <div className="my-10">
            <h2 className="text-3xl text-center font-semibold mb-2">Browse Jobs By Categories</h2>
            <p className="text-gray-500 md:w-3/5 mx-auto text-center mb-5">Three categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below.</p>
            <div className="mt-10">
                <Tabs>
                    <TabList style={{ width: "fit-content", margin: "0 auto" }}>
                        <Tab onClick={e => setFilter(e.target.innerText)}>Web Development</Tab>
                        <Tab onClick={e => setFilter(e.target.innerText)}>Graphic Design</Tab>
                        <Tab onClick={e => setFilter(e.target.innerText)}>Digital Marketing</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="grid mt-10 grid-cols-4 gap-y-8 gap-x-5">
                            {
                                jobs.map(job => <Job job={job} key={job._id}></Job>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid mt-10 grid-cols-4 gap-y-8 gap-x-5">
                            {
                                jobs.map(job => <Job job={job} key={job._id}></Job>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid mt-10 grid-cols-4 gap-y-8 gap-x-5">
                            {
                                jobs.map(job => <Job job={job} key={job._id}></Job>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default JobsByCategory;