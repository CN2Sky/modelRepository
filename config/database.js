const db_endpoint = "mongodb://192.168.0.79:27017/n2sky";
// const db_endpoint = "mongodb://192.168.0.104:27017/n2sky";

module.exports = {

    'secret': 'testsecret',
    'database': db_endpoint,
    'options': {
        useMongoClient: true,
        db: {native_parser: true},
        server: {poolSize: 5},
        user: 'n2sky',
        pass: 'password'}

};