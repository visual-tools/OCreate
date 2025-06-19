if (! self.atApplication) self.atApplication ={};

 atApplication.namespace =
      (object, address, createOnSearch) =>
      { if (createOnSearch === undefined) createOnSearch = true;
        if (!createOnSearch && !object)
        { return atApplication.namespace.NotFound;
        }
        if (!address) address = "";
        let current = object;
        let addressList = address.split(".");
        for (var addressItem of addressList)
        { if (! current.hasOwnProperty(addressItem))
          { if (! createOnSearch) return atApplication.namespace.NotFound;
            current[addressItem] = {};
          }
          current = current[addressItem];
        }
        return current;
      };
atApplication.ls = function
      (listOfStuff)
      {
        let argumentList = Array.from(arguments);

        // var useConsole;
        // if (arguments[0].constructor == require("console").Console )
        // { useConsole = argumentList.shift();
        // }
        // else
        // { useConsole = console;
        // }

        for (thing of argumentList)
        { console.log(thing);
        }
      }
atApplication.getTimestampNanos =
() =>
{ return  (
            ( BigInt
              ( Math.round
                (
                  ( performance.now() - atApplication.getTimestampNanos.startTime.relative)
                  * 100000
                )
              ) + atApplication.getTimestampNanos.startTime.absolute
            ).toString().padStart(40,"0")
          );
}
atApplication.namespace(atApplication.getTimestampNanos, "startTime").absolute = BigInt(Date.now())         * 1000000n;
atApplication.namespace(atApplication.getTimestampNanos, "startTime").relative = performance.now();


