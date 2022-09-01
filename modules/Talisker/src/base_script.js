const TASKS = [
{
    "id":"cpupercentused",
    "name":"Account1",
    "accountId":"3148856", 
    "selector":"%CPU Used",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT average(cpuPercent) as '%CPU Used' from SystemSample facet entityName, acccountId"
    //SELECT cpuPercent as '%CPU Used', entityName, accountId from SystemSample
},
{
    "id":"mempercentused",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"%Mem Used",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT average(memoryUsedPercent) as '%Mem Used' FROM SystemSample facet entityName"
    //SELECT memoryUsedPercent, entityName FROM SystemSample
},
{
    "id":"diskpercentused",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"%Disk Used",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT average(diskUsedPercent) as '%Disk Used' from SystemSample facet entityName"
    //SELECT average(diskUsedPercent) from SystemSample facet entityName 
},
{
    "id":"inpercentused",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"In-KB/sec",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT average(NetworkSample.receiveBytesPerSecond/1000) as 'In-KB/sec' FROM SystemSample, NetworkSample, ProcessSample since 1 day ago facet hostname"
    //SELECT average(NetworkSample.receiveBytesPerSecond/1000) as 'In-KB/sec', average(NetworkSample.transmitBytesPerSecond/1000) as 'Out-KB/sec' FROM SystemSample, NetworkSample, ProcessSample since 1 day ago facet hostname
},
{
    "id":"outpercentused",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"Out-KB/sec",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT average(NetworkSample.transmitBytesPerSecond/1000) as 'Out-KB/sec' FROM SystemSample, NetworkSample, ProcessSample since 1 day ago facet hostname"
    //SELECT average(NetworkSample.receiveBytesPerSecond/1000) as 'In-KB/sec', average(NetworkSample.transmitBytesPerSecond/1000) as 'Out-KB/sec' FROM SystemSample, NetworkSample, ProcessSample since 1 day ago facet hostname
},
{
    "id":"syntheticcheck",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"synthetics",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT count(*) as 'synthetics' FROM SyntheticCheck where result = 'FAILED' FACET monitorName since 1 hour ago"
    //SELECT * FROM SyntheticCheck where result ='FAILED' 
},
{
    "id":"podstate",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"podstate",
    "chaining":"NONE", 
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT count(*) as 'podstate' FROM K8sPodSample where status !='Running' AND status !='Succeeded' FACET podName,status SINCE 30 MINUTES AGO" 
    //SELECT latest(status) as 'Status', max(timestamp) as 'Timestamp' from K8sPodSample WHERE status NOT IN ('Running', 'Succeeded') facet clusterName, namespace 
},
{
    "id":"nodestatusready",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"nodestatusready",
    "chaining":"NONE", 
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT latest(`condition.Ready`) as 'nodestatusready' FROM K8sNodeSample WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1)) FACET nodeName SINCE 30 minutes AGO"
    //SELECT latest(clusterName) FROM (SELECT uniqueCount(displayName) as 'nodestatus' FROM K8sNodeSample FACET clusterName, nodeName, displayName, cases(WHERE condition.Ready = 1 as 'True',WHERE condition.Ready=0 as 'False',WHERE condition.Ready=-1 as 'Unknown') as 'Ready', cases(WHERE condition.MemoryPressure=0 as 'False', WHERE condition.MemoryPressure=1 as 'True',WHERE condition.MemoryPressure=-1 as 'Unknown') as 'MemoryPressure' , cases(WHERE condition.DiskPressure = 1 as 'True',WHERE condition.DiskPressure=0 as 'False',WHERE condition.DiskPressure=-1 as 'Unknown') as 'DiskPressure' , cases(WHERE condition.PIDPressure = 1 as 'True',WHERE condition.PIDPressure=0 as 'False',WHERE condition.PIDPressure=-1 as 'Unknown') as 'PIDPressure' WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1))) WHERE Ready IS NOT NULL ORDER BY displayName FACET displayName, Ready, MemoryPressure, DiskPressure, PIDPressure WHERE clusterName IN ('pixie-auto-telemetry')
},
{
    "id":"nodestatuspid",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"nodestatuspid",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT latest(`condition.PIDPressure`) as 'nodestatuspid' FROM K8sNodeSample WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1)) FACET nodeName SINCE 30 minutes AGO"
    //SELECT latest(clusterName) FROM (SELECT uniqueCount(displayName) as 'nodestatus' FROM K8sNodeSample FACET clusterName, nodeName, displayName, cases(WHERE condition.Ready = 1 as 'True',WHERE condition.Ready=0 as 'False',WHERE condition.Ready=-1 as 'Unknown') as 'Ready', cases(WHERE condition.MemoryPressure=0 as 'False', WHERE condition.MemoryPressure=1 as 'True',WHERE condition.MemoryPressure=-1 as 'Unknown') as 'MemoryPressure' , cases(WHERE condition.DiskPressure = 1 as 'True',WHERE condition.DiskPressure=0 as 'False',WHERE condition.DiskPressure=-1 as 'Unknown') as 'DiskPressure' , cases(WHERE condition.PIDPressure = 1 as 'True',WHERE condition.PIDPressure=0 as 'False',WHERE condition.PIDPressure=-1 as 'Unknown') as 'PIDPressure' WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1))) WHERE Ready IS NOT NULL ORDER BY displayName FACET displayName, Ready, MemoryPressure, DiskPressure, PIDPressure WHERE clusterName IN ('pixie-auto-telemetry')
},
{
    "id":"nodestatusdisk",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"nodestatusdisk",
    "chaining":"NONE", 
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT latest(`condition.DiskPressure`) as 'nodestatusdisk' FROM K8sNodeSample WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1)) FACET nodeName SINCE 30 minutes AGO"
    //SELECT latest(clusterName) FROM (SELECT uniqueCount(displayName) as 'nodestatus' FROM K8sNodeSample FACET clusterName, nodeName, displayName, cases(WHERE condition.Ready = 1 as 'True',WHERE condition.Ready=0 as 'False',WHERE condition.Ready=-1 as 'Unknown') as 'Ready', cases(WHERE condition.MemoryPressure=0 as 'False', WHERE condition.MemoryPressure=1 as 'True',WHERE condition.MemoryPressure=-1 as 'Unknown') as 'MemoryPressure' , cases(WHERE condition.DiskPressure = 1 as 'True',WHERE condition.DiskPressure=0 as 'False',WHERE condition.DiskPressure=-1 as 'Unknown') as 'DiskPressure' , cases(WHERE condition.PIDPressure = 1 as 'True',WHERE condition.PIDPressure=0 as 'False',WHERE condition.PIDPressure=-1 as 'Unknown') as 'PIDPressure' WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1))) WHERE Ready IS NOT NULL ORDER BY displayName FACET displayName, Ready, MemoryPressure, DiskPressure, PIDPressure WHERE clusterName IN ('pixie-auto-telemetry')
},
{
    "id":"nodestatusmem",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"nodestatusmem",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT latest(`condition.MemoryPressure`) as 'nodestatusmem' FROM K8sNodeSample WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1)) FACET nodeName SINCE 30 MINUTES AGO"
    //SELECT latest(clusterName) FROM (SELECT uniqueCount(displayName) as 'nodestatus' FROM K8sNodeSample FACET clusterName, nodeName, displayName, cases(WHERE condition.Ready = 1 as 'True',WHERE condition.Ready=0 as 'False',WHERE condition.Ready=-1 as 'Unknown') as 'Ready', cases(WHERE condition.MemoryPressure=0 as 'False', WHERE condition.MemoryPressure=1 as 'True',WHERE condition.MemoryPressure=-1 as 'Unknown') as 'MemoryPressure' , cases(WHERE condition.DiskPressure = 1 as 'True',WHERE condition.DiskPressure=0 as 'False',WHERE condition.DiskPressure=-1 as 'Unknown') as 'DiskPressure' , cases(WHERE condition.PIDPressure = 1 as 'True',WHERE condition.PIDPressure=0 as 'False',WHERE condition.PIDPressure=-1 as 'Unknown') as 'PIDPressure' WHERE (condition.Ready IN (0,-1) OR condition.MemoryPressure IN (1,-1) OR condition.DiskPressure IN (1,-1) OR condition.PIDPressure IN (1,-1))) WHERE Ready IS NOT NULL ORDER BY displayName FACET displayName, Ready, MemoryPressure, DiskPressure, PIDPressure WHERE clusterName IN ('pixie-auto-telemetry')
},
{
    "id":"podrestart",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"podrestart",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT max(restartCount) - min(restartCount) as 'podrestart' FROM K8sContainerSample FACET reason,podName,namespace"
    //SELECT max(restartCount) - min(restartCount), latest(reason) FROM K8sContainerSample FACET podName,namespace
},
{
    "id":"podrestartreason",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"podrestartreason",
    "chaining":"NONE", 
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT average(restartCount) as 'podrestartreason' FROM K8sContainerSample FACET podName,namespace,reason SINCE 1 hour ago" 
    //SELECT max(restartCount) - min(restartCount), latest(reason) FROM K8sContainerSample FACET podName,namespace
},
{
    "id":"transactionerror",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"value",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT percentage(count(*), WHERE error IS true) as value FROM Transaction facet appName  since 30 minutes ago" 
    //PROVIDED DIRECTLY BY ERKIN may related to Karun SELECT count(*) FROM Transaction FACET appName SINCE 30 MINUTES AGO
},
{
    "id":"transactionapperror",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"transactionapperror",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT count(*) as 'transactionapperror' FROM Transaction FACET appName SINCE 30 MINUTES AGO" 
    //SELECT count(*) FROM TransactionError FACET appName SINCE 1 day ago
},
{
    "id":"avgpageload",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"avgpageload",
    "chaining":"NONE",
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT average(duration) as 'avgpageload' FROM BrowserInteraction where category = 'Initial page load' SINCE 1 day ago facet appName limit max" // default limited to 10 results
    //SELECT average(duration) as 'AVG PageLoad',percentile(duration, 50) as '%' FROM BrowserInteraction  where category = 'Initial page load' SINCE 1 day ago
},
{
    "id":"avgpageloadpercentile",
    "name":"Account1",
    "accountId":"3148856",
    "selector":"avgpageloadpercentile.50",
    "chaining":"NONE", 
    "fillNullValue": 0,
    "invertResult": false,
    "ingestType": "metric",
    "query":"SELECT percentile(duration,50) as 'avgpageloadpercentile' FROM BrowserInteraction where category = 'Initial page load' SINCE 1 day ago facet appName limit max" // default limited to 10 results
    //SELECT average(duration) as 'AVG PageLoad',percentile(duration, 50) as '%' FROM BrowserInteraction  where category = 'Initial page load' SINCE 1 day ago
}
] 

