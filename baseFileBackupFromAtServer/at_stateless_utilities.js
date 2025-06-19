if (! self.atApplication) self.atApplication ={};

if (! atApplication.fileUploadTools) atApplication.fileUploadTools = {};
let fileUploadTools = atApplication.fileUploadTools;

let chooseFileDialogue = 
    atApplication.getFileInputPromiseFunction = atApplication.fileUploadTools.chooseFileDialogue =
    (fileInputElement) =>
    {
      let fileInputStateAnalyserPromise = new Promise
          ( (resolvePromise, rejectPromise) =>
            {
              let fileInputStateAnalyserData = {};
              let fileInputStateAnalyser = 
                  (event, parameters) =>
                  {
                    // console.log("fileInputStateAnalyser: start: ", event, parameters, Object.entries(fileInputStateAnalyserData));
                    
                    if (fileInputStateAnalyserData.closed === true) 
                    { 
                      //console.log("fileInputStateAnalyser: isClosed", event);
                      return;
                    }
                    
                    if (event==="init")
                    {
                      fileInputStateAnalyserData.blurred  = false;
                      fileInputStateAnalyserData.focussed = false;
                      fileInputStateAnalyserData.changed  = false;
                      fileInputStateAnalyserData.fileList = null;   
                      
                      fileInputStateAnalyserData.closed = false;
                      clearTimeout(fileInputStateAnalyserData.closeID);
                      delete fileInputStateAnalyserData.closeID;
                      
                      fileInputElement.val("");
                      
                      fileInputStateAnalyserData.targetEvent = "blur";
                      
                      fileInputStateAnalyserData.closeID = 
                          setTimeout
                          ( () => 
                            {
                              fileInputStateAnalyser("close", {"resolveFunction": rejectPromise, "resolveValue": "reason: no file dialogue opened"} );
                            },
                            2000
                          );
                      
                      fileInputElement.trigger("click");
                    }

                    if (event === "close")
                    { fileInputStateAnalyserData.closed = true;
                      
                      window.removeEventListener("blur",   fileInputStateAnalyser);
                      window.removeEventListener("focus",  fileInputStateAnalyser);
                      // let fileInput = document.getElementById("uploadNewImage_fileInput");
                      fileInputElement.off
                          ( "change", 
                            fileInputStateAnalyser
                          )
                      
                      parameters.resolveFunction(parameters.resolveValue);
                    }
                    else if (event.type === "blur")
                    {

                      if (fileInputStateAnalyserData.targetEvent !== "blur")
                      {
                        
                      }
                      else 
                      { 
                        clearTimeout(fileInputStateAnalyserData.closeID)
                        delete fileInputStateAnalyserData.closeID;
                      
                        fileInputStateAnalyserData.blurred = true;
                        fileInputStateAnalyserData.targetEvent = "focus";
                      }
                    }
                    else if (event.type === "focus")
                    {
                      if (fileInputStateAnalyserData.targetEvent !== "focus")
                      {
                        
                      }
                      else
                      {
                        fileInputStateAnalyserData.targetEvent = "fileInputChange";
                        fileInputStateAnalyserData.closeID = 
                            setTimeout
                            ( () => 
                              {
                                fileInputStateAnalyser("close", {"resolveFunction": rejectPromise, "resolveValue": "reason: no file change event after focus"} );
                              },
                              2000
                            );
                      }
                    }
                    else if (event.type === "change")
                    {
                      if (["focus", "fileInputChange"].includes(fileInputStateAnalyserData.targetEvent) )
                      { clearTimeout(fileInputStateAnalyserData.closeID)
                        delete fileInputStateAnalyserData.closeID;
                        
                        let fileList = event.target.files;
                        if (fileList.length > 0)
                        {
                          fileInputStateAnalyserData.fileList = fileList;
                          fileInputStateAnalyser("close", {"resolveFunction": resolvePromise, "resolveValue": fileList} );
                        }
                        else
                        {
                          fileInputStateAnalyser("close", {"resolveFunction": rejectPromise, "resolveValue": "no file input"} );
                        }
                      }
                      
                    }
                    console.log("fileInputStateAnalyser: end: ", event, parameters, Object.entries(fileInputStateAnalyserData));
                  }

              window.addEventListener("blur",   fileInputStateAnalyser);
              window.addEventListener("focus",  fileInputStateAnalyser);
              // let fileInput = document.getElementById("uploadNewImage_fileInput");
              fileInputElement.on
                  ( "change", 
                    fileInputStateAnalyser
                  );
              
              fileInputStateAnalyser("init");
            }
          ); 
      return fileInputStateAnalyserPromise
    }


fileUploadTools.requestFileUploadID = 
    async function requestFileUploadID(options)
    {
      let targetNodeName                = namespace.leafNode(options, "targetNodeName", "requestFileUpload");
      // let eventToSendWhenUploadComplete = namespace.getMustExist(options, "eventToSendWhenUploadComplete");
      let fileMetaData                  = namespace.getMustExist(options, "fileMetaData");
      let uploadFileName                = namespace.getMustExist(options, "uploadFileName");


      let nodes = namespace.getMustExist(atApplication, "nodes");

      let requestFileUpload = 
          await nodes.async_sendEventToServer_awaitResponse
          ( 
            { "eventID": "uiMajorStateCollection",
              "uiMajorStateCollectionParameters":
              {
                "targetNodeName"          : "requestFileUpload",
                "browserAwaitingAsyncResponse": true,
                
                "fileMetaData"            : fileMetaData,
                "targetFileName"          : uploadFileName,
                // somehow the server needs to know what to do when the fileupload is complete
                // "eventToSendWhenUploadComplete" : eventToSendWhenUploadComplete
              }
            }
          );
      
      debugger;

      atFileUploadID = namespace.getMustExist(requestFileUpload, "results.atFileUploadID");

      return {atFileUploadID};
    }

