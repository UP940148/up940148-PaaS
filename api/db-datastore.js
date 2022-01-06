// Require GCloud Datastore
const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'paas-signoff'});

const kind = 'register';

module.exports.get = async (reg) => {
  // Get the register
  const [data] = await ds.get(key(id));
  console.log(data);
  return true;
}