/*
---------------------------------
EXAMPLE COMBINING DATA NRQL QUERY
---------------------------------
SELECT filter(latest(`talisker.value`), WHERE `talisker.id` = 'avgpageloadpercentile') as 'Percentile(50)', filter(latest(`talisker.value`), WHERE `talisker.id` = 'avgpageload') as 'Average'   FROM Metric WHERE `talisker.id` = 'avgpageloadpercentile' OR talisker.id ='avgpageload' FACET `talisker.facet.appName` SINCE 30 MINUTES AGO limit
*/

const MONITOR_NAME="Account_1"   //the monitor name, only relevant if deploying more than once
const MONITOR_ID="Account_1_Monitor_ID" //the monitor id, only relevant if deploying more than once
const NAMESPACE ="talisker"         // metric details are prefixed with this, best to leave as is
const NEWRELIC_DC = ""            // datacenter for account - US or EU
const ACCOUNT_ID = ""         // Account ID (required if ingesting events)
// let INSERT_KEY="",QUERY_KEY=""
// INSERT_KEY=$secure.YOUR_SECURE_CRED_CONTAINING_INSERT_KEY
// QUERY_KEY=$secure.YOUR_SECURE_CRED_CONTAINING_QUERY_KEY


/*
* End of example-------------
*/


