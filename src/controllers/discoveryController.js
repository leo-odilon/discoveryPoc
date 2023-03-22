const DiscoveryV2 = require('ibm-watson/discovery/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const version = '2020-08-30'
const instance = '0a8d8690-6344-4708-a199-f5c63eb1f7af'
const url = 'https://api.us-south.discovery.watson.cloud.ibm.com/instances/'
const apikey = 'Ebjm67ZRtu40zaiIOFz8tDobNrvDCvgxm-T3DvoayeR9'

exports.get = (req, res, next) => {

  new DiscoveryV2({
    version: version,
    authenticator: new IamAuthenticator({
        apikey: apikey,
    }),
    serviceUrl: url + instance,
  }).query({
    projectId,
    collectionIds: [collectionId],
    query: "como fizar a cadeirinha"
  }).then(data => {
    console.log(data)
  })

  res.status(201).send('Requisição recebida com sucesso!');
}

exports.post = (req, res, next) => {
  // console.log(req.body.projectID)
  let output = {
    quantidade: 0,
    result: []
  }
  let projectID = req.body.projectID;
  let collectionID = req.body.collectionID;
  let queryText = req.body.text
  let modelYear = req.body.modelYear

  new DiscoveryV2({
    version: version,
    authenticator: new IamAuthenticator({
        apikey: apikey,
    }),
    serviceUrl: url + instance,
  }).query({
    projectId: projectID,
    collectionIds: [collectionID],
    query: queryText,
    count: 5,
    filter: `metadata.Ano:${modelYear}`
  }).then(data => {
    output.quantidade = data.result.results.length
    // console.log(data.result.results.length)
    data.result.results.forEach(result => {
      console.log(result)
      output.result.push({
        partNumber: result.metadata.PartNumber,
        titulo: result.title,
        text: result.text,
        pagina: JSON.parse(result.extracted_metadata.text_mappings).text_mappings[0].page.page_number
      })
    })
  }).then(() => {
    res.status(201).json(output);
  })
  .catch(err => {
    res.status(401).send('Erro na requisição: ');
  })
  
  
};
exports.put = (req, res, next) => {
  let id = req.params.id;
  res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};
exports.delete = (req, res, next) => {
  let id = req.params.id;
  res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};