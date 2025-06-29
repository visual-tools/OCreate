if (uiMajorStateCollectionParameters.command === "loadCubeData")
            {
              
              
                  let asyncNodeCode = 
                  async () =>
                  {
                    debugger;
                    
                    
                    howDidILikeThat;
                    googleSheets;
                    socketServer;
                    incomingMessageEvent;
                    socketAtData;
                    
                    
                    let eventID = namespace.getMustExist(incomingMessageEvent, "messageEvent.eventID");
                    // if (eventID === "newUserConnectionEvent" || eventID === "existingUserConnectionEvent")
                    {
                      let userRowDataDict;
                      
                      userRowDataDict          = {};
                      
                      if (! namespace.isNotFound(googleSheets, "userDataByIDDict."+socketAtData.userIDHash))
                      {
                        userRowDataDict = googleSheets.userDataByIDDict[socketAtData.userIDHash];
                      }
                      else
                      { 
                        if (googleSheets.spreadsheetIsAcceptingNewUsers !== true)
                        { incomingMessageEvent.socket.destroy();
                        }
                        else
                        {
                          let newUserRowNumber = userRowDataDict.rowNumberInSpreadsheet  = googleSheets.userCount+googleSheets.columnHeadingRowNumber+1;
                          
                          userRowDataDict.userID                  = socketAtData.userIDHash;
                          userRowDataDict.agentRuntimeID          = socketAtData.agentRuntimeID;
                          
                          
                          debugger;
                          
                          // write new data to worksheetZero
                          googleSheets.worksheetZero.getCell(newUserRowNumber, 0).value = userRowDataDict.userID;
                          for (let [columnName, cellData] of Object.entries(googleSheets.defaultRowData))
                          { googleSheets.worksheetZero
                                .getCell(newUserRowNumber, googleSheets.columnNumberByHeadingNameDict[columnName])
                                    .value = cellData;
                            userRowDataDict[columnName] = cellData;
                          }
                          
                          
                          // save all updates in one call, and the library itself confirms updates by reading them back
                          let newConnection_setTimeoutID = namespace.getIfExists(googleSheets, "newConnection_setTimeoutFunction");
                          if (! namespace.isNotFound(newConnection_setTimeoutID) )
                          { clearTimeout(newConnection_setTimeoutID);
                          }
                          namespace.setValue
                          ( googleSheets, "newConnection_setTimeoutFunction",
                            setImmediate
                                ( async () => 
                                  { await googleSheets.worksheetZero.saveUpdatedCells();
                                  }, 
                                  500
                                ),
                            {"overwrite":true}
                          );
                          
                          
                          // write confirmed data to local RAM
                          for (let [columnName, cellData] of Object.entries(googleSheets.defaultRowData))
                          { userRowDataDict[columnName] = cellData;
                          }
                          googleSheets.userDataByIDDict[userRowDataDict.userID] = userRowDataDict;
    // **********************************  update the userCount before the first async await
                          googleSheets.userCount++;
                          
    
                          debugger;
                          
                          // load new cells into sheet
    // *********************************** AWAIT
                          await googleSheets.worksheetZero.loadCells
                              ( { // GridRange object
                                  "startRowIndex"     : newUserRowNumber  , "endRowIndex"     : newUserRowNumber+1, 
                                  "startColumnIndex"  : 0                 , "endColumnIndex"  : googleSheets.columnCount
                                }
                              );
                          
                        }
                      }

                      // namespace.setValue(socketServer, "userIDBySocketIDDict."+socketAtData.id, newUserID);
                      let socketConnectionEventResponse = 
                          {
                            "eventID": "genericEvalStub",
                            "userRowDataDict": userRowDataDict,
                            "toEval":
                              ( () =>
                                {
                                  debugger;
                                  howDidILikeThatSocket.onmessage
                                      (
                                        { "eventID" : "newConnection_response",
                                          "success" : true,
                                          
                                          "userID"  : messageEvent.userRowDataDict.userID,
                                          "data"    : messageEvent.userRowDataDict, 
                                        }
                                      );
                                }
                              ).toString().slice(6),
                          };
                      try
                      { incomingMessageEvent.socket.send(JSON.stringify(socketConnectionEventResponse));
                      }
                      catch (error)
                      {
                        throw new Error
                            ( JSON.stringify
                              ( { "@: howDidILikeThat: howDidILikeThat_receive_incomingMessageEvent: newConnection: sending to peers: failed to send to socket id": socketAtData.agentRuntimeID 
                                } 
                              )
                            )
                      }
                      
                      
                      // send new user point to all peers
                      let userDataToSendToAllPeers = 
                          {
                            "eventID": "genericEvalStub",
                            "userRowDataDict": userRowDataDict,
                            "toEval":
                              ( () =>
                                {
                                  debugger;
                                  howDidILikeThatSocket.onmessage
                                      (
                                        {
                                          "eventID" : "updateUserData_fromServer",
                                          "userID"  : messageEvent.userRowDataDict.userID,
                                          "data"    : messageEvent.userRowDataDict,
                                        }
                                      );
                                }
                              ).toString().slice(6),
                          }
                      let userDataToSendToAllPeers_string = JSON.stringify(userDataToSendToAllPeers);
                      
                      for (let [socketAgentRuntimeID, shareWithPeerSocket] of Object.entries(connectedSocketByAgentRuntimeIDDict) )
                      {
// *************************************************** continue
                        if (socketAtData.agentRuntimeID === shareWithPeerSocket.socketAtData.agentRuntimeID) continue;
                        
                        try
                        { shareWithPeerSocket.send(userDataToSendToAllPeers_string);
                        }
                        catch (error)
                        { ls( { "@: howDidILikeThat: howDidILikeThat_receive_incomingMessageEvent: newConnection: sending to peers: failed to send to socket id": socketAgentRuntimeID } );
                        }
                      }
                      
                      debugger;
                      
                      // send current peer points to new user
                      for (let [peerUserID, peerUserRowDataDict] of Object.entries(googleSheets.userDataByIDDict))
                      {
                        if (peerUserRowDataDict.userID === userRowDataDict.userID) continue;
                        // if (socketAtData.agentRuntimeID === peerUserRowDataDict.agentRuntimeID) continue;
                        
                        try
                        { incomingMessageEvent.socket.send
                          ( JSON.stringify
                            ( {
                                "eventID": "genericEvalStub",
                                "peerUserID": peerUserID,
                                "peerUserRowDataDict": peerUserRowDataDict,
                                "toEval":
                                  ( () =>
                                    {
                                      debugger;
                                      howDidILikeThatSocket.onmessage
                                          (
                                            { "eventID" : "updateUserData_fromServer",
                                              "userID"  : messageEvent.peerUserID,
                                              "data"    : messageEvent.peerUserRowDataDict,
                                            }
                                          );
                                    }
                                  ).toString().slice(6)
                              }
                            )
                          );
                        }
                        catch (error)
                        { ls( { "@: howDidILikeThat: howDidILikeThat_receive_incomingMessageEvent: newConnection: failed to send to socket for new user": userRowDataDict.userID } );
                        }
                      }

                    }
  //                   else if (eventID === "updateUserData_fromClient")
  //                   {
  //                     debugger;
                      
  //                     let userIDOfIncomingMessage = socketAtData.userIDHash;
  
  //                     let incomingUserDataRowDict = namespace.getMustExist(incomingMessageEvent, "messageEvent.data");
                      
                      
  //                     let currentUserRowDataDict  = namespace.getMustExist(googleSheets, "userDataByIDDict."+userIDOfIncomingMessage);
  //                     let existingUserRowNumber   = currentUserRowDataDict.rowNumberInSpreadsheet;
                      
                      
  //                     let userIDOfRowInSpreadsheet = googleSheets.worksheetZero.getCell(existingUserRowNumber, 0).value;
  //                     if (userIDOfRowInSpreadsheet !== userIDOfIncomingMessage) 
  //                     { incomingMessageEvent.socket.destroy();
  //                       ls 
  //                       ( { "@: howDidILikeThat: howDidILikeThat_receive_incomingMessageEvent: updateUserData_fromClient: socket userID does not match spreadsheet row userID. Terminating socket as bad actor. Continuing as normal": 
  //                           { "incomingMessage userID": userIDOfIncomingMessage, 
  //                             "spreadsheet row userID": userIDOfRowInSpreadsheet,
  //                           }
  //                         } 
  //                       );
  //                     }
                      
  //                     debugger;
                      
  
  //                     for (let [columnName, cellData] of Object.entries(googleSheets.defaultRowData))
  //                     { 
  //                       let newValueFromClient = namespace.getIfExists(incomingUserDataRowDict, columnName);
  //                       if (! namespace.isNotFound(newValueFromClient))
  //                       { googleSheets.worksheetZero
  //                           .getCell(existingUserRowNumber, googleSheets.columnNumberByHeadingNameDict[columnName])
  //                               .value = newValueFromClient;
  //                       }
  //                     }
                      
  //                     // for each user, we need a timeout of 1 second since the last edit.
  //                     //   on timeout we write ALL spreadhseet changes, and destroy ALL timers
                      
  //                     // GOOGLE QUOTA SET TIMOUT
  //                     // save all updates in one call, and confirms updates by reading them back
  //                     let setTimeoutIDForThisUser = namespace.getIfExists(googleSheets, "googleQuotaSetTimeoutByUserIDDict."+userIDOfRowInSpreadsheet);
  //                     if (! namespace.isNotFound(setTimeoutIDForThisUser) )
  //                     { clearTimeout(setTimeoutIDForThisUser);
  //                     }
                      
  //                     namespace.setValue
  //                     ( googleSheets, "googleQuotaSetTimeoutByUserIDDict."+userIDOfRowInSpreadsheet,
  //                       googleSheets.googleQuotaSetTimeoutFunction(),
  //                       {"overwrite":true},
  //                     );
                      
  
  //                     // when the spreadsheet is confirmed updated, update the dataStored in RAM
  //                     for (let [columnName, cellData] of Object.entries(googleSheets.defaultRowData))
  //                     { 
  //                       let newValueFromClient              = namespace.getIfExists(incomingUserDataRowDict, columnName);
  //                       if (! namespace.isNotFound(newValueFromClient))
  //                       {
  //                         currentUserRowDataDict[columnName]  = namespace.getIfExists(incomingUserDataRowDict, columnName);
  //                       }
  //                     }
                      
                        
  //                     let userDataToSendToAllPeers_string = 
  //                         JSON.stringify
  //                         ( {
  //                               "eventID": "genericEvalStub",
  //                               "userIDOfRowInSpreadsheet": userIDOfRowInSpreadsheet,
  //                               "currentUserRowDataDict": currentUserRowDataDict,
  //                               "toEval":
  //                                 ( () =>
  //                                   {
  //                                     debugger;
  //                                     howDidILikeThatSocket.onmessage
  //                                         (
  //                                           { "eventID" : "updateUserData_fromServer",
  //                                             "userID"  : messageEvent.userIDOfRowInSpreadsheet,
  //                                             "data"    : messageEvent.currentUserRowDataDict,
  //                                           }
  //                                         );
  //                                   }
  //                                 ).toString().slice(6)
  //                           }
  //                         );
  //                     for (let [peerAgentRuntimeID, shareWithPeerSocket] of Object.entries(connectedSocketByAgentRuntimeIDDict) )
  //                     {
  //                       // let targetSocketAgentRuntimeID = namespace.getMustExist(shareWithPeerSocket, "socketAtData.agentRuntimeID");
                        
  //                       ls
  //                       ( { "@: howDidILikeThat: receive_incomingMessageEvent: updateUserData_fromClient": 
  //                           { "userIDOfRowInSpreadsheet": userIDOfRowInSpreadsheet, 
  //                             "userIDOfIncomingMessage" : peerAgentRuntimeID 
  //                           } 
  //                         } 
  //                       );
  // // *************************************************** continue
  //                       if (socketAtData.agentRuntimeID === peerAgentRuntimeID) continue;
                        
  //                       try
  //                       { shareWithPeerSocket.send(userDataToSendToAllPeers_string);
  //                       }
  //                       catch (error)
  //                       { ls( { "@: howDidILikeThat: howDidILikeThat_receive_incomingMessageEvent: updateUserData_fromClient: failed to send to socket id": socketID } );
  //                       }
  //                     }
  //                   }
  
                    // systemsCanvas.defaultLog.loggerFunction
                    // ( [ { "@: projects/howDidILikeThat: loaded spreadsheet worksheet": worksheet.title, 
                    //       "rowCount": worksheet.rowCount 
                    //     } 
                    //   ]
                    // )
  
                        
                    debugger;
                    
  
                    unPauseTraveller(traveller);
                  }
              pauseTraveller(traveller);
              setImmediate(asyncNodeCode);
              
              
            }
