import Redis from "ioredis"

const redis = new Redis("rediss://default:gQAAAAAAAeVGAAIgcDEzM2IyMmU4NmVhZDM0ZjdhYWJiYWMyNjhiOGIzZmY2ZA@leading-toad-124230.upstash.io:6379");

export default redis