atApplication.test            = {};
atApplication.test.namespace  = atApplication.namespace;
{

        let atRoot = atApplication.test;

        atRoot.isObject           = (item) => { return item === Object(item) };
        atRoot.isObject_notArray  = (item) => { return atRoot.isObject(item) && !Array.isArray(item); }
        atRoot.isArray            = (item) => { return Array.isArray(item) }
        atRoot.isString           = (item) => { return Object.prototype.toString.call(item) === "[object String]" };

        atRoot.ls     = atApplication.ls;


        atRoot.namespace.NotFound = {"namespaceFunctionConstant": "NotFound"};
        atRoot.namespace.isNotFound = function(value)
        { let toReturn;

          toReturn = atRoot.isObject_notArray(value) && value.namespaceFunctionConstant === "NotFound";
          // try
          // {
          //   toReturn = JSON.stringify(value) === JSON.stringify(atRoot.namespace.NotFound);
          // }
          // catch (error)
          // { if ( error instanceof TypeError && error.message === "Converting circular structure to JSON" )
          //   { toReturn = false
          //   }
          //   else
          //   { throw error;
          //   }
          // }

          return toReturn;
        };
        atRoot.namespace.traverse = function(traveller)
        {
          let object  = traveller.object;
          let address = traveller.address;

          if (object === undefined || object === null || ! atRoot.isObject(object) )
          { let errorMessage = "@: ERROR: atSrc: namespace: getIfExists: object : atRoot Object is not a valid namespace root object";
            atRoot.ls (errorMessage, { "object": object, "address": address} )
            throw new Error(errorMessage);
          }

          if (address === null)
          { traveller.toReturn = object;
            return;
          }
          if (address === undefined || !atRoot.isString(address) )
          { let errorMessage = "@: ERROR: atSrc: namespace: getIfExists: address : atRoot address is not a valid address string";
            atRoot.ls(errorMessage, { "object": object, "address": address} )
            throw new Error(errorMessage+": "+address);
          }

          if (traveller.debugging === true) debugger;

          traveller.addressList = address.split(".");

          traveller.returnNow = false;
          delete traveller.toReturn;

          traveller.current = traveller.object;
          traveller.addressListLength = traveller.addressList.length;
          traveller.index = -1;
          for ( traveller.addressComponent of traveller.addressList )
          { traveller.index ++;
            traveller.next = traveller.current[traveller.addressComponent];
            traveller.finalAddressComponent = traveller.index >= traveller.addressListLength -1;
            traveller.func(traveller);
            if (traveller.returnNow === true) return traveller.toReturn;
            traveller.current = traveller.next;
          }
          throw new Error("@: ERROR: atSrc: namespace: traverse: loop terminated without returning - atRoot should never happen");
        };
        atRoot.namespace.getIfExists_callback = function(object, address, found, notFound)
        { let toReturn = atRoot.namespace.getIfExists(object, address);

          if      (! atRoot.namespace.isNotFound(toReturn) && isFunction(found)   )
          { return found(toReturn);
          }
          else if (  atRoot.namespace.isNotFound(toReturn) && isFunction(notFound))
          { return notFound(toReturn);
          }
          return toReturn;
        };
        atRoot.namespace.getIfExists = function(object, address, traveller)
        {
          if (traveller === undefined || traveller === null) traveller = {};

          if (traveller.debugging === true) debugger;

          traveller.object  =   object;
          traveller.address =   address;
          traveller.func    =
            ( (traveller) =>
              {
                if (traveller.next                   === undefined )
                { traveller.returnNow = true;
                  traveller.toReturn  = atRoot.namespace.NotFound;
                }
                else if (traveller.finalAddressComponent  === true      )
                { traveller.returnNow = true;
                  traveller.toReturn  = traveller.next;
                }
              }
            );
          atRoot.namespace.traverse(traveller);
          return traveller.toReturn;
        };
        atRoot.namespace.getMustExist = function(object, address)
        { const toReturn = atRoot.namespace.getIfExists(object, address);
          if (toReturn === atRoot.namespace.NotFound)
          { let debuggingOutput =
                { "propertyNotFound": {"address": address, "object": object } };
            atRoot.ls("@: ERROR: namespace.getMustExist: ",  debuggingOutput);
            throw new Error("@: namespace.getMustExist: property \""+address+"\" not found on [object]");
          }
          return toReturn;
        };
        atRoot.namespace.rm = function(object, address)
        {
          if (address === undefined || address === null)
          { throw new Error("@: atSrc: namespace: rm: setting the address to '@: "+address+"' implies setting the containing object, which is impossible: "+address);
          }


          let toReturn = atRoot.namespace.getIfExists(object, address);


          if (! atRoot.namespace.isNotFound(toReturn) )
          {
            let addressList                     = address.split(".");
            let targetLeafAddressComponent      = addressList.pop();

            let targetContainer = object;
            if (addressList.length > 0)
            { targetContainer = namespace.getMustExist(object, addressList.join("."));
            }
            toReturn = namespace.getMustExist(targetContainer, targetLeafAddressComponent);
            delete targetContainer[targetLeafAddressComponent];

          }


          return toReturn;
        }
        atRoot.namespace.leafNode = function(object, address, leafNode)
        { let toReturn;
          let traveller;

          traveller = { "overwrite": false};

          try
          { toReturn = atRoot.namespace.setValue(object, address, leafNode, traveller);
          }
          catch (error)
          { if (error.message.startsWith("@: atSrc: namespace: setValue: cannot overwrite existing value:"))
            { toReturn = traveller.next;
            }
          }
          return toReturn;

          // return atRoot.namespace(object, address, ["leafNode:"], leafNode);
        };
        atRoot.namespace.setValue = function(object, address, value, traveller)
        {
          if (traveller === undefined || traveller === null) traveller = {};


          if (traveller.debugging === true) debugger;


          if (address === null) throw new Error("@: atSrc: namespace: setValue: setting the address to null implies setting the containing object, which is impossible: "+address);

          traveller.object            =   object;
          traveller.address           =   address;
          traveller.setValue          =   value;

          traveller.overwrite         =   traveller.overwrite === true;
          traveller.dryRun            =   traveller.dryRun    === true;

          traveller.func              =
              (traveller) =>
              {
                if (traveller.debugging === true) debugger;

                if (! traveller.finalAddressComponent)
                { if (traveller.next === undefined)
                  { if (traveller.dryRun === true)
                    { traveller.returnNow = true;
                    }
                    else
                    { traveller.next = traveller.current[traveller.addressComponent] = {};
                    }
                  }
                  else if (! atRoot.isObject(traveller.next) )
                  { throw new Error("@: atSrc: namespace: setValue: there is no valid object hierarchy to "+traveller.address);
                  }
                }
                else
                { if (traveller.overwrite !== true && traveller.next !== undefined)
                  { throw new Error("@: atSrc: namespace: setValue: cannot overwrite existing value: "+traveller.address);
                  }
                  if (traveller.dryRun)
                  { traveller.returnNow               = true;
                  }
                  else
                  { traveller.current[traveller.addressComponent] = traveller.setValue;
                    traveller.returnNow               = true;
                    traveller.toReturn                = traveller.setValue;
                  }
                }
              }
          return atRoot.namespace.traverse(traveller);
        };
        atRoot.namespace.extend = function(extendIntoThisObject, extendFromThisObject, traveller)
        {
          // extend will throw an error without making any changes if there are any issues
          //   not thread safe
          if (traveller === undefined || traveller === null) traveller = {};
          if (traveller.debugging === true) debugger;

          if (atRoot.isObject_notArray(extendFromThisObject))
          { traveller.overwrite =   traveller.overwrite === true;

            // do a dry run, and throw an error if there are any
            for ( const [key, value] of Object.entries(extendFromThisObject) )
            { traveller.dryRun = true;
              atRoot.namespace.setValue(extendIntoThisObject, key, value, traveller);
            }
            // actually perform the xtend, as a batch transaction - not thread safe
            for ( const [key, value] of Object.entries(extendFromThisObject) )
            { traveller.dryRun = false;
              atRoot.namespace.setValue(extendIntoThisObject, key, value, traveller );
            }
          }
        };
        atRoot.namespace.compareSlice = function(namespaceToCheck, compareTo, sliceParams, options)
        {
          debugger;
          try
          {
            let splitRegex = ".";
            // if (options.dotOrSlash === true) splitRegex = /[\.\/]/g;

            if (isString(namespaceToCheck)) namespaceToCheck  = namespaceToCheck.split(".");
            if (isString(compareTo)       ) compareTo         = compareTo.split(".");
            if (! isArray(sliceParams)    ) sliceParams       = [sliceParams];

            // if (Math.abs(sliceParams) > namespaceToCheck.length || compareTo.length > namespaceToCheck.length)
            //   return false;

            let sliceToCheck     = namespaceToCheck.slice(...sliceParams);
            let sliceToCompare   = compareTo;//.slice(...sliceParams);

            for (let i=sliceToCheck.length-1; i>-1; i--)
            { if  (     sliceToCheck[i] !== sliceToCompare[i]
                    &&  sliceToCompare[i] !== "*"
                  ) return false;
            }
            return true;
          }
          catch (error)
          { return false;
          }
        };

}


