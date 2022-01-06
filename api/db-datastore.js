// Require GCloud Datastore
const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'paas-signoff'});

const kind = 'register';

function key(id) {
  return ds.key([kind, id]);
}

async function setEntity(reg, val) {
  const entity = {
    key: key(reg),
    data: { name: reg, val },
  }
  await ds.save(entity);
};

module.exports.get = async (reg) => {
  // Get the register
  let [data] = await ds.get(key(reg));
  if (data === undefined) {
    // If register doesn't exist:
    // Create register
    try {
      setEntity(reg, 0);
    } catch (e) {
      return e;
    }
    // Return value
    [data] = await ds.get(key(reg));
  }
  return data.val;
}
