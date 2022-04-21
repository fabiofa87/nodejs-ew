const util = require('util');



const getUser = () => {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve( {
                id: 1,
                name: 'John Doe',
                dateOdBirth: '01/01/1980'
            })
        }, 1000)
    })
}

const getPhone = (userId) => {
    return new Promise(function resolvePromise(resolve, reject){
      setTimeout(() => {
        return resolve( {
          ddd: 21,
          number: '123456789',
          userId: userId
        })
      }, 2000)
    })
}

const getAddress = (userId, callback) => {
    setTimeout(() => {
         return callback(null, {
            street: 'Dalvo Trombeta',
            number: 123
    }, 2000)
})}
const getAddressAsync = util.promisify(getAddress);
// const userPromise = getUser()


// userPromise
//     .then((user) => {
//         return getPhone(user.id)
//             .then(function resolvePhone(res){
//                 return  {
//                     user: {
//                         name: user.name,
//                         id: user.id,
//                     },
//                     phone: res
//                 }
//             })
//     })
//     .then((result) => {
//         const address = getAddressAsync(result.user.name)
//         return address.then(function resolveAddress(res){
//             return {
//                 user: result.user,
//                 phone: result.phone,
//                 address: res
//             }
//         })
//     })
//     .then((res) => {
//     console.log(`
//     Name: ${res.user.name},
//     Phone: (${res.phone.ddd}) ${res.phone.number},
//     Address: ${res.address.street}, ${res.address.number}
//     `)
// })
//     .catch((err) => {
//         console.error("something is wrong", err)})



// getUser(function resolveUser(error, user) {
//     if(error) {
//         console.error("Invalid user", error)
//         return
//     }
//     getPhone(user.id, function resolvePhone(error1, phone) {
//         if (error1) {
//             console.error("Invalid phone", error1)
//             return;
//         }
//     })
//
//         getAddress(user.id, function resolveAddress(error2, address){
//             if(error2) {
//                 console.error("Invalid address", error2)
//                 return;
//             }
//             console.log(`
//                 User: ${user.name}
//                 Phone: (${phone.ddd}) ${phone.phone}
//                 Address: ${address.street}, ${address.number}
//             `)
//             }
//      )
// })}
//

const main = async () => {
    try {
        console.time('main')
        const user = await getUser()
        // const phone = await getPhone(user.id)
        // const address = await getAddressAsync(user.id)
        const result = await Promise.all([
            getPhone(user.id),
            getAddressAsync(user.id)
        ])
        const [phone, address] = result
        console.log(`
        Async/Await
        Name: ${user.name},
        Phone: (${phone.ddd}) ${phone.number},
        Address: ${address.street}, ${address.number}
        `)
        console.timeEnd('main')
    }
    catch (e) {
        console.error("Invalid user", e)
    }
}

main();