atApplication.namespace = atApplication.test.namespace;
atApplication.ls        = atApplication.ls;


atApplication.isObject          = (item) => { return item === Object(item) };
atApplication.isObject_notArray = (item) => { return isObject(item) && !Array.isArray(item); };
atApplication.isArray           = (item) => { return Array.isArray(item); };
atApplication.isString          = (item) => { return Object.prototype.toString.call(item) === "[object String]" };
atApplication.isFunction        = (item) => { return Object.prototype.toString.call(item) === '[object Function]'; };
atApplication.isInteger         = (item) => { return Number.isInteger(item) };
atApplication.noop              = () => {};

// if (typeof AT === "undefined")
// { var AT = atApplication;

//   var namespace         = AT.namespace;
//   var ls                = AT.ls;

//   var isObject          = AT.isObject;
//   var isObject_notArray = AT.isObject_notArray;
//   var isArray           = AT.isArray;
//   var isString          = AT.isString;
//   var isFunction        = AT.isFunction;
//   var isInteger         = AT.isInteger;
// }


atApplication.djb2 = function(str)
{
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}
atApplication.squidgeValue = function(value, max, squidgeAmount)
{ return (((max-value)*squidgeAmount)+value);
}
atApplication.hashStringToColor = function(str)
{
  if (str === undefined || str === null) str = "";

  var hash = atApplication.djb2(str);
  var r = ~~(atApplication.squidgeValue((hash & 0xFF0000) >> 16 , 256, 0.4));
  var g = ~~(atApplication.squidgeValue((hash & 0x00FF00) >> 8  , 256, 0.4));
  var b = ~~(atApplication.squidgeValue((hash & 0x0000FF)       , 256, 0.4));
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

atApplication.namespace(atApplication, "traveller.browser.eventDrivenGraph.eventRequiresResponse.eventFromServer").processIncoming =
( eventFromServer ) =>
{
  debugger;

  let responseFunction = atApplication.noop;

  let responseFromTab;
  if (eventFromServer.hasOwnProperty("responseFromTab") )
  {
    let betaEvent = namespace.rm(eventFromServer, "responseFromTab");
    responseFromTab =
        { "eventID"   : "beta",
          "betaEvent" : betaEvent,
        }
    responseFunction =
        (extraData) =>
        {
          debugger;

          namespace.extend
              ( betaEvent,
                { "agent"     : atApplication.traveller.browser.tab.agent,

                  "device"    : atApplication.traveller.browser.tab.device,
                  "tab"       :
                  { "name"      : atApplication.traveller.browser.tab.tabID,
                    "location"  : JSON.parse(JSON.stringify(self.location)),
                  },
                  "tabID"     : atApplication.traveller.browser.tab.tabID,
                },
                {"overwrite":true},
              );
          let registeredDocumentName = namespace.getIfExists(atApplication, "traveller.browser.tab.document.name");
          if (! namespace.isNotFound(registeredDocumentName) ) namespace(betaEvent, "document").name = registeredDocumentName;

          namespace.extend
              ( betaEvent,
                extraData,
                {"overwrite":true},
              );
          atApplication.nodes.sendEvent(responseFromTab);
        }
    Object.freeze(responseFunction);

    atApplication.namespace(atApplication, "traveller.browser.eventDrivenGraph.eventFromServerFunctionDict")(eventFromServer, responseFunction);
  }
  else
  {
    atApplication.namespace(atApplication, "traveller.browser.eventDrivenGraph.eventFromServerFunctionDict")(eventFromServer, responseFunction);
  }
}
atApplication.namespace(atApplication, "traveller.browser.eventDrivenGraph").eventFromServerFunctionDict = atApplication.noop;

// CODE TO RUN ONLY IN TABS WITH A DOM CONTEXT

if (self.__proto__.constructor.name === "Window")
{ document.addEventListener
  ( "readystatechange",
    () =>
    { if (document.readyState == "complete")
      {
        setTimeout
        ( () =>
          {
            // alert("@: at_utilities.js: document ready");
            atApplication.namespace(atApplication, "traveller.browser.tab").registerTab();
          },
          100
        )
      }
    }
  );

  atApplication.namespace(atApplication, "traveller.browser.tab").agent =
  { "name"    : window.localStorage.getItem("agentName"),
    "secretID": window.localStorage.getItem("agentSecret"),
  };
  atApplication.namespace(atApplication, "traveller.browser.tab").device =
  { "name"    : window.localStorage.getItem("@deviceID"),
  }

  atApplication.namespace(atApplication, "traveller.browser.tab").loggedIn      = () => {};
  atApplication.namespace(atApplication, "traveller.browser.tab").loggedOut     = () => {};
  atApplication.namespace(atApplication, "traveller.browser.tab").initialiseTab = () => {};

  // namespace(atApplication, "traveller.browser.tab.").tabID = getTimestampNanos();


  atApplication.namespace(atApplication, "traveller.browser.tab").displayLoginForm =
      () =>
      {
          $("#atApplication_loginForm").remove();
          if ($("#atApplication_loginForm").length === 0)
          { $("body").append
            ( $(  ` <div id="atApplication_loginForm">

                        <!------ Include the above in your HEAD tag ---------->

                        <div class="wrapper fadeInDown">
                          <div id="formContent">
                            <!-- Tabs Titles -->

                            <!-- Icon -->
                            <div class="fadeIn first">
                            </div>

                            <!-- Login Form -->

                              <input type="text" id="login" class="fadeIn second" name="login" placeholder="login">
                              <input type="password" id="password" class="fadeIn third" name="login" placeholder="password">
                              <input type="submit" id="loginButton" class="fadeIn fourth">


                            <!-- Remind Passowrd -->
                            <div id="formFooter">
                              <a class="underlineHover" href="#">Forgot Password?</a>
                            </div>262


                          </div>
                        </div>
                    </div>`
                )
            );
          }
          $("#login").val(window.localStorage.getItem("agentName"));
          $("#password").val(window.localStorage.getItem("agentSecret"));
          $("#loginButton").on
              ( "click",
                (event) =>
                {
                  let agentName     = $("#login").val();
                  let agentSecret   = $("#password").val();

                  window.localStorage.setItem("agentName", agentName);
                  window.localStorage.setItem("agentSecret", agentSecret);

                  $("#loginButton").attr("disabled", "disabled").toggleClass("spinner", true).text("");

                  atApplication.namespace.getMustExist(atApplication, "traveller.browser.sharedSocketWorker.sharedWorker.port").postMessage
                  ( { "eventID"       : "login",
                      "agentName"     : agentName,
                      "agentSecret"   : agentSecret,
                      "deviceName"    : window.localStorage.getItem("@deviceName"),
                      "tabID"         : atApplication.traveller.browser.tab.tabID,
                    }
                  );
                }
              )
      }

  atApplication.namespace(atApplication, "traveller.browser.tab").registerTab =
      () =>
      {
        atApplication.namespace.leafNode(atApplication, "traveller.browser.sharedSocketWorker.localTab.messageEventListenerList", []);

        let sharedSocketWorker = atApplication.namespace(atApplication, "traveller.browser.sharedSocketWorker").sharedWorker = new SharedWorker("/javascripts/sharedSocketWorker.js");

        sharedSocketWorker.port.start();

        sharedSocketWorker.port.addEventListener
        ( "message",
          (messageEventContainer) =>
          {
            debugger;

            let messageEvent = messageEventContainer.data;
            console.log("@: @ConsoleWindow: messageEvent: ", messageEvent);

            atApplication.namespace(atApplication, "traveller.browser.sharedSocketWorker").currentEvent = messageEvent;

            let toReturn = undefined;
            if (messageEvent.hasOwnProperty("toEval") )
            {
              eval(messageEvent.toEval);
            }
            if (messageEvent.eventID === "messageSentFrom@Server")
            { if (messageEvent.tabID === atApplication.namespace.getMustExist(atApplication, "traveller.browser.tab.tabID"))
              {
                atApplication.namespace(atApplication, "traveller.browser.eventDrivenGraph.eventRequiresResponse.eventFromServer")
                    .processIncoming(messageEvent["messageFrom@Server"]);
              }
              else
              { console.log("@: at_utilities: window: receivedMessage from sharedSocketWorker: message addressed to wrong tab");
              }
            }

            if (messageEvent.hasOwnProperty("toEvalAfterMessageFromServer") )
            {
              eval(messageEvent.toEvalAfterMessageFromServer);
            }

            // for (let localTabMessageListener of atApplication.traveller.browser.sharedSocketWorker.localTab.messageEventListenerList)
            // { localTabMessageListener(messageEvent);
            // }

            return toReturn;
          }
        );

        sharedSocketWorker.port.postMessage
        ( { "eventID": "initialiseTab",
            "tabType": atApplication.tabType
          }
        );

        atApplication.nodes = {};
        atApplication.nodes.sendEvent =
            (event) =>
            { let parsedEvent = event;
              if (AT.isString(event) )
              { parsedEvent = JSON.parse(event);
              }
              atApplication.nodes.sendEvent.queue.push(parsedEvent);
              if (atApplication.nodes.sendEvent.queue.length === 1)
              { setImmediate( atApplication.nodes.sendEvent.processQueue );
              }
            }
        atApplication.nodes.sendEvent.queue = [];
        atApplication.nodes.sendEvent.processQueue =
            () =>
            { if (atApplication.nodes.sendEvent.queue.length > 0)
              {
                let eventToSend               = atApplication.nodes.sendEvent.queue.shift();
                debugger;
                if (eventToSend.shadowEvent === true)
                {

                  atApplication.eventHistory.shadowEventCount += 1;
                  console.log("@: atApplication.eventHistory.shadowEventCount: "+ atApplication.eventHistory.shadowEventCount );
                }
                eventToSend.sentTimeStamp = atApplication.getTimestampNanos();
                eventToSend.tabID = atApplication.traveller.browser.tab.tabID;
                // socketConnection.agentSocket.send( JSON.stringify({"eventID": "sendEventTo@Server", "sendThisTo@Server": eventToSend} ) );
                // socketConnection.agentSocket.send( JSON.stringify(eventToSend ) );
                sharedSocketWorker.port.postMessage( {"eventID": "sendEventTo@Server", "tabID": eventToSend.tabID, "sendThisTo@Server": eventToSend} );
                setImmediate( atApplication.nodes.sendEvent.processQueue );
              }
            }
      }

  

  // atApplication.namespace(atApplication, "traveller.browser.sharedSocketWorker.sharedWorker").sendEvent =
  //   (messageEvent) =>
  //   { atApplication.traveller.browser.sharedSocketWorker.port.postMessage(messageEvent);
  //   }

}