// Configurations
const TALISKER_VERSION="1"
const VERBOSE_LOG=true          // Control how much logging there is
const DEFAULT_TIMEOUT = 5000    // You can specify a timeout for each task

const INGEST_EVENT_ENDPOINT = NEWRELIC_DC === "US" ? "insights-collector.eu01.nr-data.net" : "insights-collector.newrelic.com" 
const INGEST_METRIC_ENDPOINT = NEWRELIC_DC === "US" ? "metric-api.eu.newrelic.com" : "metric-api.newrelic.com" 
const GRAPHQL_ENDPOINT = NEWRELIC_DC === "" ? "api.eu.newrelic.com" : "api.newrelic.com" 
const INGEST_EVENT_TYPE=`${NAMESPACE}Sample` //events are stored in the eventtype

let assert = require('assert');
let _ = require("lodash");
let RUNNING_LOCALLY = true



/*
*  ========== LOCAL TESTING CONFIGURATION ===========================
*  This section allows you to run the script from your local machine
*  mimicking it running in the new relic environment. Much easier to develop!
*/

const IS_LOCAL_ENV = typeof $http === 'undefined';
if (IS_LOCAL_ENV) {  
  RUNNING_LOCALLY=true
  var $http = require("request");       //only for local development testing
  var $secure = {}                      //only for local development testing
  QUERY_KEY=""  //NRAK...
  INSERT_KEY=""  //...NRAL

  console.log("Running in local mode",true)
} 

