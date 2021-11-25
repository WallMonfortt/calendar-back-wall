const mongoose = require('mongoose');

// !!!Renew DB!!! in cluster IP

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    //   {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true, // DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
    //   useCreateIndex: true,
    // }

    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('error a la hora de inicializar base de datos');
  }
}

module.exports = {
  dbConnection
};