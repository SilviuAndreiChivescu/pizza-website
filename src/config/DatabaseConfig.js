const password = process.env.MONGODB_URI;
const mongoURL = `mongodb+srv://Andrew:${password}@medieval.zxguo.mongodb.net/medieval?retryWrites=true&w=majority`;

module.exports = { mongoURL };