/*
*  ========== SOME HELPER FUNCTIONS ===========================
*/


/*
* log()
*
* A logger, that logs only if verbosity is enabled
*
* @param {string|object} data - the data to log out
* @param {bool} verbose - if true overrides global setting
*/
const log = function(data, verbose) {
    if(VERBOSE_LOG || verbose) { console.log(data) }
}

/*
* asyncForEach()
*
* A handy version of forEach that supports await.
* @param {Object[]} array     - An array of things to iterate over
* @param {function} callback  - The callback for each item
*/
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
  

/*
* genericServiceCall()
* Generic service call helper for commonly repeated tasks
*
* @param {number} responseCodes  - The response code (or array of codes) expected from the api call (e.g. 200 or [200,201])
* @param {Object} options       - The standard http request options object
* @param {function} success     - Call back function to run on successfule request
*/
const  genericServiceCall = function(responseCodes,options,success) {
    !('timeout' in options) && (options.timeout = DEFAULT_TIMEOUT) //add a timeout if not already specified 
    let possibleResponseCodes=responseCodes
    if(typeof(responseCodes) == 'number') { //convert to array if not supplied as array
      possibleResponseCodes=[responseCodes]
    }
    return new Promise((resolve, reject) => {
        $http(options, function callback(error, response, body) {
        if(error) {
            console.log("Request error:",error)
            console.log("Response:",response)
            console.log("Body:",body)
            reject(`Connection error on url '${options.url}'`)
        } else {
            if(!possibleResponseCodes.includes(response.statusCode)) {
                let errmsg=`Expected [${possibleResponseCodes}] response code but got '${response.statusCode}' from url '${options.url}'`
                reject(errmsg)
            } else {
                resolve(success(body,response,error))
            }
          }
        });
    })
  }

/*
* setAttribute()
* Sets a custom attribute on the synthetic record
*
* @param {string} key               - the key name
* @param {Strin|Object} value       - the value to set
*/
const setAttribute = function(key,value) {
    if(!RUNNING_LOCALLY) { //these only make sense when running on a minion
        $util.insights.set(key,value)
    } else {
        //log(`Set attribute '${key}' to ${value}`)
    }
}


/*
* sendDataToNewRelic()
* Sends a metrics payload to New Relic
*
* @param {object} data               - the payload to send
*/
const sendDataToNewRelic = async (data) =>  {
    let request = {
        url: `https://${INGEST_METRIC_ENDPOINT}/metric/v1`,
        method: 'POST',
        json: true,
        headers :{
            "Api-Key": INSERT_KEY
        },
        body: data
    }
    log(`\nSending ${data[0].metrics.length} records to NR metrics API...`)
    return genericServiceCall([200,202],request,(body,response,error)=>{
        if(error) {
            log(`NR Post failed : ${error} `,true)
            return false
        } else {
            return true
        }
    })
}

/*
* sendEventDataToNewRelic()
* Sends a event payload to New Relic
*
* @param {object} data               - the payload to send
*/
const sendEventDataToNewRelic = async (data) =>  {
    let request = {
        url: `https://${INGEST_EVENT_ENDPOINT}/v1/accounts/${ACCOUNT_ID}/events`,
        method: 'POST',
        json: true,
        headers :{
            "Api-Key": INSERT_KEY
        },
        body: data
    }
    log(`\nSending ${data.length} records to NR events API...`)
    return genericServiceCall([200,202],request,(body,response,error)=>{
        if(error) {
            log(`NR Post failed : ${error} `,true)
            return false
        } else {
            return true
        }
    })
}



