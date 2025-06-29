if (switchToThisMode === "questionnaire")
                {
                  if (currentModeState === "default")
                  {
                    // inject the markup for the questionaire version
                    defaultLoggerFunction
                      (  
                        [ 
                          { "jsonPassThroughData": { },
                            "toEval":
                                ( () =>
                                  {
                                    debugger;
                                    
                                    let nodes = namespace.getMustExist(atApplication, "nodes");
                                    
                                    // STOP THE BABYLONJS RENDER LOOP
                                    namespace.getMustExist(nodes, "babylonJSScene.engine").stopRenderLoop();
                                    


                                    let pointDataByUserIDDict               = namespace.getMustExist(nodes      , "userNamespace.userPointData");
                                    
                                    // gonna want to process this data content into the dimensions
                                    let questionnairePointDataByUserID_dict = namespace(nodes, "questionnaire.questionnairePointDataByUserID_dict");
                                    let questionnaireFunctions              = namespace(nodes, "questionnaire.functions");
                                    
                                    
                                    let questionnaireLayout = namespace.getIfExists(nodes, "questionnaire.layout");
                                    // if (namespace.isNotFound(questionnaireLayout))
                                    nodes.questionnaireDiv.html("");
                                    questionnairePointDataByUserID_dict = namespace.setValue(nodes, "questionnaire.questionnairePointDataByUserID_dict", {}, {"overwrite":true});
                                    
                                    
                                    
                                  
                                    questionnaireLayout = {};
                                    
                                    let dimensionSpecificationByNameDict = nodes.dimensionSpecificationByNameDict
                                  
                                    
                                    let dimensionElementList = [];
                                    let questionCounter = 0;
                                    
                                    let dimensionPostfix_list = ["x", "y", "z", "a"];
                                    
                                    for (let dimensionPostfix of dimensionPostfix_list)
                                    {
                                      let oDAU_containerIdentifier = "oneDimensionAllUsersOn_"+dimensionPostfix;
                                      window.localStorage.removeItem(oDAU_containerIdentifier+"_ordering");
                                      
                                      let dimensionName = "dim_"+dimensionPostfix;
                                      
                                      let dimensionSpec = dimensionSpecificationByNameDict[dimensionName];
                                      
                                      dimensionElementList.push
                                      ( [ "section.dimension_container.flexColumn.width100", 
                                          {"attr":[["aria-label", "Question "+questionCounter]]},
                                          {"attr":[["tabindex", "0"]]},
                                          [ [ ".description", "@"+dimensionSpec.questionFullText,
                                              {"attr":[["tabindex", "0"]]},
                                            ],
                                            [ ".treeExpandAndDimension.flexRow",
                                              [
                                                [ "button.expandDimensionAllUsers_button.alignSelf_center", {"data":[["dimensionPostfix",dimensionPostfix]] },
                                                  "iconify-icon", {"attr":[["icon","mdi:file-tree"]]},
                                                ],
                                                
                                                [
                                                  ".dimension_container_"+dimensionPostfix+".flexColumn.flex_grow1",
                                                  [
                                                    [ ".dimensionExtremes.flexRow.flex_grow1.flex_spaceBetween",
                                                      [ 
                                                        [ ".min", "@"+dimensionSpec.questionScaleMin,
                                                          {"attr":[["tabindex", "0"]]},
                                                          {"attr":[["aria-hidden", "true"]]},
                                                        ],
                                                        [ ".max", "@"+dimensionSpec.questionScaleMax,
                                                          {"attr":[["tabindex", "0"]]},
                                                          {"attr":[["aria-hidden", "true"]]},
                                                        ],
                                                      ],
                                                    ],
                                                    [ "#"+dimensionName+"_questionnaire"+".slider.positionRelative",
                                                    ]
                                                  ]
                                                ],
                                              ],
                                            ],
                                            // [ "input#"+dimensionName+"_questionnaire"+".slider", 
                                            //   {"attr":  [["type","range"],["min","1"],["max","100"],["value","50"]] },
                                            //   {"attr":  [["aria-label", "Choose your rating from  "+dimensionSpec.questionScaleMin+" to "+dimensionSpec.questionScaleMax]]},
                                            // ],
                                          ],
                                        ],
                                      );
                                    }
                                    
                                    debugger;
                                    
                                    //  * lets design the points
                                    //  * so the points are created when the UI is loaded, and they are then slided into position after creation
                                    //  * each point has these dimensions
                                    //    * pointID - what user email hash aligns to that point, each point has 4 siblings in this dimension
                                    //    * dimension - what dimension is the point on (x,y,z,a - dimensionPostfix)
                                    //    * thisUserPoint - is this point from the current user
                                    //    * multiPoint - are there points from other users at the same location on this dimension
                                    //   * something it has proven a bit complex to manage is the transition-durations, but actually I think i have come
                                    //     up with a way of making this simpler, to have the sliding point not almagmate with the other points in the same
                                    //     location as it until one stops moving the slider.
                                    //     * this also makes the code simpler
                                    //   * hover state... so currently when hovering over a point, we see all the other points that have same user
                                    //     * there is an issue with this, that this doesnt really make sense for multiPoints
                                    //     * also what about showing the notes for multiPoints
                                        
                                    
                                    O.create
                                        ( [ nodes.questionnaireDiv,
                                            dimensionElementList
                                          ],
                                          questionnaireLayout,
                                          null
                                        );
                                    
let styleAtoms = 
                                        {
                                          "growAPointAndBringToTheFront":
`
z-index: 200 !important;

transform: scale(1.4);
opacity: 1.0;

transition-duration: 300ms;
`,
                                          "shrinkToAidFocus":
`
z-index: 0 !important;

transform: scale(0.8);
opacity: 0.7;
`,
                                        };
                                    
                                    O.create
                                        ( [ nodes.questionnaireDiv, {"css":[["overflow-x", "hidden"]] },
                                            "style.questionnaireDivStyle",
`@
.questionnaireDiv
{
  /*position: absolute;*/
  pointer-events: all;
  left:20px;
  top:20px;
  color: white;
  text-align: center;
  background: rgba(51,51,76,1);
  padding: 3%;
  /*border-radius: 16px 0px 0px 16px;
  border: 1px solid #555555;*/
  padding-top: 128px;
}

.questionnaireDiv .dimension_container
{ 
margin-bottom: 18px;
padding: 0px 0px 14px 4px;
overflow: hidden;
}

.questionnaireDiv .description
{
  display: none;
}

.questionnaireDiv .slider
{ 
  height: 4px;
  margin-bottom:3px;
  margin-top: 16px;
  margin-right: 8px;
  margin-left: 32px;
  
  border-radius:2px;
  background-color: lightgray;
}

button.expandDimensionAllUsers_button
{
color: lightgray;
font-size: 1.2em;
/* height: fit-content; */
padding: 8px;
border-radius: 50%;

transition-property: transform, background-color;
transition-duration: 600ms;
transform: rotate(0deg);
/* background-color: rgba(20,20,20,0.8);*/
}
button.expandDimensionAllUsers_button.expanded
{
/*background-color: rgba(255,255,255,0.2); */

transform: rotate(90deg);
}

.questionnairePoint
{
top: -8px;
left: -10px;

height: 20px;
width: 20px;

border-radius: 50%;

background-color: green;

transition-property: transform, background-color, opacity;
transition-duration: 300ms;
}
.questionnairePoint.multiPoint
{
  top: -10px;
  left -4px;
  
  border-style: dashed;
  background-color: #00d0ff;
  border-color: white;
  box-sizing: content-box;
  
  
  user-select: none;
}
body:not(.showOtherUsers) .questionnairePoint.multiPoint
{
 z-index: 0 !important;

  transform: scale(0.7);
  opacity: 0.3;
}

body:not(.showOtherUsers) .questionnairePoint:not(.pointID_${nodes.userID})
{
z-index: 0 !important;

transform: scale(0.7);
opacity: 0.3;
}
body:not(.showOtherUsers) .projectContainer.thisUser_currentlySlidingSlider .questionnairePoint.pointID_${nodes.userID}.multiPoint
{
z-index: 0 !important;

transform: scale(0.7);
opacity: 0.3;
}

.oDAUPointItem
{
margin-bottom: 4px;
}
.oDAUPointItem .notesSlider
{
min-width: 200px;
width: 200px;
transform: scale(0.333);
pointer-events: none;
  margin-left: -32px;
  margin-right: -56px;
  margin-top: 0.65em;
}
.oDAUPointItem .notes
{
font-size: 0.9em;
margin-top: 2px;
font-weight: 100;
}

.opacity100
{
  opacity: 100;
}
`,
                                          ],
                                          questionnaireLayout,
                                          null
                                        );
                                        
                                    globalThis.dimensions_container = questionnaireLayout.dimensions_container;
                                    
                                    
                                    // CSS / STATE DIMENSION BRIDGE
                                    
                                    let dynamicStyleState_dict = {};

                                    // dynamically create a style which will highlight thisUser's points whilst thisUser is moving the sliders about
                                    //   the class management for this is implemented in the cubePage codeBlock to avoid bs with teardown
                                    //   hmm. maybe it would be easier to just do it here.
                                    //   there are many options
                                    O.create
                                        ( [ "style.highlightAllPointsForThisUser",
`@
.projectContainer.thisUser_currentlySlidingSlider .questionnairePoint:is(.pointID_${nodes.userID}):not(.multiPoint)
{ ${styleAtoms.growAPointAndBringToTheFront}
}
.projectContainer.thisUser_currentlySlidingSlider .questionnairePoint.pointID_${nodes.userID}
{ display: block !important;
}
.projectContainer.thisUser_currentlySlidingSlider .questionnairePoint
{
z-index: 0 !important;

transform: scale(0.7);
opacity: 0.3;
}


`
                                          ],
                                          dynamicStyleState_dict,
                                          nodes.projectContainer
                                        );
  
  
                                    let highlightAllRelevantPoints_byPointElement = 
                                        ($currentTarget, dynamicStyleName, showOrHide) =>
                                        {
                                          if (showOrHide === "show")
                                          {
                                            let pointID = $currentTarget.data("pointID");
                                            
                                            // make a list of pointID_XYZ points as the selector
                                            let cssSelector = `.questionnairePoint:is(${pointID.map(pointIDItem => ".pointID_"+pointIDItem).join(", ")})`;
                                            // push the style into the DOM
                                            O.create
                                                ( [ "style."+dynamicStyleName,
`@
${cssSelector}
{ ${styleAtoms.growAPointAndBringToTheFront}
}
.questionnairePoint
{
${styleAtoms.shrinkToAidFocus}
}
`
                                                  ],
                                                  dynamicStyleState_dict,
                                                  nodes.projectContainer
                                                );
                                          }
                                          else if (showOrHide === "hide")
                                          {
                                            dynamicStyleState_dict[dynamicStyleName].remove();
                                          }
                                        }
                                    // when hovering over a point, highlight all other relevant points
                                    //   require that the hovered element.data(pointID) contains either a single pointID string, or a list of pointID strings
                                    //   on mouseleave just delete the created style
                                    // NOTE: might need to create unique styleIDs, if it turns out the order of the events isnt the thing
                                    nodes.questionnaireDiv.on
                                        ( "mouseenter mouseleave", ".questionnairePoint",
                                          (event) =>
                                          {
                                            debugger;
                                            
                                            let $currentTarget = $(event.currentTarget);
                                            
                                            let pointID = $currentTarget.data("pointID");
                                            if (!pointID.includes(nodes.userID) && !$("body").hasClass("showOtherUsers")) 
                                            { 
                                              $currentTarget.attr("title", "");
                                              return;
                                            }
                                            
                                            if (event.type === "mouseenter")
                                            {
                                              highlightAllRelevantPoints_byPointElement($currentTarget, "highlightAllRelevantPoints_hover", "show")

//                                               // make a list of pointID_XYZ points as the selector
//                                               let cssSelector = `.questionnairePoint:is(${pointID.map(pointIDItem => ".pointID_"+pointIDItem).join(", ")})`;
//                                               // push the style into the DOM
//                                               O.create
//                                                   ( [ "style.highlightAllRelevantPoints_hover",
// `@
// ${cssSelector}
// { ${styleAtoms.growAPointAndBringToTheFront}
// }
// .questionnairePoint
// {
// ${styleAtoms.shrinkToAidFocus}
// }
// `
//                                                     ],
//                                                     dynamicStyleState_dict,
//                                                     nodes.projectContainer
//                                                   );
                                                  
                                              
                                              {
                                                allUsersAtNewValue_list = $currentTarget.data("pointID");
                                                if (!$("body").hasClass("showOtherUsers")) allUsersAtNewValue_list = [nodes.userID];
                                                let dimensionPostfix = $currentTarget.data("dimensionPostfix");
                                                // if (allUsersAtNewValue_list.length > 1)
                                                {
                                                  debugger;
                                                  // let multiPointElement = namespace.getMustExist(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+dimension_newValue_normalised+".multiPoint");
                                                  
                                                  let titleString = "";
                                                  let counter = 0;
                                                  for (let getNotesPointID of allUsersAtNewValue_list)
                                                  {
                                                    let notesOnPoint = pointDataByUserIDDict[getNotesPointID].notes[dimensionPostfix];
                                                    if (notesOnPoint.length > 300) notesOnPoint = notesOnPoint.substring(0,297)+"...";
                                                    if (notesOnPoint.length === 0) notesOnPoint = "<no comment made...>";
                                                    titleString += notesOnPoint.replace(/\n/g, ". ")+"\u000A";
                                                    counter ++;
                                                    if (counter > 10) 
                                                    { titleString += "<... max 10 entries in popup>"
                                                      break;
                                                    }
                                                  }
                                                  $currentTarget.attr("title",titleString);
                                                }
                                              }
                                            }
                                            else if (event.type === "mouseleave")
                                            {
                                              // remove the style from the DOM
                                              ls("highlightAllRelevantPoints_hover: mouseleave");
                                              // $(".highlightAllRelevantPoints_hover").remove();
                                              highlightAllRelevantPoints_byPointElement(null, "highlightAllRelevantPoints_hover", "hide");
                                            }
                                          }
                                          
                                        );
                                    
                                  
                                    
                                    
                                    // ONE DIMENSION ALL USERS
                                    nodes.questionnaireDiv.on
                                        ( "click", ".expandDimensionAllUsers_button",
                                          (event) =>
                                          {
                                            debugger;
                                            let $currentTarget = $(event.currentTarget);
                                            
                                            let dimensionPostfix = $currentTarget.data("dimensionPostfix");
                                            
                                            let expanded = namespace.leafNode(questionnaireLayout, "expandDimensionAllUsers."+dimensionPostfix+".expanded", false);
                                            
                                            if (expanded === false)
                                            {
                                              let oDAU_containerIdentifier = "oneDimensionAllUsersOn_"+dimensionPostfix;
                                              
                                              let pointDataUsedTracker_list = Object.keys(pointDataByUserIDDict);
                                              let pointIDOrder_list = JSON.parse(window.localStorage.getItem(oDAU_containerIdentifier+"_ordering"));
                                              if (! isArray(pointIDOrder_list)) 
                                              { 
                                                pointIDOrder_list = Object.keys(pointDataByUserIDDict);
                                                pointIDOrder_list.sort
                                                    ( (pointID_a, pointID_b) => 
                                                      { 
                                                        debugger;
                                                        
                                                        let valueAddress = "position."+dimensionPostfix;
                                                        if (dimensionPostfix === "a") valueAddress = "color";
                                                        
                                                        return namespace(pointDataByUserIDDict[pointID_a], valueAddress) - namespace(pointDataByUserIDDict[pointID_b], valueAddress);
                                                        // return pointDataByUserIDDict[pointID_a][valueAddress] - pointDataByUserIDDict[pointID_b][valueAddress];
                                                      }
                                                    );
                                              }
                                              if (pointIDOrder_list.length < pointDataUsedTracker_list.length)
                                              {
                                                pointIDOrder_list.push(...pointDataUsedTracker_list.slice(pointIDOrder_list.length));
                                              }
                                              
                                              let dataPoints_oCreateList = [];
                                              for (let pointID of pointIDOrder_list)
                                              {
                                                debugger;
                                                
                                                let pointData = pointDataByUserIDDict[pointID];
                                                
                                                try
                                                {
                                                  let notes     = pointData.notes[dimensionPostfix];
                                                  let position  = Math.floor(pointData.position[dimensionPostfix] * 100);
                                                  if (dimensionPostfix === "a") position = Math.floor(pointData.color * 100);
                                                  
                                                  dataPoints_oCreateList.push
                                                      (
                                                        [ "."+pointID+"_oneDimensionAllUsers_"+dimensionPostfix+".oDAUPointOn_"+dimensionPostfix+".oDAUPointItem.flexRow",
                                                            {"data": [["pointID",pointID]] },
                                                          [
                                                            [ "input#.slider.notesSlider.width100", 
                                                                  {"attr": [["type","range"],["min","1"],["max","100"],["value",""+position]] },
                                                              
                                                            ],
                                                            [ ".notes", "@"+notes,
                                                            ]
                                                          ]
                                                        ]
                                                      );
                                                }
                                                catch (error)
                                                {
                                                  ls("@: howDidILikeThat: expandDimensionAllUsers_button: error processing point: "+error.message);
                                                }
                                                
                                                
                                              }
                                              
                                              let oDAUElements_dict = {};
                                              
                                              O.create
                                                  ( 
                                                    [ "."+oDAU_containerIdentifier+".flexColumn",
                                                      dataPoints_oCreateList
                                                    ],
                                                    oDAUElements_dict,
                                                    nodes.doubleBuffer
                                                  );
                                              let oDAU_container = oDAUElements_dict[oDAU_containerIdentifier];
                                              let oDAUElements_height = oDAU_container.height();
                                              debugger;
                                              O.create
                                                  ( [ "style",
`@
.${oDAU_containerIdentifier}
{
  height: 0px;
  margin-top: 0px;
  margin-bottom: 0%;
  opacity: 0;

  transition-property: height, margin-top, margin-bottom, opacity;
  transition-duration: 600ms;
}
.${oDAU_containerIdentifier}.expanded
{
  opacity: 1;
  height: ${oDAUElements_height}px;
  margin-top: 24px;
  /*margin-bottom: -5%;*/
}
.oDAUPointItem
{
  cursor: n-resize;
}

`
                                                    ],
                                                    oDAUElements_dict,
                                                    oDAU_container
                                                  );
                                              debugger;
                                              
                                              oDAU_container.sortable
                                                  ( {
                                                      "revert":true,
                                                      "axis": "y",
                                                      "stop": 
                                                          (event, ui) => 
                                                          {
                                                            debugger;
                                                            let pointIDOrder_list = [];
                                                            oDAU_container.children().each(function () {debugger;  let $this = $(this); pointIDOrder_list.push($(this).data("pointID")); } )
                                                            window.localStorage.setItem(oDAU_containerIdentifier+"_ordering", JSON.stringify(pointIDOrder_list));
                                                          }
                                                    }
                                                  );
                                              $( ".oDAUPointItem" ).disableSelection();
                                              
                                            if (! namespace.isNotFound(questionnaireLayout, "oDAU_"+dimensionPostfix) ) questionnaireLayout["oDAU"+dimensionPostfix].remove();
                                              oDAU_container.appendTo(questionnaireLayout["dimension_container_"+dimensionPostfix]);
                                              questionnaireLayout["oDAU_"+dimensionPostfix] = oDAU_container;
                                              
                                              setImmediate(() => questionnaireLayout["oDAU_"+dimensionPostfix].toggleClass("expanded", true));
                                              $currentTarget.toggleClass("expanded", true);
                                              
                                              namespace.setValue(questionnaireLayout, "expandDimensionAllUsers."+dimensionPostfix+".expanded", true, {"overwrite":true});
                                            }
                                            else
                                            {
                                            debugger;
                                              let expandDimensionAllUsers = namespace.getMustExistRM(questionnaireLayout, "oDAU_"+dimensionPostfix);
                                              expandDimensionAllUsers
                                                  .toggleClass("expanded", false)
                                                  .on
                                                      ( "transitionend", 
                                                        () => 
                                                        { 
                                                          expandDimensionAllUsers.remove();
                                                          // namespace.setValue(questionnaireLayout, "expandDimensionAllUsers."+dimensionPostfix+".expanded", false, {"overwrite":true});
                                                        }
                                                      );
                                              $currentTarget.toggleClass("expanded", false);
                                              
                                              namespace.setValue(questionnaireLayout, "expandDimensionAllUsers."+dimensionPostfix+".expanded", false, {"overwrite":true});
                                            }
                                            
                                            
                                            
                                          }
                                        );
                                        
                                    
                                    nodes.questionnaireDiv.on
                                        ( "click", ".questionnairePoint",
                                          (event) =>
                                          {
                                            debugger;
                                            
                                            let $currentTarget    = $(event.currentTarget);
                                            let pointID           = $currentTarget.data("pointID");
                                            
                                            if (!$("body").hasClass("showOtherUsers") && !pointID.includes(nodes.userID)) return;
                                            
                                            nodes.projectContainer.toggleClass("viewNotes_pointSelected", true);
                                            
                                            highlightAllRelevantPoints_byPointElement($currentTarget, "highlightAllRelevantPoints_showNoteClick", "show");
                                            
                                            // $currentTarget.trigger("mouseenter");
                                            // nodes.currentlySelectedNotesTriggerPoint = $currentTarget;

//                                             O.create
//                                                 ( [ "style.viewNotes_pointSelected",
// `@
// body.showOtherUsers .projectContainer.viewNotes_pointSelected .questionnairePoint:is(.pointID_${pointID})
// { ${styleAtoms.growAPointAndBringToTheFront}
// }
// `
//                                                   ],
//                                                   dynamicStyleState_dict,
//                                                   nodes.projectContainer
//                                                 )
                                            
                                            
                                            nodes.howDidILikeThat.showNotes_callWithAllPointData(pointID);
                                            nodes.notesOverlay_modal.toggleClass("displayNone", false);
                                            setImmediate(() => nodes.notesOverlay_modal.toggleClass("opacity100", true) );
                                          }
                                        );
                                    nodes.notesOverlay_modal.on
                                        ( "click",
                                          () =>
                                          {
                                            nodes.projectContainer.toggleClass("viewNotes_pointSelected", false);
                                            
                                            nodes.howDidILikeThat.showNotes_callWithAllPointData(false);
                                            nodes.notesOverlay_modal
                                                .toggleClass("opacity100", false)
                                                .on("transitionend", () => { if (nodes.notesOverlay_modal.hasClass("opacity100") === false) nodes.notesOverlay_modal.toggleClass("displayNone", true) } );
                                            
                                            highlightAllRelevantPoints_byPointElement(null, "highlightAllRelevantPoints_showNoteClick", "hide");
                                            
                                            // nodes.currentlySelectedNotesTriggerPoint.trigger("mouseleave");
                                            // delete nodes.currentlySelectedNotesTriggerPoint;
                                            // nodes.notesOverlay_modal.toggleClass("displayNone", true);
                                            // dynamicStyleState_dict.viewNotes_pointSelected.remove();
                                          }
                                        );
                                    
                                    
                                    namespace.setValue(nodes, "questionnaire.layout", questionnaireLayout, {"overwrite":true});
                                    
                                    // namespace.setValue(nodes, "currentDisplayState", "questionnaire", {"overwrite":true});
                                    namespace.setValue(nodes, "browserState.cubeDisplayMode", "questionnaire", {"overwrite":true});
                                    
                                    // now run through all the data to update this view
                                    // for (let [userID])
                                    // (newData.userID, [currentPointData.position.z *10, currentPointData.position.y *10, currentPointData.position.x *10]);
                                    
                                    
                                    
                                    let createNewQuestionnairePoint = namespace.setValue
                                        ( questionnaireFunctions, "createNewQuestionnairePoint",
                                          (pointID) =>
                                          {
                                            // create some round div
                                            
                                            debugger;
                                            
                                            let thisQuestionnairePointData = questionnairePointDataByUserID_dict[pointID] = {};
                                            
                                            
                                            for (let dimensionPostfix of dimensionPostfix_list)
                                            {
                                              let dimensionName = "dim_"+dimensionPostfix;
                                              
                                              let sliderParentElement = questionnaireLayout[dimensionName+"_questionnaire"];
                                              
                                              // so all these points wil be the same colour, controlled by the "bottom", a, axis
                                              //   so we can do something about that with some reasonable CSS, 
                                              O.create
                                                  ( [ "."+dimensionName+".questionnairePoint.pointID_"+pointID+".questionnairePoint_"+dimensionName+".positionAbsolute",
                                                          // {"attr": [["title", pointDataByUserIDDict[pointID].notes[dimensionPostfix] ]] },
                                                          {"data": [["pointID", [pointID] ],["dimensionPostfix", dimensionPostfix]] }, 
                                                          // {"toggleClass":[["thisUserPoint",pointID === nodes.userID]]},
                                                    ],
                                                    namespace(thisQuestionnairePointData, "sliderHandles"),
                                                    sliderParentElement
                                                  );
                                            }
                                            
                                            return thisQuestionnairePointData;
                                          },
                                          {"overwrite":true}
                                        );
                                    
                                    
                                    // these two memoise dicts work together to keep track of the moving points and when they overlap with each other
                                    //   this is more complex than in 3D, because there are 4 dimensions where points can overlap whereas in 3D there is only
                                    //     ONE position in which points can overlap
                                    //   that is why we need to memoise inside the questionnaire code, as the geneeric wrapper does not need this information.
                                    // Memoise the position per user per dimension
                                    let positionByUserByDimension_dict                    = {};
                                    // memoise the users per dimension per position
                                    let userIDsByDimensionByAxisPosition_dict             = {};

                                    // place to store references to the multiPoint elements for when two or points are overlapping in the same location on an axis
                                    //   this is quite different to the scenario in the 3d scene as in this space each of the 4 axes can have separate
                                    //   overlaps, whereas in the 3d space, all three positional axes must match for the point to overlap
                                    let multiPointsByDimensionByPosition_dict = {};
                                    
                                    // TODO - check this out
                                    
                                    console.log("TODO: finish the multipoint stuff, since its not actually there in the dict properly because its not finished");

                          		      namespace.setValue
                          		          ( questionnaireFunctions, "updateQuestionnairePosition",
                          		            // (newData.userID, [currentPointData.position.z *10, currentPointData.position.y *10, currentPointData.position.x *10])
                          		            (pointID, newScoreArray) =>
                                          {
                                              if (! questionnairePointDataByUserID_dict.hasOwnProperty(pointID))
                                              {
                                                createNewQuestionnairePoint(pointID);
                                              }
                                              
                                              let pointData     = namespace.getMustExist(questionnairePointDataByUserID_dict, pointID);

                                              // debugger;
                                              
                                              // [ ] mouse over behaviour?
                              
                                              
                                              // [x] position the dot
                                              let dimensionCounter = 0;
                                              let dimensionPostfix_list = ["x", "y", "z"];
                                              for (let dimensionPostfix of dimensionPostfix_list)
                                              {
                                                // if (dimensionPostfix === "a") continue;
                                                // might need to make the value an integer rather than a float? Not sure, might get converted to a string
                                                
                                                let dimensionName       = "dim_"+dimensionPostfix;
                                                let dimension_newValue  = newScoreArray[dimensionCounter];
                                                let dimension_newValue_normalised = Math.floor(dimension_newValue *10);
                                                
                                                updateSingleDimension(pointID, dimensionPostfix, dimension_newValue, dimension_newValue_normalised);
                                                
                                                dimensionCounter++;
                                              }
                                          },
                                          {"overwrite":true}
                                        );
                                        
                                    let updateSingleDimension = 
                                        (pointID, dimensionPostfix, dimension_newValue, dimension_newValue_normalised) =>
                                        {
                                            let pointData     = namespace.getMustExist(questionnairePointDataByUserID_dict, pointID);
                                            
                                            let dimensionName = "dim_"+dimensionPostfix;
                                            
                                            let oldValueForThisUserOnThisDimension = namespace.getIfExists(positionByUserByDimension_dict, pointID+"."+dimensionPostfix);
                                            if (dimension_newValue_normalised !== oldValueForThisUserOnThisDimension)
                                            {
                                              let sliderHandle = namespace.getMustExist(pointData, "sliderHandles."+dimensionName);
                                              sliderHandle.css("left", "calc("+dimension_newValue_normalised+"% - 20px)");
                                              sliderHandle.css("z-index", dimension_newValue_normalised);
                                              sliderHandle.attr("at_sliderposition", dimension_newValue_normalised);
                                              
                                              // OLD POSITION
                                              // remove this point from its old position
                                              let allUsersAtOldValue_dict = namespace.getIfExists(userIDsByDimensionByAxisPosition_dict, dimensionPostfix+"."+oldValueForThisUserOnThisDimension);
                                              if (! namespace.isNotFound(allUsersAtOldValue_dict))
                                              {
                                                delete allUsersAtOldValue_dict[pointID];
                                                
                                                let allUsersAtOldValue_list = Object.keys(allUsersAtOldValue_dict);
                                                ls("@: howDidILikeThat: updateQuestionnairePosition: old: "+dimensionPostfix+": "+oldValueForThisUserOnThisDimension+": "+allUsersAtOldValue_list.length);
                                                if (allUsersAtOldValue_list.length === 1)
                                                {
                                                  namespace.getMustExistRM(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+oldValueForThisUserOnThisDimension+".multiPoint").remove();
                                                  namespace.getMustExistRM(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+oldValueForThisUserOnThisDimension+".style").remove();
                                                }
                                                else if (allUsersAtOldValue_list.length > 1)
                                                {
                                                  // change the number on the existing multiPointElement on this dictionary
                                                  let multiPointElement = namespace.getMustExist(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+oldValueForThisUserOnThisDimension+".multiPoint");
                                                  multiPointElement.text(allUsersAtOldValue_list.length);
                                                  multiPointElement.removeClass("pointID_"+pointID);
                                                  
                                                  // let multiPointElement_container = namespace.getMustExist(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+oldValueForThisUserOnThisDimension+".multiPoint");
                                                }
                                              }
                                              
                                              
                                              // NEW POSITION
                                              // and add this point to its new position
                                              let allUsersAtNewValue_dict = namespace(userIDsByDimensionByAxisPosition_dict, dimensionPostfix+"."+dimension_newValue_normalised);
                                              allUsersAtNewValue_dict[pointID] = true;
                                              let allUsersAtNewValue_list = Object.keys(allUsersAtNewValue_dict);
                                              ls("@: howDidILikeThat: updateQuestionnairePosition: new: "+dimensionPostfix+": "+dimension_newValue_normalised+": "+allUsersAtNewValue_list.length);
                                              // hide all "normal points" at this position on this dimension
                                              
                                              
                                              if (allUsersAtNewValue_list.length === 2)
                                              {
                                                // hide the exsting points from the dimension
                                                // $("#dim_"+dimensionPostfix+"_questionnaire > [at_sliderposition="+dimension_newValue_normalised+"]").toggleClass("displayNone", true);
                                                O.create
                                                    ( [ questionnaireLayout["dim_"+dimensionPostfix+"_questionnaire"],
                                                        [
                                                          [ ".multiPoint.questionnairePoint.positionAbsolute", "@2",
                                                                {"css":[["left","calc("+dimension_newValue_normalised+"% - 23px)"],["z-index",dimension_newValue_normalised]] },
                                                                {"data":[["pointID", allUsersAtNewValue_list],["dimensionPostfix",dimensionPostfix]] },
                                                                {"addClass": [[allUsersAtNewValue_list.map(pointIDItem => "pointID_"+pointIDItem)]] }
                                                          ],
                                                          [
                                                            "style", 
  `@
  #dim_${dimensionPostfix}_questionnaire > .questionnairePoint[at_sliderposition="${dimension_newValue_normalised}"]
  {
  display: none;
  }
  
  #dim_${dimensionPostfix}_questionnaire > .questionnairePoint[at_sliderposition="${dimension_newValue_normalised}"]:is(.pointID_${nodes.userID})
  {
  display: block !important;
  }
  `
                                                          ]
                                                        ],
                                                      ],
                                                      namespace(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+dimension_newValue_normalised),
                                                      null
                                                    );
                                                
                                                
                                              }
                                              else if (allUsersAtNewValue_list.length > 2)
                                              {
                                                // hide the exsting points from the dimension
                                                // $("#dim_"+dimensionPostfix+"_questionnaire > [at_sliderposition="+dimension_newValue_normalised+"]").toggleClass("displayNone", true);
                                                let multiPointElement = namespace.getMustExist(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+dimension_newValue_normalised+".multiPoint");
                                                multiPointElement.addClass("pointID_"+pointID);
                                                multiPointElement.data("pointID", allUsersAtNewValue_list);
                                                multiPointElement.text(allUsersAtNewValue_list.length);
                                                
                                                // ls("@: howDidILikeThat: updateQuestionnairePosition: allUsersAtNewValue_list: " + allUsersAtNewValue_list);
                                              }
                                              
                                              // // //TODO: commented out because dont think this is ready... Trying to make the point expand with a number when slid over
                                              // if (allUsersAtNewValue_list.length > 1 && pointID === nodes.userID)
                                              // {
                                              //   let multiPointElement_container = namespace.getMustExist(multiPointsByDimensionByPosition_dict, dimensionPostfix+"."+dimension_newValue_normalised+".multiPoint");
                                              //   // multiPointElement_container.toggleClass("thisUserPoint", true);
                                              //   ls("@: howDidILikeThat: updateQuestionnairePosition: toggled thisUserPoint");
                                              // }
                                              
                                              
                                              // move the current position of this userID on this dimension
                                              namespace.setValue(positionByUserByDimension_dict, pointID+"."+dimensionPostfix, dimension_newValue_normalised, {"overwrite":true});
                                              
                                            }
                                            
                                            
  
                                          //   dimensionCounter++;
                                          // }
                                        }
                                    
                                    
                                    debugger;
                          		      
                                    
                                    namespace.setValue
                          		          ( questionnaireFunctions, "updateQuestionnaireColor",
                          		            // (newData.userID, [currentPointData.position.z *10, currentPointData.position.y *10, currentPointData.position.x *10])
                          		            (pointID, newColor) =>
                                          {
                                              debugger;
                                              
                                              if (! questionnairePointDataByUserID_dict.hasOwnProperty(pointID))
                                              {
                                                createNewQuestionnairePoint(pointID);
                                              }
                                                

                                              let pointData = namespace.getMustExist(questionnairePointDataByUserID_dict, pointID);
                                              for (let pointElement of Object.values(pointData.sliderHandles) )
                                              {
                                                pointElement.css("background-color", "rgb("+newColor.map(value=>value*255).join(",")+")");
                                              }
                                              
                                              updateSingleDimension(pointID, "a", pointDataByUserIDDict[pointID].color, Math.floor(pointDataByUserIDDict[pointID].color *100) );
    
                                              // $(".questionnairePoint.pointID_"+pointID).css("background-color", "rgb("+newColor.map(value=>value*255).join(",")+")");
                                              
                                              // debugger;
                                              // let colorBaseValue = namespace.getMustExist(nodes, "userNamespace.userPointData."+pointID+".color");
                                              // pointData.sliderHandles.dim_a
                                              //     .css("left"   , "calc("+colorBaseValue*100+"% - 20px)")
                                              //     .css("z-index", Math.floor(colorBaseValue*100));
                                                  
                                              
                                              // let dimensionPostfix = "a";
                                                  
                                              // let oldValueForThisDimension = namespace.getIfExists(oldPointDataByUserID_dict, pointID+"."+dimensionPostfix);
                                              // if (dimension_newValue !== oldValueForThisDimension)
                                              // {
                                              //   let dictAtOldPosition = namespace.getIfExists(userIDsByDimensionByAxisPosition_dict, dimensionPostfix+"."+oldValueForThisDimension);
                                                
                                              //   if (! namespace.isNotFound(dictAtOldPosition))
                                              //   {
                                              //     delete dictAtOldPosition[pointID];
                                                  
                                              //     if (Object.keys(dictAtOldPosition).length === 1)
                                              //     {
                                              //       // return that dot to a normal dot
                                              //     }
                                              //     else if (Object.keys(dictAtOldPosition).length > 1)
                                              //     {
                                              //       // change the number on that multi dot
                                              //     }
                                                  
                                              //   }
                                                
                                              //   namespace.setValue(userIDsByDimensionByAxisPosition_dict, dimensionPostfix+"."+dimension_newValue+"."+pointID, true);
                                                
                                              //   namespace.setValue(oldPointDataByUserID_dict, pointID+"."+dimensionPostfix, dimension_newValue);
                                              // }
                                          },
                                          {"overwrite":true}
                          		          );

                          		      
                          		       let userPointData = namespace(nodes, "userNamespace.userPointData");
                                            for (let [pointID, pointDataItem] of Object.entries(userPointData))
                                            {
                                              debugger;
                                              
                                              nodes.updateUIForNewData(pointDataItem, true);
                                            }

                                  }
                                ).toString().slice(6)
                          }
                        ]
                      );
                  }
                  
                  // should we unload the 3d thing? Maybe will check
                  // https://forum.babylonjs.com/t/dispose-doesnt-free-the-memory/10403/6
                  
                }
