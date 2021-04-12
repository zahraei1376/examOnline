const Helpers = function (objectArray, property) {
//   var newArr = [] ;
  return objectArray.reduce(function (acc = [], obj) {
    // var key = obj[property];
    // if (!acc[key]) {
    //   acc[key] = [];
    // }
    acc.push(obj);
    return acc;
  },
{});
}

export default Helpers;