async function runtasks(tasks) {
    let TOTALREQUESTS=0,SUCCESSFUL_REQUESTS=0,FAILED_REQUESTS=0
    let FAILURE_DETAIL = []
    let metricsInnerPayload=[]
    let eventsInnerPayload=[]
    let previousTaskResult=0
    await asyncForEach(tasks, async (task) => {


        const graphQLQuery=`{
            actor {
              nrql(accounts: [${task.accountId}], query: "${task.query}") {
               metadata {
                facets
               }
               results
              }
            }
          }
          `
        const options =  {
                url: `https://${GRAPHQL_ENDPOINT}/graphql`,
                method: 'POST',
                headers :{
                  "Content-Type": "application/json",
                  "API-Key": QUERY_KEY
                },
                body: JSON.stringify({ "query": graphQLQuery})
            }
    
        TOTALREQUESTS++
        log(`\n[Task ${task.id}]---------------`)
        await genericServiceCall([200],options,(body)=>{return body})
        .then((body)=>{
            try {
                bodyJSON = JSON.parse(body)

       
                let resultData={}
                let result=null
                let facetResult = false
                //deal with compare with queries
                if(bodyJSON.data.actor.nrql.results.length==2 && bodyJSON.data.actor.nrql.results[0].comparison && bodyJSON.data.actor.nrql.results[0].comparison) {
                    let previous=_.get(bodyJSON.data.actor.nrql.results.find((item)=>{return item.comparison==="previous"}),task.selector)
                    let current=_.get(bodyJSON.data.actor.nrql.results.find((item)=>{return item.comparison==="current"}),task.selector)
                    result=((current-previous)/current) * 100
                } else if(bodyJSON.data.actor.nrql.metadata &&
                        bodyJSON.data.actor.nrql.metadata.facets && 
                        bodyJSON.data.actor.nrql.metadata.facets.length > 0) {
                        //faceted data
                        facetResult=true
                        result=bodyJSON.data.actor.nrql.results.map((result)=>{

                            let facetArr={}

                            bodyJSON.data.actor.nrql.metadata.facets.forEach((facet,idx)=>{

                                if(bodyJSON.data.actor.nrql.metadata.facets.length > 1) {
                                    if(result.facet[idx]!==null) {
                                        facetArr[`${NAMESPACE}.facet.${facet}`]=result.facet[idx]
                                    } 
                                } else {
                                    //single facets have a different shape to multi facets!
                                    if(result.facet!==null) {
                                        facetArr[`${NAMESPACE}.facet.${facet}`]=result.facet
                                    } 
                                }

                            })
                           
                            let resultValue=_.get(result,task.selector)
                            if (resultValue==undefined) {
                                console.log(`Error: Selector '${task.selector}' was not found in ${JSON.stringify(result)}`)
                            }
                            return {
                                value: resultValue,
                                facets: facetArr
                            }
                        })
                        
                        
                } else {
                     //simple single result data
                    resultData=bodyJSON.data.actor.nrql.results[0]
                    result=_.get(resultData, task.selector)
                }

                const transformData = (data) => {
                    let transformedResult=data
                    //deal with null values (zero default unless specified)
                    if(data===null) {
                        transformedResult = task.fillNullValue!==undefined ? task.fillNullValue : 0
                    }

                    //Invert the result, alert conditions can only use positive thresholds :(
                    if(data!==undefined && task.invertResult===true) {
                        transformedResult=0-data
                    } 
                    return transformedResult
                }

                
                if(Array.isArray(result)){
                    result=result.map((x)=>{x.value=transformData(x.value); return x;})
                } else {
                result=transformData(result)
                //Check for chaining adjustments (not valid for faceted data)
                if(result!==undefined && task.chaining && task.chaining!="NONE") {
                    log(`Chaining mode [${task.chaining}]: current result: ${result}, previous task result: ${previousTaskResult}`)
                    switch (task.chaining) {
                        case "PERC_DIFF":
                            const percDiff = ((result - previousTaskResult)/result) *100
                            result=percDiff
                            break;
                        case "DIFF":
                            result = result - previousTaskResult
                            break;
                        case "SUM":
                            result = result + previousTaskResult
                            break;
                    }
                }
            }

  
                if(result!==undefined) {
                    SUCCESSFUL_REQUESTS++
                    log(`Task succeeded with result: ${Array.isArray(result) ? `(faceted results: ${result.length})`: JSON.stringify(result)}`)
                    previousTaskResult = result //support for chaining

                    const constructPayload = (value,facets) =>{

                        let attributes={}
                        attributes[`${NAMESPACE}.id`]=task.id
                        attributes[`${NAMESPACE}.name`]=task.name
                        attributes[`${NAMESPACE}.inverted`]=(task.invertResult===true)? true : false

                        if(facets) {
                            attributes[`${NAMESPACE}.faceted`] = true
                            attributes=Object.assign(attributes, facets)
                        }                        


                        if(task.ingestType && task.ingestType === "event") {
                            //Event payload
                            let eventPayload = {
                                eventType: INGEST_EVENT_TYPE,
                                name: `${NAMESPACE}.value`,
                                value: value,
                                timestamp: Math.round(Date.now()/1000)
                            }
                            eventPayload=Object.assign(eventPayload, attributes)
                            eventsInnerPayload.push(eventPayload)
                        } else 
                        {
                            //Metric payload
                            let metricPayload={
                                name: `${NAMESPACE}.value`,
                                type: "gauge",
                                value: value,
                                timestamp: Math.round(Date.now()/1000),
                                attributes: attributes
                            }
                            
                            metricsInnerPayload.push(metricPayload) 
                        }
                    }

                    if(Array.isArray(result)){
                        result.forEach((res)=>{
                            if(res.value!==undefined) {
                                constructPayload(res.value,res.facets)
                            } 
                        })
                    }
                    else {
                        constructPayload(result)
                    }

                     
                } else {
                    FAILED_REQUESTS++
                    log(`Task '${task.name}' failed, no field returned by selector '${task.selector}' in json:  ${JSON.stringify(resultData)}`)
                }

            } catch(e){
                FAILED_REQUESTS++
                log(`Task '${task.name}' failed JSON parse error: ${e} `,true)
                FAILURE_DETAIL.push(`'${task.name}' failed JSON parse: ${e} `)
            }
          
        })
        .catch((e)=>{
            FAILED_REQUESTS++
            log(`Task '${task.name}' failed with error: ${e} `,true)
            FAILURE_DETAIL.push(`'${task.name}' failed with error: ${e} `)
        })
    })


    //Prepare metric/event payloads for New Relic ingest

    //metrics
    if(metricsInnerPayload && metricsInnerPayload.length > 0) {
        let commonMetricBlock={"attributes": {}}
        commonMetricBlock.attributes[`${NAMESPACE}.monitorName`]=MONITOR_NAME
        commonMetricBlock.attributes[`${NAMESPACE}.monitorId`]=MONITOR_ID
        commonMetricBlock.attributes[`talisker.version`]=TALISKER_VERSION
    
        let metricsPayLoad=[{ 
            "common" : commonMetricBlock,
            "metrics": metricsInnerPayload
        }]
    
        let NRPostStatus = await sendDataToNewRelic(metricsPayLoad)
        if( NRPostStatus === true ){
            setAttribute("nrPostStatus","success")
            log("NR Metrics Post successful")   
        } else {
            setAttribute("nrPostStatus","failed")
            log("NR Metrics Post failed")   
        }
    }
    //events
    if(eventsInnerPayload && eventsInnerPayload.length > 0) {

        //add talisker runtime meta data
        eventsInnerPayload.forEach((event)=>{
            event[`${NAMESPACE}.monitorName`]=MONITOR_NAME
            event[`${NAMESPACE}.monitorId`]=MONITOR_ID
            event[`talisker.version`]=TALISKER_VERSION
        })
    
        let NRPostStatus = await sendEventDataToNewRelic(eventsInnerPayload)
        if( NRPostStatus === true ){
            setAttribute("nrPostEventStatus","success")
            log("NR Events Post successful")   
        } else {
            setAttribute("nrPostEventStatus","failed")
            log("NR Events Post failed")   
        }
    }

   

    log(`\n\n-----\nAttempted: ${TOTALREQUESTS}, Succeded ${SUCCESSFUL_REQUESTS}, Failed: ${FAILED_REQUESTS}`,true)
    
    //record the statistics about the success rates as custom attributes on the SyntheticCheck event type
    setAttribute("tasksAttempted",TOTALREQUESTS)
    setAttribute("tasksSucceeded",SUCCESSFUL_REQUESTS)
    setAttribute("tasksFailed",FAILED_REQUESTS)
    setAttribute("tasksSuccessRate",((SUCCESSFUL_REQUESTS/TOTALREQUESTS)*100).toFixed(2))
    setAttribute("failureDetail",FAILURE_DETAIL.join("; "))
    return FAILED_REQUESTS
}


/*
*  ========== RUN THE tasks ===========================
*/



try {
    setAttribute("totalTasksConfigured",TASKS.length)
    runtasks(TASKS).then((failed)=>{
        setAttribute("testRunComplete","YES") //to ensure we've not timed out or broken somehow
        if(failed > 0 ) {
            setAttribute("taskResult","FAILED")
            assert.fail('Not all tasks passed or ingest post failed') //assert a failure so that NR sees it as a failed test
        } else {
            setAttribute("taskResult","SUCCESS")
            assert.ok("All tasks passed")   
        }
    })

} catch(e) {
    console.log("Unexpected errors: ",e)
}
  