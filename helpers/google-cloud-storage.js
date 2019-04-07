//this require line needs const to be {Storage} specfifically 
const {Storage} = require('@google-cloud/storage');
  
  const GOOGLE_CLOUD_PROJECT_ID = 'web3-asg2';
  const GOOGLE_CLOUD_KEYFILE = 'keyfile.json'; 
  
  const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
  });
  
 /**
   * Get public URL of a file. The file must have public access
   * @param {string} bucketName
   * @param {string} fileName
   * @return {string}
   */
  exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;