// let atApplication.getFileInputPromiseFunction.configureFileObjectForUpload = 
//     function configureFileObjectForUpload(fileList, )
// {

//     let fileList = await atApplication.getFileInputPromiseFunction(currentPanelForThisNamespace.uploadNewVideo_fileInput);
//         if (fileList.length !== 1)
//         {
//           throw new Error ("no file selected");
//         }

        
//         fileSelected = fileList[0];

//         let fileMetaData = {"name":fileSelected.name, "size":fileSelected.size, "type":fileSelected.type};
//         let uploadFileName = "heroVideo.needsProcessing."+fileMetaData.name.split(".").slice(-1)[0];
                                      
//                                       O.create
//                                       ( [ currentPanelForThisNamespace.panelContent,
//                                           [ [ ".fileData.hideWhenInNotificationsArea", "@"+JSON.stringify(fileMetaData)
//                                             ],
//                                           ]
//                                         ],
//                                         currentPanelForThisNamespace,
//                                         null
//                                       );
                                      
//                                       // let resetUI = 
//                                       //     () =>
//                                       //     {
//                                       //       currentPanelForThisNamespace.cancelFileConversionButton.remove();
//                                       //       currentPanelForThisNamespace.closeToNotificationsArea = false;
//                                       //       currentPanelForThisNamespace.uploadNewVideo_button.toggleClass("disabled", false);
                                            
//                                       //       if (currentPanelForThisNamespace.contextNodeFancytreePanel.parents(".notificationsArea_container").length !== 0)
//                                       //       {
//                                       //         currentPanelForThisNamespace.closeButton.css("display", "block");
//                                       //       }
//                                       //     }
                                     
//                                       let requestFileUpload = await nodes.async_sendEventToServer_awaitResponse
//                                           ( 
//                                             { "eventID": "uiMajorStateCollection",
//                                               "uiMajorStateCollectionParameters":
//                                               {
//                                                 "targetNodeName"          : "requestFileUpload",
//                                                 "browserAwaitingAsyncResponse": true,
                                                
//                                                 "fileMetaData"            : fileMetaData,
//                                                 "targetFileName"          : uploadFileName,
//                                                 // somehow the server needs to know what to do when the fileupload is complete
//                                                 "eventToSendWhenUploadComplete" :
//                                                 // something like
//                                                 //  also create bridge function
//                                                 { "eventID"                 : "uiMajorStateCollection",
//                                                   "uniqueBridgeID"          : uniqueBridgeID,
//                                                   "uiMajorStateCollectionParameters":
//                                                   {
//                                                     "targetNodeName"          : "writeToNamespace",
                                                    
//                                                     "updateSpec"              :
//                                                     { "nodeName"                : nodeName,
//                                                       "updateThisNamespace"     : currentNamespace,
//                                                       "newValue"                : undefined,
//                                                       "updateCommand"           : "passThroughToBrowserDefaultNamespaceRenderer",
//                                                       "uiRendererParameters"    :
//                                                       {
//                                                         "action"                  : "fileUpload_complete",
//                                                         "atFileUploadID"          : undefined,
//                                                       }
//                                                     }
//                                                   }
//                                                 }
//                                               }
//                                             }
//                                           );
                                      
//                                       debugger;
                                      
//                                       atFileUploadID = namespace.getMustExist(requestFileUpload, "results.atFileUploadID");




// atApplication.getFileInputPromiseFunction.uploadFile = 
//     function uploadFile(uploadURL, fileObject, atFileUploadID, progressHandler, successHandler, errorHandler, abortHandler) 
//     {
//       debugger;
//       // uploadFile
//       //     ( fileSelected, atFileUploadID,
//       //       (progressEvent) =>
//       //       {
//       //         debugger;
              
//       //         let progressPercentage = (progressEvent.loaded / progressEvent.total) * 100;
             
//       //       }, 
//       //       () => enableUIAfterFileUpload("success"),
//       //       () => enableUIAfterFileUpload("error"),
//       //       () => enableUIAfterFileUpload("userCancel")
//       //     );

//       // this will require an entry in the nginx virtual host to point to the correct express route, if the app URL is routed to somewhere
//       //   in the node graph, which it likely is
//       let uploadURL = "/fileUpload";
      
//       let formData = new FormData();
//       formData.append("fileObject", fileObject);
      
      
//       let xmlHTTPRequest = new XMLHttpRequest();
      
//       xmlHTTPRequest.upload.addEventListener
//           ( "progress", 
//             (progressEvent) =>
//             {
//               progressEvent.progressPercentage = (progressEvent.loaded / progressEvent.total) * 100;     
//               progressHandler(progressEvent);
//             },
//             false
//           );
//       xmlHTTPRequest.addEventListener("load"  , successHandler, false);
//       xmlHTTPRequest.addEventListener("error" , errorHandler  , false);
//       xmlHTTPRequest.addEventListener("abort" , abortHandler  , false);

      
//       xmlHTTPRequest.open("POST", uploadURL); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
//       xmlHTTPRequest.setRequestHeader("at-file-upload-id", atFileUploadID);

//       //use file_upload_parser.php from above url
      
//       xmlHTTPRequest.send(formData);
      
//       // currentPanelForThisNamespace.fileUploadProgress_cancelButton.on
//       // ( "click",
//       //   () =>
//       //   {
//       //     xmlHTTPRequest.abort();
//       //   }
//       // )

//       return {"abort": xmlHTTPRequest.abort, "xmlHTTPRequest": xmlHTTPRequest};
//     }

   
    
