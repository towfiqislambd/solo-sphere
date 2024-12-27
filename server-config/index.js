require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://solo-sphere.netlify.app'
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' })
    }
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized Access' })
        }
        req.user = decoded;
        next();
    })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jtbwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function run() {
    try {
        const database = client.db('jobDB');
        const jobsCollection = database.collection('jobs')
        const bidsCollection = database.collection('bids')

        // Auth Related APIs
        app.post('/login', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' });
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ message: 'Login successful' })
        })
        app.post('/logout', async (req, res) => {
            res
                .clearCookie('token', {
                    maxAge: 0,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                })
                .send({ message: 'Logged out successfully' })
        })


        // Private APIs
        app.get('/bidsRequests/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { buyer_email: email };
            const bids = bidsCollection.find(query)
            const result = await bids.toArray()
            res.send(result)
        })
        app.get('/myBids/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { seller_email: email };
            if (req.user.email !== req.params.email) {
                return res.status(403).send({ message: 'Forbidden Access' })
            }
            const bids = bidsCollection.find(query)
            const result = await bids.toArray()
            res.send(result)
        })
        app.get('/myPostedJobs', verifyToken, async (req, res) => {
            const email = req.query.email;
            const query = { 'buyer.email': email }
            if (req.user.email !== req.query.email) {
                return res.status(403).send({ message: 'Forbidden Access' })
            }
            const jobs = jobsCollection.find(query)
            const result = await jobs.toArray()
            res.send(result)
        })
        app.get('/jobs/details/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await jobsCollection.findOne(query);
            res.send(result)
        })
        app.post('/jobs', verifyToken, async (req, res) => {
            const job = req.body;
            const result = await jobsCollection.insertOne(job);
            res.send(result)
        })


        // Open APIs
        app.get('/totalJobs', async (req, res) => {
            const totalJobs = await jobsCollection.estimatedDocumentCount();
            res.send({ totalJobs })
        })
        app.get('/all-jobs', async (req, res) => {
            const filter = req.query.filter;
            const search = req.query.search;
            const sort = req.query.sort;
            const page = parseInt(req.query.page)
            const size = parseInt(req.query.size)

            let query = {};
            let options = {};
            if (filter) {
                query = { category: filter }
            }
            if (search) {
                query = { title: { $regex: search, $options: 'i' } }
            }
            if (sort) {
                options = { sort: { deadline: sort === 'asc' ? 1 : -1 } }
            }
            const cursor = jobsCollection.find(query, options)
                .skip(page * size)
                .limit(size)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/jobs/viewApplications/:job_id', async (req, res) => {
            const id = req.params.job_id;
            const query = { id }
            const result = await bidsCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/jobs/bidsRequests/:job_id', async (req, res) => {
            const id = req.params.job_id;
            const query = { id }
            const result = await bidsCollection.find(query).toArray();
            res.send(result)
        })
        app.patch('/job-applications/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const data = req.body;
            const updateDoc = {
                $set: {
                    status: data.status
                }
            }
            const result = await bidsCollection.updateOne(filter, updateDoc)
            res.send(result)
        })
        app.post('/bids', async (req, res) => {
            const bid = req.body;
            const query = { seller_email: bid.seller_email, id: bid.id };
            const isAlreadyExist = await bidsCollection.findOne(query);
            if (isAlreadyExist) {
                return res.status(400).send('You have already placed this bid')
            }
            const result = await bidsCollection.insertOne(bid);
            const filter = { _id: new ObjectId(req.body.id) }
            const updateDoc = {
                $inc: { bid_count: 1 }
            }
            const updatedResult = await jobsCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally { }
}
run().catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Running Port is ${port}`)
})