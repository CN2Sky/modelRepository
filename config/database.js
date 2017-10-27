module.exports = {

    'secret': 'testsecret',
    'database': 'mongodb://131.130.37.22:8101/n2sky',
    'options': {
        useMongoClient: true,
        db: {native_parser: true},
        server: {poolSize: 5},
        user: 'admin',
        pass: 'password'}

};