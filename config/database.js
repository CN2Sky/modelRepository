module.exports = {

    'secret': 'testsecret',
    'database': 'mongodb://192.168.0.79:27017/n2sky',
    'options': {
        useMongoClient: true,
        db: {native_parser: true},
        server: {poolSize: 5},
        user: 'n2sky',
        pass: 'password'}

};