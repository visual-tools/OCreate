ThisEqualsThat = window.ThisEqualsThat || {};

// import { jss } from '../gitSubtreeCollection/dvtng/jss/jss.js';

ThisEqualsThat.BootstrapObjects = new
function($)
{ O = this;
  var $window = $(window);

  // O.windowResizeController = function()
  // { var width = $window.width();
  //   $("body").toggleClass("xs", width < 400);
  //   $("body").toggleClass("sm", width < 768 && width > 400);
  //   $window.off("resize", O.windowResizeController);
  //   setTimeout(function () {$window.on("resize", O.windowResizeController); } , 300);
  // }
  // $window.on("resize", O.windowResizeController);

  // this.regex_namespace    = /^([^:]+/;
  this.regex_elementType  = /^([^.#@]+)/;
  this.regex_id           = /#([^.@]+)/;
  this.regex_classes      = /\.([^@]+)/;
  this.regex_chainCalls   = /@(.*)/;
  this.regex_dot          = /\./g;

  this.elementDefSequence = {"id":"", "classes":"", "elementType": "div"};

  this.elementNamespaceDict =
  { "xhtml"     : "http://www.w3.org/1999/xhtml",
    "svg"       : "http://www.w3.org/2000/svg",
  }

  this.create =
  function(listContents, targetDict=null, current=null, depth=0, parentDict)
  {
    if (parentDict === undefined) parentDict = targetDict;

    var toReturn = [];
    for (item of listContents)
    { if (! item) continue;
      let useTargetDict = targetDict;

      // if (typeof(item) == "string")
      // { var itemSequentialList = item.split(" ");
      //   if (itemSequentialList.length > 1)
      //     item = itemSequentialList;
      // }

      if ( typeof(item) == "string" )
      { if ( item.startsWith("@") )
        {
          let userString = item.substring(1);
          if (current.prop("tagName") === "INPUT" || current.is("textarea") )
          { current.attr("placeholder", userString);
          }
          else if (current.prop("tagName") === "OPTION")
          { current.attr("value", userString);
            current.text(userString);
          }
          else
          { current.text( userString );
          }
          
          continue;
        }

        if ( item.startsWith("^") )
        { useTargetDict = parentDict;
          item = item.replace(/\^/, "");
        }

        var elementDef  = {};
        var dictKey     = false;

        for (elementParamName in this.elementDefSequence)
        { var matchValue = item.match(this["regex_"+elementParamName]);
          if (matchValue !== null)
          { elementDef[elementParamName] = matchValue[1];
            if (! dictKey) dictKey = matchValue[1].split(".")[0];
          }
          else
          { elementDef[elementParamName] = this.elementDefSequence[elementParamName];
          }
        }
        elementDef.classes = $.trim(elementDef.classes.replace(this.regex_dot, " "));
        if (! dictKey) dictKey = "__blank";


        elementTypeSplit = elementDef.elementType.split(":");
        if (elementTypeSplit.length > 1)
        { elementDef.elementType = elementTypeSplit[1];
          elementDef.namespace   = elementTypeSplit[0];
        }
        else
        { elementDef.namespace   = "xhtml"
        }
        var elemOptions = {};
        if (elementDef.id) elemOptions.id = elementDef.id;
        if (elementDef.classes) elemOptions.class = elementDef.classes;

        // var newElem =
        //     $("<"+elementDef.elementType+"/>",
        //       elemOptions
        //     );

        var newElem =
            $(document.createElementNS(O.elementNamespaceDict[elementDef.namespace], elementDef.elementType)).attr(elemOptions);

        if (current === null)
        { current = newElem;
        }
        else
        { current.append(newElem);
          current = newElem;
        }
        useTargetDict[dictKey] = newElem;
        if (useTargetDict instanceof jQuery) 
        { if (useTargetDict.data("OCreateChildren") == undefined)
          { useTargetDict.data("OCreateChildren", {});
          } 
          useTargetDict.data("OCreateChildren")[dictKey] = newElem;
        }
        newElem[0].OCREATE_name = dictKey;
        newElem.attr("OCREATE_name", dictKey);
        toReturn.push(current);
      }
      else if ( Array.isArray(item))
      { var subTree = [];
        for (subItem of item)
        { var child = O.create(subItem, targetDict, current, depth+1, current);

          subTree.push(child);
        }
        toReturn.push(subTree);
      }
      else if ( item instanceof jQuery )
      { if (current) current.append(item);

        current = item;

        var dictKey = item.attr("id")
        var classAttr = item.attr("class")
        if (classAttr) classAttr = classAttr.split(" ")[0];
        dictKey = dictKey || classAttr || item.prop("nodeName").toLowerCase();

        targetDict[ dictKey ] = item;
        item.OCREATE_name = dictKey;

        toReturn.push(item);
      }
      else if ( isFunction(item))
      {
        item(current);
      }
      else if ( isObject(item) )
      { 
        if (item["@CallFunction"])
        { let functionCallSpec = item["@CallFunction"];
          functionCallSpec[0](item, ...functionCallSpec[1]);
        }
        else
        { // debugger;
          for (functionName in item)
          { var parametersListList = item[functionName];
            for (parametersList of parametersListList)
            {
              current[functionName](...parametersList);
            }
          }
        }
      }

    }
    // if (depth == 0) console.log("create", toReturn);
    return toReturn;
  }
  
  this.tabBlock_except = function (except)
  {
    let elementsWhichDefaultToHavingTabIndex_cssSelector = 
        ` a[href]:not([tabindex]),
          area[href]:not([tabindex]),
          input:not([disabled]):not([tabindex]),
          select:not([disabled]):not([tabindex]),
          textarea:not([disabled]):not([tabindex]),
          button:not([disabled]):not([tabindex]),
          iframe:not([tabindex]),
          [contentEditable=true]:not([tabindex])
        `.replace(/\s*/g,"");
    
    let $document = $(document);
    for (let element of $document.find(elementsWhichDefaultToHavingTabIndex_cssSelector))
    {
      element = $(element);
      element.toggleClass("OCreate_tabBlock_noTabIndex", true);
      element.attr("tabindex", "-1");
    }
    for (let element of $document.find("[tabindex='0']"))
    {
      element = $(element);
      element.toggleClass("OCreate_tabBlock_withTabIndex", true);
      element.attr("tabindex", "-1");
    }

    this.tabBlock_remove(except);
  }
  this.tabBlock_remove = function(root)
  {
    if (root === undefined) root = $(document);

    for (let element of root.find(".OCreate_tabBlock_noTabIndex"))
    {
      element = $(element);
      element.toggleClass("OCreate_tabBlock_noTabIndex", false)
      element.removeAttr("tabindex");
    }
    for (let element of root.find(".OCreate_tabBlock_withTabIndex"))
    {
      element = $(element);
      element.toggleClass("OCreate_tabBlock_withTabIndex", false)
      element.attr("tabindex", "0");
    }
  }


  let doResizeWindowFunction = 
      () =>
      {
        if (doResizeWindowFunction.doResizeTimeoutID !== undefined)
        {
          clearTimeout(doResizeWindowFunction.doResizeTimeoutID);
          doResizeWindowFunction.doResizeTimeoutID = undefined;
        }
        doResizeWindowFunction.doResizeTimeoutID = 
            setTimeout
            ( 
              () =>
              { $(".overflowY_scrollWhenRequired")
                    .each
                    ( (index, element) =>
                      { if (element.scrollHeight > element.clientHeight)
                        { $(element).toggleClass("OCREATE_activate", true);
                        }
                        else
                        { $(element).toggleClass("OCREATE_activate", false);
                        }
                      }
                    );
              },
              200
            );

      }
  $(window).on("resize" , doResizeWindowFunction);
  $(document).on("load",  doResizeWindowFunction);


  this.phaseContainer = 
      function phaseContainer(referenceObject, containingElement, phaseSummary_OCreateList, phaseList, onCloseFunction)
      {
        O.create
        ( [ ".phaseContainer_container.modalBackground.flexColumn.flexJustifyContentCenter.flexAlignItemsCenter.height100.width100.positionAbsolute",
              ".phaseContainer_mainContent.flexColumn.positionRelative", 
              [ [ "button.closeButton.buttonLeaf.positionAbsolute", "@X" 
                ],
                [ ".phaseSummary_container.width100.flexAlignItemsCenter.flexJustifyContentCenter.textAlign_center",
                  // [ 
                  //   phaseSummary_OCreateList
                  //   // [ ".sendOrGet.textOneLineElipsis.displayNone"],
                  //   // [ ".targetAbsoluteAddress.textOneLineElipsis.displayNone"],
                  //   // [ ".quantityOfCredit.textOneLineElipsis.displayNone"],
                  //   // [ ".description.textOneLineElipsis.displayNone"],
                  // ]
                ],
                [ ".phaseContainer_phaseContent.height100.width100.flex_centerAll.positionRelative",
                ],
                [ "button.nextButton.buttonLeaf.positionAbsolute", "@next"
                ],
                [ "button.backButton.buttonLeaf.buttonLeafReversed.positionAbsolute", "@back"
                ],
              ],
          ],
          referenceObject,
          containingElement
        );
                                    
        referenceObject.closeButton.on
        ( "click",
          () =>
          {
            debugger;
            
            referenceObject.phaseContainer_container.fadeOut(200);
            setTimeout( () => { referenceObject.phaseContainer_container.remove() }, 200 );
            // nodes.ledgerContent.ledgerMainContent.newTransaction.attr("disabled", null);
            // nodes.ledgerContent.ledgerMenuItemContainer.transactions.trigger("click");
            onCloseFunction();
          }
        )
        
        referenceObject.nextButton.on
        ( "click",
          () =>
          {
            loadPhaseCollection.next();
          }
        )
        referenceObject.backButton.on
        ( "click",
          () =>
          {
            loadPhaseCollection.back();
          }
        )
        
        
        let phaseCollection = [];
        let loadPhaseCollection = referenceObject.loadPhaseCollection = {};
        loadPhaseCollection.index = -1;
        loadPhaseCollection.next = 
            () =>
            {
              if (loadPhaseCollection.currentPhase !== undefined)
              {
                loadPhaseCollection.currentPhase.next();
              }
              loadPhaseCollection.load(loadPhaseCollection.index+1);
            }
        loadPhaseCollection.back = 
            () =>
            {
              if (loadPhaseCollection.currentPhase !== undefined)
              {
                loadPhaseCollection.currentPhase.back();
              }
              loadPhaseCollection.load(loadPhaseCollection.index -1)
            }
        loadPhaseCollection.load =
            (newIndex) =>
            {
              loadPhaseCollection.index         = newIndex;
              loadPhaseCollection.currentPhase  = phaseCollection[loadPhaseCollection.index];
              setTimeout( () => { loadPhaseCollection.currentPhase.load() }, 100);
              
              if (loadPhaseCollection.index === 0)    referenceObject.backButton.toggleClass("displayNone", true);
              else if (loadPhaseCollection.index > 0) referenceObject.backButton.toggleClass("displayNone", false);
              
              if (loadPhaseCollection.index < phaseCollection.length-1)
              { referenceObject.nextButton.toggleClass("displayNone", false);
              }
              else
              { referenceObject.nextButton.toggleClass("displayNone", true);
              }
              
              loadPhaseCollection.nextButtonState();
              loadPhaseCollection.backButtonState();
            }
        loadPhaseCollection.buttonState = 
            (buttonName, newState) =>
            {
              if (newState === undefined) newState = namespace.leafNode(loadPhaseCollection, "currentPhase.buttonStateDict."+buttonName, "disabled");
              referenceObject[buttonName].attr("disabled", newState !== "enabled"? "disabled":null)
              namespace.setValue(loadPhaseCollection, "currentPhase.buttonStateDict."+buttonName, newState, {"overwrite":true});
            }
        loadPhaseCollection.nextButtonState = (newState) => loadPhaseCollection.buttonState("nextButton", newState);
        loadPhaseCollection.backButtonState = (newState) => loadPhaseCollection.buttonState("backButton", newState);

        
        phaseCollection.push(...phaseList);
        loadPhaseCollection.next();

        return {phaseCollection, loadPhaseCollection, }




                                        let directionOfTransferPhase =
                                        { "load":
                                             () =>
                                              {
                                                
                                                if (directionOfTransferPhase.loaded !== true)
                                                { 
                                                  loadPhaseCollection.backButtonState("enabled");
                                                  
                                                  
                                                  O.create
                                                  ( [ newTransaction.newTransactionPhaseContainer,
                                                      ".phaseContent.directionOfTransferPhase.flexColumn.width100.height100.flex_centerAll.displayNone",
                                                      [ [ ".getSendContainerDiv.flexRow.flex_spaceBetween.width100.height100.flex_centerAll",
                                                          [ 
                                                            [ ".getCreditFromDiv.flexColumn.newTransactionRow.flexCenterAll", 
                                                              [ 
                                                                [".rowTitle.width100", "@Claim hour credits" ],
                                                                [ ".getCreditFrom.inputElement" ],
                                                                
                                                              ],
                                                            ],
                                                            [ ".sendCreditToDiv.flexColumn.newTransactionRow.flexCenterAll", 
                                                              [ 
                                                                [ ".rowTitle.width100", "@Send hour credits"  , ],
                                                                [ ".sendCreditTo.inputElement"],
                                                                
                                                              ],
                                                            ],
                                                            
                                                          ],
                                                        ],
                                                      ],
                                                    ],
                                                    directionOfTransferPhase,
                                                    null
                                                  );
                                                  
                                                  // newTransaction.nextButton.toggleClass("disabled", true);
                                                  
                                                  debugger;
                                                  
                                                 directionOfTransferPhase.sendCreditToDiv.on
                                                  ( "click",
                                                    (event) =>
                                                    {
                                                      debugger;
                                                      if (directionOfTransferPhase.direction !== "send")
                                                      {
                                                        directionOfTransferPhase.sendCreditTo.toggleClass("selected", true);
                                                        directionOfTransferPhase.getCreditFrom.toggleClass("selected", false);
                                                        directionOfTransferPhase.direction = "send";
                                                      }
                                                      loadPhaseCollection.nextButtonState("enabled");
                                                      
                                                    }
                                                  );
                                                  // directionOfTransferPhase.sendCreditTo.trigger("click");
                                                  
                                                  directionOfTransferPhase.getCreditFromDiv.on
                                                  ( "click",
                                                    (event) =>
                                                    {
                                                      debugger;
                                                      if (directionOfTransferPhase.direction !== "get")
                                                      {
                                                        directionOfTransferPhase.sendCreditTo.toggleClass("selected", false);
                                                        directionOfTransferPhase.getCreditFrom.toggleClass("selected", true);
                                                        directionOfTransferPhase.direction = "get";
                                                      }
                                                      loadPhaseCollection.nextButtonState("enabled");
                                                    }
                                                  );
                                                  
                                                  directionOfTransferPhase.loaded = true;
                                                }
                                                else
                                                {
                                                }
                                                // directionOfTransferPhase.sendCreditTo.trigger("click");
                                                directionOfTransferPhase.phaseContent.fadeIn(200);
                                                
                                              },
                                            "next":
                                                () =>
                                                {
                                                  directionOfTransferPhase.phaseContent.fadeOut(100);
                                                  transactionSummaryManager.update_direction("show");
                                                },
                                            "back":
                                                () =>
                                                {
                                                  directionOfTransferPhase.phaseContent.fadeOut(100);
                                                }
                                        };
                                        
                                        let targetAccountPhase =
                                        { "load":
                                             () =>
                                              {
                                                
                                                if (targetAccountPhase.loaded !== true)
                                                { 
                                                  loadPhaseCollection.backButtonState("enabled");
                                                  
                                                  
                                                  O.create
                                                  ( [ newTransaction.newTransactionPhaseContainer,
                                                      [ [ ".phaseContent.targetAccountPhase.width100.height100.displayNone",
                                                          [ [ ".phaseContentInternalContainerDiv.flexColumn.width100.height100.flex_centerAll.flex_spaceAround",
                                                              [ [ ".selectTargetLedgerDiv.flexColumn.width100.flex_centerAll.newTransactionRow", 
                                                                  [ 
                                                                    [ ".rowTitle.width100", "@select ledger"  , ],
                                                                    [ "select.selectTargetLedgerSelect.width100.inputElement"],
                                                                  ],
                                                                ],
                                                                [ ".selectTargetUserIDDiv.flexColumn.width100.newTransactionRow", 
                                                                  [ 
                                                                    [".rowTitle.width100", "@select account" ],
                                                                    [ "select.selectTargetUserIDSelect.width100.inputElement" ],
                                                                  ],
                                                                ],
                                                              ],
                                                            ],
                                                          ],
                                                        ],
                                                      ],
                                                    ],
                                                    targetAccountPhase,
                                                    null
                                                  );
                                                  
                                                  // newTransaction.nextButton.toggleClass("disabled", true);
                                                  
                                                  
                                                  
                                                  debugger;
                                                  
                                                  for (const [ledgerNodeName, ledgerInstanceData] of Object.entries(userIDListByLedgerNameDict) )
                                                  {
                                                    if (nodes.browserState.location.href.includes("stage1") && ledgerNodeName !== "mcsstage1")
                                                    {
                                                      continue;
                                                    }
                                                    else if (nodes.browserState.location.href.includes("stage2") && ledgerNodeName !== "mcsstage2")
                                                    {
                                                      continue;
                                                    }
                                                    const ledgerMenuItemName = shortDisplayNameByLedgerNameDict[ledgerNodeName];
                                                    let ledgerOptionElement = 
                                                        $(`<option value="${ledgerNodeName}">${ledgerMenuItemName}</option>`);
                                                    if (ledgerNodeName === currentLedgerNodeName) ledgerOptionElement.attr("selected", "selected");
                                                    targetAccountPhase.selectTargetLedgerSelect.append(ledgerOptionElement);
                                                  }
                                                  
                                                  targetAccountPhase.selectTargetLedgerSelect.on
                                                  ( "change",
                                                    (event) =>
                                                    {
                                                      debugger;
                                                      targetAccountPhase.selectTargetUserIDSelect.html("");
                                                      
                                                      let userIDOptionElement = 
                                                            $(`<option value="noUserIDSelected">choose counter-party</option>`);
                                                      targetAccountPhase.selectTargetUserIDSelect.append(userIDOptionElement);
                                                      for (const accountID of userIDListByLedgerNameDict[targetAccountPhase.selectTargetLedgerSelect.val()].userIDList )
                                                      {
                                                        if  (
                                                                  !theseAccountsCannotBeCounterPartiesList.includes(accountID) 
                                                              &&  ( accountID !== userEmailAddress || targetAccountPhase.selectTargetLedgerSelect.val() !== currentLedgerNodeName) 
                                                            )
                                                        { 
                                                          
                                                          if (accountID === "mcsstage3") continue
                                                          
                                                          userIDOptionElement = 
                                                              $(`<option value="${accountID}">${accountID}</option>`);
                                                          targetAccountPhase.selectTargetUserIDSelect.append(userIDOptionElement);
                                                        }
                                                      }
                                                      targetAccountPhase.selectTargetUserIDSelect.trigger("change");
                                                      
                                                    }
                                                  );
                                                  targetAccountPhase.selectTargetLedgerSelect.trigger("change");
                                                  
                                                  targetAccountPhase.selectTargetUserIDSelect.on
                                                  ( "change",
                                                    (event) =>
                                                    {
                                                      debugger;
                                                      if (targetAccountPhase.selectTargetUserIDSelect.val() !== "noUserIDSelected")
                                                      {
                                                        loadPhaseCollection.nextButtonState("enabled");
                                                      }
                                                      else
                                                      {
                                                        loadPhaseCollection.nextButtonState("disabled");
                                                      }
                                                    }
                                                  );
                                                  
                                                  targetAccountPhase.loaded = true;
                                                }
                                                else
                                                {
                                                }
                                                targetAccountPhase.phaseContent.fadeIn(200);

                                              },
                                            "next":
                                                () =>
                                                {
                                                  targetAccountPhase.phaseContent.fadeOut(100);
                                                  transactionSummaryManager.update_targetAbsoluteAddress("show");
                                                },
                                            "back":
                                                () =>
                                                {
                                                  targetAccountPhase.phaseContent.fadeOut(100);
                                                  transactionSummaryManager.update_direction("hide");
                                                }
                                        };
                                        
                                        let quantityAndDescriptionPhase =
                                        { "load":
                                             () =>
                                              {
                                                
                                                if (quantityAndDescriptionPhase.loaded !== true)
                                                { 
                                                  loadPhaseCollection.backButtonState("enabled");
                                                  
                                                  
                                                  O.create
                                                  ( [ newTransaction.newTransactionPhaseContainer,
                                                      ".phaseContent.quantityAndDescriptionPhase.displayNone.flexAlignItemsCenter.flexJustifyContentCenter",
                                                        [ [ ".phaseContentInternalContainerDiv.flexColumn.width100.height100.flex_centerAll.flex_spaceAround",
                                                            [ 
                                                              [ ".quantityOfCreditDiv.flexColumn.newTransactionRow.width100", 
                                                                [ 
                                                                  [ ".rowTitle.flex_grow1", "@amount to "+directionOfTransferPhase.direction  , ],
                                                                  [ "input.quantityOfCredit.width100.inputElement"],
                                                                ],
                                                              ],
                                                              [ ".getCreditFromDiv.flexColumn.newTransactionRow.width100", 
                                                                [ 
                                                                  [".rowTitle.flex_grow1", "@description" ],
                                                                  [ "input.description.width100.inputElement",  ],
                                                                ],
                                                              ],
                                                            ],
                                                          ],
                                                        ],
                                                    ],
                                                    quantityAndDescriptionPhase,
                                                    null
                                                  );
                                                  
                                                  quantityAndDescriptionPhase.quantityOfCreditAutoNumeric = 
                                                      new AutoNumeric(quantityAndDescriptionPhase.quantityOfCredit.get(0), "0.0", { "currencySymbol": "Hr ", "minimumValue": 0, "emptyInputBehaviour":"Hr 0.00", "decimalPlaces": 1});
                                                  
                                                  debugger;
                                                  
                                                  
                                                  let checkEnableNext = 
                                                      () =>
                                                      {
                                                        debugger;
                                                        if ( quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.get() !== "0"  && quantityAndDescriptionPhase.description.val() !== "")
                                                        {
                                                          loadPhaseCollection.nextButtonState("enabled");
                                                        }
                                                        else
                                                        {
                                                          loadPhaseCollection.nextButtonState("disabled");
                                                        }
                                                        
                                                      }
                                                  quantityAndDescriptionPhase.quantityOfCredit.on
                                                  ( "keyup",
                                                    (event) =>
                                                    {
                                                      // quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.reformat();
                                                      if (quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.get() === "") quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.set(0);
                                                      checkEnableNext();
                                                    }
                                                  );
                                                  // directionOfTransferPhase.sendCreditTo.trigger("click");
                                                  
                                                  quantityAndDescriptionPhase.description.on
                                                  ( "keyup",
                                                    (event) =>
                                                    {
                                                      checkEnableNext();
                                                    }
                                                  );
                                                  

                                                  quantityAndDescriptionPhase.loaded = true;
                                                }
                                                else
                                                {
                                                }
                                                // directionOfTransferPhase.sendCreditTo.trigger("click");
                                                quantityAndDescriptionPhase.phaseContent.fadeIn(200);
                                                
                                              },
                                            "next":
                                                () =>
                                                {
                                                  quantityAndDescriptionPhase.phaseContent.fadeOut(100);
                                                  transactionSummaryManager.update_quantityAndDescription("show");
                                                },
                                            "back":
                                                () =>
                                                {
                                                  quantityAndDescriptionPhase.phaseContent.fadeOut(100);
                                                  transactionSummaryManager.update_targetAbsoluteAddress("hide");
                                                }
                                        };
                                        
                                        
                                        let transactionSummaryManager = namespace(newTransaction, "transactionSummaryManager");
                                        let transactionSpec           = namespace(transactionSummaryManager, "transactionSpec");
                                        
                                        
                                        transactionSummaryManager.update_direction = 
                                            (showOrHide) =>
                                            { transactionSpec.direction =  directionOfTransferPhase.direction;
                                              
                                              transactionSpec.sendOrGetString = "Sending logged hours to ";
                                              if (transactionSpec.direction === "get")
                                              { transactionSpec.sendOrGetString = "Claiming logged hours with ";
                                              }
                                              
                                              newTransaction.sendOrGet.toggleClass("displayNone", showOrHide !== "show")
                                              newTransaction.sendOrGet.text(transactionSpec.sendOrGetString);
                                            }
                                        transactionSummaryManager.update_targetAbsoluteAddress =  
                                            (showOrHide) =>
                                            { transactionSpec.targetLedgerNodeName  = targetAccountPhase.selectTargetLedgerSelect.val();
                                              transactionSpec.targetUserID          = targetAccountPhase.selectTargetUserIDSelect.val();
                                              transactionSpec.targetAccountString   = transactionSpec.targetLedgerNodeName+"/"+transactionSpec.targetUserID;
                                              
                                              newTransaction.targetAbsoluteAddress.toggleClass("displayNone", showOrHide !== "show");
                                              newTransaction.targetAbsoluteAddress.text(transactionSpec.targetAccountString);
                                            }
                                        transactionSummaryManager.update_quantityAndDescription =
                                            (showOrHide) =>
                                            {
                                              transactionSpec.quantity          = quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.get();
                                              transactionSpec.quantityFormatted = quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.getFormatted();
                                              
                                              transactionSpec.description       = quantityAndDescriptionPhase.description.val();
                                              
                                              
                                              newTransaction.quantityOfCredit.toggleClass("displayNone", showOrHide !== "show");
                                              newTransaction.description.toggleClass("displayNone", showOrHide !== "show");
                                              newTransaction.quantityOfCredit.text(transactionSpec.quantityFormatted);
                                              newTransaction.description.text(transactionSpec.description);
                                            }
                                        
                                        
                                        
                                        
                                        let transactionSummaryPhase = nodes.newTransaction.transactionSummaryPhase =
                                        { "load":
                                             () =>
                                              {
                                                  loadPhaseCollection.backButtonState("enabled");
                                                  
                                                // if (transactionSummaryPhase.loaded !== true)
                                                // { 
                                                  // let transactionSpec = transactionSummaryManager.transactionSpec
                                                  
                                                  // transactionSpec.direction             = directionOfTransferPhase.direction;
                                                  
                                                  // transactionSpec.targetLedgerNodeName  = targetAccountPhase.selectTargetLedgerSelect.val();
                                                  // transactionSpec.targetUserID          = targetAccountPhase.selectTargetUserIDSelect.val();
                                                  // transactionSpec.targetAccountString   = transactionSpec.targetLedgerNodeName+"/"+transactionSpec.targetUserID;
                                                  
                                                  
                                                  
                                                  // transactionSpec.sendOrGetString = "Sending Credit to";
                                                  // if (transactionSpec.direction === "get")
                                                  // {
                                                  //   transactionSpec.sendOrGetString = "Getting Credit from";
                                                  // }
                                                  // transactionSpec.quantity          = quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.get();
                                                  // transactionSpec.quantityFormatted = quantityAndDescriptionPhase.quantityOfCreditAutoNumeric.getFormatted();
                                                  // transactionSpec.description       = quantityAndDescriptionPhase.description.val();
                                                  O.create
                                                  ( [ newTransaction.newTransactionPhaseContainer,
                                                      ".phaseContent.transactionSummaryPhase.displayNone.flexAlignItemsCenter.flexJustifyContentCenter",
                                                      [ [ ".phaseContentInternalContainerDiv.flexColumn.width100.height100.flex_centerAll", 
                                                          [ [ "button.submitTransactionForValidation.buttonLeaf.buttonLeafSymetric", "@Submit for Validation",
                                                            ], 
                                                          ],
                                                        
                                                        // [ ".sendOrGet"        , "@"+transactionSpec.sendOrGetString     ],
                                                        // [ ".targetUser"       , "@"+transactionSpec.targetAccountString ],
                                                        // [ ".quantityOfCredit" , "@"+transactionSpec.quantityFormatted   ],
                                                        // [ ".description"      , "@"+transactionSpec.description         ],
                                                        ],
                                                      ],
                                                    ],
                                                    transactionSummaryPhase,
                                                    null
                                                  );
                                                  
                                                  debugger;
                                                  

                                                  transactionSummaryPhase.submitTransactionForValidation.attr("disabled", "disabled");
                                                  
                                                  setTimeout
                                                      ( () => 
                                                        { transactionSummaryPhase.submitTransactionForValidation.attr("disabled", null);
                                                          // transactionSummaryPhase.submitTransactionForValidation.toggleClass("disabled", false);
                                                        },
                                                        1200
                                                      )
                                                      
                                                  transactionSummaryPhase.submitTransactionForValidation.on
                                                  ( "click",
                                                    (event) =>
                                                    {
                                                      let eventToSend = 
                                                          {
                                                            "eventID": "uiMajorStateCollection",
                                                            "uiMajorStateCollectionParameters":
                                                                {
                                                                  "command"       : "submitTransactionForValidation",
                                                                  "targetNodeName": "newTransaction",
                                                                  "transactionSpec": transactionSpec,
                                                                }
                                                          };
                                                      transactionSummaryPhase.submitTransactionForValidation.attr("disabled", "disabled");
                                                      transactionSummaryPhase.submitTransactionForValidation.toggleClass("validating", true);
                                                      
                                                      loadPhaseCollection.backButtonState("disabled");
                                                      // nodes.pocMainContent.toggleClass("userSelectNone", true);
                                                      O.create
                                                      ( [ transactionSummaryPhase.phaseContent,
                                                          ".validatingTransaction", "@validating transaction",
                                                        ],
                                                        transactionSummaryPhase,
                                                        null
                                                      );
                                                      nodes.sendEventToServer(eventToSend);
                                                    }
                                                    
                                                  )
                                                  
                                                  
                                                  transactionSummaryPhase.loaded = true;

                                                  transactionSummaryPhase.phaseContent.fadeIn(200);
                                              },
                                            "next":
                                                () =>
                                                {
                                                  transactionSummaryPhase.phaseContent.fadeOut(100);
                                                },
                                            "back":
                                                () =>
                                                {
                                                  transactionSummaryPhase.phaseContent.fadeOut(100);
                                                  
                                                  transactionSummaryManager.update_quantityAndDescription("hide");
                                                }
                                        };
                                        
                                    let validationResponsePhase = nodes.newTransaction.validationResponsePhase =
                                        { "load":
                                             () =>
                                              {
                                                  // loadPhaseCollection.backButtonState("dis");
                                                  
                                                // if (transactionSummaryPhase.loaded !== true)
                                                // { 
                                                  let transactionSpec = transactionSummaryManager.transactionSpec;
                                                  
                                                  O.create
                                                  ( [ newTransaction.newTransactionPhaseContainer,
                                                      ".phaseContent.validationResponsePhase.displayNone.flexAlignItemsCenter.flexJustifyContentCenter",
                                                      [ [ ".title.textAlign_center", "@Validation Response"],
                                                        [ ".flexRow.flex_spaceBetween",
                                                          [ [ ".label", "@Fees total:"],
                                                            [ ".label", "@£ 0.00"],
                                                          ],
                                                        ],
                                                        [ ".flexRow.flex_spaceBetween",
                                                          [ [ ".label", "@Fees percentage:"],
                                                            [ ".label", "@% 0.0"],
                                                          ],
                                                        ],
                                                        [ ".flexRow.flex_spaceBetween",
                                                          [ [ ".label", "@Total Amount to "+transactionSpec.direction+":"],
                                                            [ ".label", "@"+transactionSpec.quantityFormatted ],
                                                          ],
                                                        ],
                                                        // [ ".flexRow.flex_spaceBetween",
                                                        //   [ [ ".label", "@Fees percentage:"],
                                                        //     [ ".label", "@0.0%"],
                                                        //   ],
                                                        // ],
                                                        [ ".approveCancelButtonGroup.flexRow.flex_spaceBetween",
                                                          [ [ "button.cancelTransaction.pauseOnLoad.buttonLeaf.buttonLeafSymetric.inputElement", "@Cancel Transaction" ],
                                                            [ "button.approveTransaction.pauseOnLoad.buttonLeaf.buttonLeafSymetric", "@Approve & Confirm" ],
                                                            // [ "button.awaitValidationNotification.flex_grow1.buttonLeaf.buttonLeafSymetric", "@Await Notification" ],
                                                          ],
                                                        ],
                                                      ],
                                                    ],
                                                    validationResponsePhase,
                                                    null
                                                  );
                                                  
                                                  debugger;
                                                  

                                                  validationResponsePhase.phaseContent.find(".pauseOnLoad").attr("disabled", "disabled");
                                                  
                                                  setTimeout
                                                      ( () => 
                                                        { validationResponsePhase.phaseContent.find(".pauseOnLoad").attr("disabled", null);
                                                          // transactionSummaryPhase.submitTransactionForValidation.toggleClass("disabled", false);
                                                        },
                                                        1200
                                                      )

                                                  // validationResponsePhase.awaitValidationNotification.on
                                                  // ( "click",
                                                  //   (event) =>
                                                  //   {
                                                  //     validationResponsePhase.phaseContent.attr("disabled", "disabled");
                                                  //     newTransaction.closeButton.trigger("click");
                                                  //   }
                                                  // );
                                                    
                                                  validationResponsePhase.cancelTransaction.on
                                                  ( "click",
                                                    (event) =>
                                                    {
                                                      validationResponsePhase.cancelTransaction.attr("disabled", "disabled");
                                                      validationResponsePhase.approveTransaction.attr("disabled", "disabled");
                                                      
                                                      let eventToSend = 
                                                          {
                                                            "eventID": "uiMajorStateCollection",
                                                            "uiMajorStateCollectionParameters":
                                                                {
                                                                  "command"           : "cancelTransaction",
                                                                  "targetNodeName"    : "newTransaction",
                                                                  "newTransactionID"  : validationResponsePhase.newTransactionID,
                                                                }
                                                          };

                                                      O.create
                                                      ( [ validationResponsePhase.phaseContent,
                                                          ".cancellingTransaction.width100.textAlign_center", "@cancelling transaction",
                                                        ],
                                                        validationResponsePhase,
                                                        null
                                                      );
                                                      nodes.sendEventToServer(eventToSend);
                                                    }
                                                  );
                                                  
                                                  validationResponsePhase.approveTransaction.on
                                                  ( "click",
                                                    (event) =>
                                                    {
                                                      $(".validationResponsePhase button").attr("disabled", "disabled");
                                                      
                                                      
                                                      let eventToSend = 
                                                          {
                                                            "eventID": "uiMajorStateCollection",
                                                            "uiMajorStateCollectionParameters":
                                                                {
                                                                  "command"           : "approveTransaction",
                                                                  "targetNodeName"    : "newTransaction",
                                                                  "newTransactionID"  : validationResponsePhase.newTransactionID,
                                                                }
                                                          };
                                                      
                                                      O.create
                                                      ( [ validationResponsePhase.phaseContent,
                                                          ".approvingTransaction.width100.textAlign_center", "@approving transaction",
                                                        ],
                                                        validationResponsePhase,
                                                        null
                                                      );
                                                      nodes.sendEventToServer(eventToSend);
                                                    }
                                                  );
                                                  
                                                  // validationResponsePhase.submitTransactionForValidation.on
                                                  // ( "click",
                                                  //   (event) =>
                                                  //   {
                                                  //     let eventToSend = 
                                                  //         {
                                                  //           "eventID": "uiMajorStateCollection",
                                                  //           "uiMajorStateCollectionParameters":
                                                  //               {
                                                  //                 "command"       : "submitTransactionForValidation",
                                                  //                 "targetNodeName": "newTransaction",
                                                  //                 "transactionSpec": transactionSpec,
                                                  //               }
                                                  //         };
                                                  //     transactionSummaryPhase.submitTransactionForValidation.attr("disabled", "disabled");
                                                  //     transactionSummaryPhase.submitTransactionForValidation.toggleClass("validating", true);
                                                      
                                                  //     loadPhaseCollection.backButtonState("disabled");
                                                  //     // nodes.pocMainContent.toggleClass("userSelectNone", true);
                                                  //     O.create
                                                  //     ( [ transactionSummaryPhase.phaseContent,
                                                  //         ".validatingTransaction", "@validating transaction",
                                                  //       ],
                                                  //       transactionSummaryPhase,
                                                  //       null
                                                  //     );
                                                  //     nodes.sendEventToServer(eventToSend);
                                                  //   }
                                                    
                                                  // )
                                                  
                                                  
                                                  validationResponsePhase.loaded = true;

                                                  validationResponsePhase.phaseContent.fadeIn(200);
                                              },
                                            "next":
                                                () =>
                                                {
                                                  validationResponsePhase.phaseContent.fadeOut(100);
                                                },
                                            "back":
                                                () =>
                                                {
                                                  validationResponsePhase.phaseContent.fadeOut(100);
                                                }
                                        };
                                        
                                        
                                    
                                    phaseCollection.push(directionOfTransferPhase);
                                    phaseCollection.push(targetAccountPhase);
                                    phaseCollection.push(quantityAndDescriptionPhase);
                                    phaseCollection.push(transactionSummaryPhase);
                                    phaseCollection.push(validationResponsePhase);
                                    loadPhaseCollection.next();  
      }

      this.phaseItem = 
          function(phaseName, phaseTitle, referenceObject, loadFunction, nextFunction, backFunction)
          {
            let phaseItem_toReturn = referenceObject[phaseName] =
                { "load":
                     () =>
                      {
                          // loadPhaseCollection.backButtonState("dis");
                          
                        // if (transactionSummaryPhase.loaded !== true)
                        // { 
                          let transactionSpec = transactionSummaryManager.transactionSpec;
                          
                          O.create
                          ( [ referenceObject.phaseContainer_phaseContent,
                              ".phaseContent."+phaseName+".displayNone.flexAlignItemsCenter.flexJustifyContentCenter",
                              [ [ ".title.textAlign_center", "@"+phaseTitle],
                                [ ".flexRow.flex_spaceBetween",
                                  [ [ ".label", "@Fees total:"],
                                    [ ".label", "@£ 0.00"],
                                  ],
                                ],
                                [ ".flexRow.flex_spaceBetween",
                                  [ [ ".label", "@Fees percentage:"],
                                    [ ".label", "@% 0.0"],
                                  ],
                                ],
                                [ ".flexRow.flex_spaceBetween",
                                  [ [ ".label", "@Total Amount to "+transactionSpec.direction+":"],
                                    [ ".label", "@"+transactionSpec.quantityFormatted ],
                                  ],
                                ],
                                // [ ".flexRow.flex_spaceBetween",
                                //   [ [ ".label", "@Fees percentage:"],
                                //     [ ".label", "@0.0%"],
                                //   ],
                                // ],
                                [ ".approveCancelButtonGroup.flexRow.flex_spaceBetween",
                                  [ [ "button.cancelTransaction.pauseOnLoad.buttonLeaf.buttonLeafSymetric.inputElement", "@Cancel Transaction" ],
                                    [ "button.approveTransaction.pauseOnLoad.buttonLeaf.buttonLeafSymetric", "@Approve & Confirm" ],
                                    // [ "button.awaitValidationNotification.flex_grow1.buttonLeaf.buttonLeafSymetric", "@Await Notification" ],
                                  ],
                                ],
                              ],
                            ],
                            validationResponsePhase,
                            null
                          );
                          
                          debugger;
                          

                          validationResponsePhase.phaseContent.find(".pauseOnLoad").attr("disabled", "disabled");
                          
                          setTimeout
                              ( () => 
                                { validationResponsePhase.phaseContent.find(".pauseOnLoad").attr("disabled", null);
                                  // transactionSummaryPhase.submitTransactionForValidation.toggleClass("disabled", false);
                                },
                                1200
                              )

                          // validationResponsePhase.awaitValidationNotification.on
                          // ( "click",
                          //   (event) =>
                          //   {
                          //     validationResponsePhase.phaseContent.attr("disabled", "disabled");
                          //     newTransaction.closeButton.trigger("click");
                          //   }
                          // );
                            
                          validationResponsePhase.cancelTransaction.on
                          ( "click",
                            (event) =>
                            {
                              validationResponsePhase.cancelTransaction.attr("disabled", "disabled");
                              validationResponsePhase.approveTransaction.attr("disabled", "disabled");
                              
                              let eventToSend = 
                                  {
                                    "eventID": "uiMajorStateCollection",
                                    "uiMajorStateCollectionParameters":
                                        {
                                          "command"           : "cancelTransaction",
                                          "targetNodeName"    : "newTransaction",
                                          "newTransactionID"  : validationResponsePhase.newTransactionID,
                                        }
                                  };

                              O.create
                              ( [ validationResponsePhase.phaseContent,
                                  ".cancellingTransaction.width100.textAlign_center", "@cancelling transaction",
                                ],
                                validationResponsePhase,
                                null
                              );
                              nodes.sendEventToServer(eventToSend);
                            }
                          );
                          
                          validationResponsePhase.approveTransaction.on
                          ( "click",
                            (event) =>
                            {
                              $(".validationResponsePhase button").attr("disabled", "disabled");
                              
                              
                              let eventToSend = 
                                  {
                                    "eventID": "uiMajorStateCollection",
                                    "uiMajorStateCollectionParameters":
                                        {
                                          "command"           : "approveTransaction",
                                          "targetNodeName"    : "newTransaction",
                                          "newTransactionID"  : validationResponsePhase.newTransactionID,
                                        }
                                  };
                              
                              O.create
                              ( [ validationResponsePhase.phaseContent,
                                  ".approvingTransaction.width100.textAlign_center", "@approving transaction",
                                ],
                                validationResponsePhase,
                                null
                              );
                              nodes.sendEventToServer(eventToSend);
                            }
                          );
                          
                          // validationResponsePhase.submitTransactionForValidation.on
                          // ( "click",
                          //   (event) =>
                          //   {
                          //     let eventToSend = 
                          //         {
                          //           "eventID": "uiMajorStateCollection",
                          //           "uiMajorStateCollectionParameters":
                          //               {
                          //                 "command"       : "submitTransactionForValidation",
                          //                 "targetNodeName": "newTransaction",
                          //                 "transactionSpec": transactionSpec,
                          //               }
                          //         };
                          //     transactionSummaryPhase.submitTransactionForValidation.attr("disabled", "disabled");
                          //     transactionSummaryPhase.submitTransactionForValidation.toggleClass("validating", true);
                              
                          //     loadPhaseCollection.backButtonState("disabled");
                          //     // nodes.pocMainContent.toggleClass("userSelectNone", true);
                          //     O.create
                          //     ( [ transactionSummaryPhase.phaseContent,
                          //         ".validatingTransaction", "@validating transaction",
                          //       ],
                          //       transactionSummaryPhase,
                          //       null
                          //     );
                          //     nodes.sendEventToServer(eventToSend);
                          //   }
                            
                          // )
                          
                          
                          validationResponsePhase.loaded = true;

                          validationResponsePhase.phaseContent.fadeIn(200);
                      },
                    "next":
                        () =>
                        {
                          validationResponsePhase.phaseContent.fadeOut(100);
                        },
                    "back":
                        () =>
                        {
                          validationResponsePhase.phaseContent.fadeOut(100);
                        }
                };
          }
  


}(jQuery);

window.O = ThisEqualsThat.BootstrapObjects;
