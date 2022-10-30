const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
        .then(()=>{console.log('Veritabanına Bağlanıldı')})
        .catch((err)=>{console.log('Veritabanına bağlanırken hata oluştu , Hata :')+err})