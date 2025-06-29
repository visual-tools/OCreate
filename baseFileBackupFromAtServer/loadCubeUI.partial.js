if (uiMajorStateCollectionParameters.command === "loadCubeUI")
            {
              
                debugger;
                
                defaultLoggerFunction
                      (  
                        [ 
                          { "jsonPassThroughData": { questionsOnDimensionsByDimensionNameDict, projectTitle, featuresConfig },
                            "toEval":
                                ( () =>
                                  {
                                    let nodes = namespace.getMustExist(atApplication, "nodes");
                                    
                                    
                                    nodes.projectContainer.html("");
                                    
                                    let animationIndex = 0;
                                    let animationDuration = 300;
                                    
                                    
                                    nodes.appLandingPage.fadeOut(animationIndex * animationDuration);
                                    animationIndex++;
                                    
                                    
                                    let dimensionElementList = [];
                                    
                                    let dimensionSpecificationByNameDict = nodes.dimensionSpecificationByNameDict =
                                        {
                                          "dim_x": 
                                          { "questionFullText"  : "How many different ways are there for you to get involved as a member of the public and can you influence these?",
                                            "questionShortText" : "How many ways to get involved?",
                                            "questionScaleMin"  : "One way to be involved",
                                            "questionScaleMax"  : "Many ways to be involved",
                                            "questionCubeMin"   : "One Way",
                                            "questionCubeMax"   : "Many Ways",
                                          },
                                          "dim_y": 
                                          { "questionFullText"  : "A strong voice participates in discussions and influences decision making. A weak voice participates in discussions but has little chance of influencing decisions.",
                                            "questionShortText" : "Strong or weak voice influencing decisions?",
                                            "questionScaleMin"  : "Weak voice",
                                            "questionScaleMax"  : "Strong voice",
                                            "questionCubeMin"   : "Weak Voice",
                                            "questionCubeMax"   : "Strong Voice",
                                          },
                                          "dim_z": 
                                          { "questionFullText"  : "Who sets the agenda? To what extent are public concerns valued relative to organisational concerns?",
                                            "questionShortText" : "How strongly are organisation's concerns driven by public concerns?",
                                            "questionScaleMin"  : "Organisations concerns",
                                            "questionScaleMax"  : "Public Concerns",
                                            "questionCubeMin"   : "Organisation",
                                            "questionCubeMax"   : "Public",
                                          },
                                          "dim_a": 
                                          { "questionFullText"  : "To what extent has the organisation decided to, and has actually, changed as a result of involvement?",
                                            "questionShortText" : "How much as the organisation changed as a result of involvement?",
                                            "questionScaleMin"  : "Organisation resistant to change",
                                            "questionScaleMax"  : "Organisation has changed",
                                            "questionCubeMin"   : null,
                                            "questionCubeMax"   : null,
                                          }
                                        };
                                    for (let [dimensionName, dimensionSpec] of Object.entries(questionsOnDimensionsByDimensionNameDict))
                                    {
                                      if (dimensionSpec !== undefined)
                                      { dimensionSpecificationByNameDict["dim_"+dimensionName] = dimensionSpec;
                                      }
                                    }
                                    
                                    let keyboardShowing = 
                                        (trueOrFalse) =>
                                        {
                                          nodes.projectContainer.toggleClass("keyboardShowing", trueOrFalse);
                                        }

                                    let questionCounter = 0;
                                    for ( let [dimensionName, dimensionSpec] of Object.entries(dimensionSpecificationByNameDict))
                                    {
                                      questionCounter++;
                                      
                                      dimensionElementList.push
                                      ( [ "section.dimension.flexColumn.width100", 
                                          {"attr":[["aria-label", "Question "+questionCounter]]},
                                          {"attr":[["tabindex", "0"]]},
                                          [ [ ".description", "@"+dimensionSpec.questionFullText,
                                              {"attr":[["tabindex", "0"]]},
                                            ],
                                            [ ".dimensionExtremes.flexRow.flex_spaceBetween",
                                              [ [ ".min", "@"+dimensionSpec.questionScaleMin,
                                                  {"attr":[["tabindex", "0"]]},
                                                  {"attr":[["aria-hidden", "true"]]},
                                                ],
                                                [ ".max", "@"+dimensionSpec.questionScaleMax,
                                                  {"attr":[["tabindex", "0"]]},
                                                  {"attr":[["aria-hidden", "true"]]},
                                                ],
                                              ],
                                            ],
                                            [ "input#"+dimensionName+".slider", 
                                              {"attr":  [["type","range"],["min","1"],["max","100"],["value","50"]] },
                                              {"attr":  [["aria-label", "Choose your rating from  "+dimensionSpec.questionScaleMin+" to "+dimensionSpec.questionScaleMax]]},
                                            ],
                                            [ "label.commentOnQuestionLabel", "@Comment",
                                              {"attr":[["for", dimensionName+"_notes"]]},
                                            ],
                                            [ "textarea#"+dimensionName+"_notes.textInput", 
                                                {"attr":[["aria-label", "Enter notes here"]]},
                                                { "attr":
                                                  [
                                                    ["type","text"
                                                    ],
                                                  ],
                                                  "on":
                                                  [ [ "focus", () => keyboardShowing(true) 
                                                    ],
                                                    [ "blur",  () => keyboardShowing(false)
                                                    ],
                                                  ]
                                                }
                                            ],
                                          ],
                                        ],
                                      );
                                    }
                                    
                                    dimensionElementList.push
                                    ( [ "style",
`@
.commentOnQuestionLabel
{
  margin-top: 4px;
  margin-bottom: -10px;
  margin-left: 16px;

  text-align: left;
  font-weight: 200;
  font-size: 0.94em;
}
`
                                      
                                      ]
                                    )
                                      
                                      
                                    
                                    // we need to calcuclate the width of the text in questionCubeMax and questionCubeMin such
                                    //    that we can render it nicely on the cube page
                                    // 1. what font is being used in the cube?
                                    
                                    debugger;
                                    
                                    
                                    $("body").on
                                        ( "focusin", 
                                          () => 
                                          { 
                                            ls("flashFocus");
                                            $("body").toggleClass("flashFocus", true); 
                                            setTimeout
                                                ( () => 
                                                  { $("body").toggleClass("flashFocus", false);
                                                  },
                                                  1200
                                                );
                                          } 
                                        );
                                    
                                    setTimeout
                                    ( () =>
                                      {
                                        O.create
                                        ( [ nodes.projectContainer, 
                                            [ 
                                              [
                                                ".notesOverlay_modal.positionAbsolute.width100.height100.displayNone"
                                              ],
                                              [ ".doubleBuffer.positionAbsolute", 
                                                  {"css":[["top",-10000],["left",-10000]]} 
                                              ],
                                              [
                                                "main.cubePageContent.flexColumn.flex_grow1.flexScrollContainer.overscrollBehavior_none",
                                                {"attr": [["aria-labelledby","projectTitle"]] },
                                                [ 
                                                  [ 
                                                    "style.cubePageStyle", { "attr": [["title", "cubePageStyle"]] },
`@
*:focus, *.focus-visible
{
  outline: rgba(255,255,255,0) 1px solid;
  /*outline: none;*/
  
  transition-property: outline-color;
  transition-duration: 1200ms;
  
}
body.flashFocus *:focus, body.flashFocus *.focus-visible
{
  outline: rgba(255,255,255,1) 1px solid;
  
  transition-duration: 0ms;
  /*outline: none;*/
}

.projectTitle
{
    font-size: 1.6em;
    width: 100%;
    margin-left: 12px;
    color: white;
    font-weight: 500;
}

.sliderContainer
{
    /*position: absolute;*/
    pointer-events: all;
    left:20px;
    top:20px;
    width: 500px;
    min-width: 500px;
    color: white;
    text-align: center;
    background: rgba(50,50,50,0.8);
    padding: 16px;
    border-radius: 16px 0px 0px 16px;
    border: 1px solid #555555;
    
    transition-property: opacity;
    transition-duration: 600ms;
}
.sliderContainer.fadeOutTransition
{
  opacity: 0;
}

:not(.portraitMode) .hideSliderPane .sliderContainer
{
  display: none !important;
}


.cubeDiv
{
  background-color: rgba(51,51,76,1);
}
.fadeModeTransitionDiv
{
  z-index: 200;
  
  top: 0px;
  left: 0px;
  
  background-color: rgba(51,51,76,1);
  
  transition-property: opacity:
  transition-duration: 300ms;
}
.fadeModeTransitionDiv.fadeOutTransition
{
  opacity: 0;
}

.notesOverlayContainer {
    z-index: 501;
    
    right: 0px;
    top: 20px;

    width: 400px;
    max-height: 40vh;

    margin-top: 15px;
    padding: 15px;
    padding-top: 8px;
    padding-bottom: 20px;
    
    border: 1px solid #555555;
    border-radius: 16px 0px 0px 16px;
    border-right: 0px;
    
    background: rgba(50,50,50,0.8);
    color: white;
}
.notesOverlay_modal
{
  z-index: 500;
  
  background-color: rgba(0,0,0,0.3);
  
  opacity: 0;
  
  transition-property: opacity;
  transition-duration: 150ms;
}

.touchEchoCursor
{
  margin-left: -6px;
  margin-top: -6px;
  
  width: 12px;
  height: 12px;
  
  border-radius: 50%;
  
  background-color: rgba(255,255,255,0.5);
}
.touchEchoCursorPing
{
  margin-left: -10px;
  margin-top: -10px;
  
  width: 32px;
  height: 32px;
  
  border-radius: 50%;
  border-color: rgba(255,255,255,0.8);
  border-style: solid;
  border-width: 4px;
  
  transform: scale(0.5);
  transform-origin: center;
}
.touchEchoCursorPing_animate
{
  animation-duration: 0.5s;
  animation-name: touchPing;
}
@keyframes touchPing
{
  from {
    transform: scale(0.5);
    opacity: 1.0;
  }
  
  to {
    transform: scale(1.0);
    opacity: 0;
  }
}

.cubeDivCanvas
{
  touch-action: pinch-zoom;
}

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

button.hideAndShow_sliderContainer_element
{
  z-index: 300;
  
  left: 0px;
  top: 0px;
  
  height: 100px;
  
  margin-left: -1;
  margin-top: 0px;
  margin-right: 20px;
  
  padding: 0px;
  padding-right: 4px;
  
  background-color: rgb(40 42 46);
  border: 1px #555555 solid;
  border-radius: 0px 4px 4px 0px;
  border-left: rgb(40 42 46) 1px solid;
}

.chooseCubeDisplayMode_container 
{
  z-index: 300;
  
  top: 16px;
  left: 48px;
  
  font-size: 1.6em;
  
  color: lightgrey;
}
.cubeDisplayModeButton
{
  margin-right: 4px;
  padding: 8px;
  
  border: transparent solid 1px;
  border-radius: 4px;
  
  font-size: 1.4em;
  color: lightgrey;
}
.cubeDisplayModeButton:hover
{
  background-color: rgba(255,255,255,0.2);
  
  border: lightgrey solid 1px;
}
.cubeDisplayModeButton.toggleActive
{

  background-color: rgba(255,255,255,0.3);
  
}


.portraitMode .cubeDiv
{
  order: -1;
  min-height: 40vh;
}

.portraitMode .sliderAndNotesContainer
{
  overflow-x: hidden;
}
.portraitMode .sliderAndNotesContainer > *
{
  transition-property: margin-left;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.0, 0.0, 0.38, 0.58, 0.78, 0.88, 0.93, 0.97, 1.0);
}

.portraitMode .sliderContainer {
  min-width: 95%;
  width: 95%;
  margin-right: 5%;
  
  border-radius: 0px 16px 16px 0px;
  border-left: 0px;
}
.portraitMode.showNotes .sliderContainer {
  /*display: none;*/
  margin-left: -100%;
}

/*.portraitMode .sliderContainer .hideAndShow_sliderContainer_element
{
  display: none;
}*/

.portraitMode .notesOverlayContainer {
  align-self: end;
  
  margin-left: 5%;
  min-width: 95%;
  max-height: 100%;
  min-height: 100%;
  
  margin-top: 0px;
  
  flex: 1 1 auto;
}
.portraitMode.showNotes .notesOverlayContainer {
  // margin-top: 0px;
  
  // flex: 1 1 auto;
  
  
  // margin-left: -100%;
}

.portraitMode .credits {
  width: 100%;
}
.portraitMode.keyboardShowing .credits {
  display: none;
}

@media screen and (max-width: 1100px) {

  
  .sliderContainer {
    width: 400px;
    min-width: 400px;
  }
}

/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #0075ff rgba(0,0,0,0.0);
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
    border-radius: 6px;
    background: rgba(0,0,0,0.0);
    margin-top: 20px;
    margin-bottom: 20px;
}

*::-webkit-scrollbar-thumb {
    background-color: #0075ff;
    border-radius: 20px;
    border: 3px solid #282a2e;
}
.saveNotifier_container
{
  width: 100%;
}
.saveNotifier_element
{
  /*border: 1px lightgrey solid;*/

  border-top: none;
  border-radius: 0px 0px 4px 4px;
  
  background-color: rgba(255,255,255,0.3);
  
  padding: 8px 12px;
  
  color: lightgrey;
  
  transition-property: opacity;
  transition-duration: 300ms;
}
.saveNotifier_element.fadeOutTransition
{
  opacity: 0;
}
.saveNotifier_icon
{
  margin-right: 8px;
  
  font-size: 1.4em;
}
.saveNotifierTitle
{
  min-width: 60px;
}

.notesHTMLArrayContainer .dimNotes.preWrap
{
  white-space: pre-wrap;
}
}
`
                                                  ],
                                                  [ ".headerRow.positionRelative.flexRow.theme_darkBlue", 
                                                    [ [ "h1#projectTitle.projectTitle", "@"+projectTitle,
                                                        {"attr":[["tabindex", "0"]]},
                                                      ],
                                                      [ ".saveNotifier_container.positionAbsolute.flexRow.flex_grow1.flexJustifyContentCenter.displayNone",
                                                        ".saveNotifier_element.flexRow.flexCenterAll.fadeOutTransition",
                                                        [
                                                          [ "iconify-icon.saveNotifier_icon.pointerEvents_none", 
                                                              {"attr": [["icon", "fluent:save-16-filled"]] },
                                                              {"attr": [["aria-hidden", true ]] },
                                                          ],
                                                          [ ".saveNotifierTitle", "@Saving..."
                                                          ]
                                                        ],
                                                      ],
                                                    ],
                                                  ],
                                                  [ ".cubeContent.flexRow.flex_grow1.positionRelative.flexScrollContainer",
                                                    [ 
                                                      [ ".sliderAndNotesContainer.flexRow.flexScrollContainer",
                                                        [ 
                                                          [ ".sliderContainer.flexColumnReverse.overflowY_scroll.overscrollBehavior_none",
                                                            [ 
                                                              [ "section.chooseMycolorProfileContainer.flexColumn",
                                                                {"attr":[["aria-label", "application controls"]]},
                                                                [ [ ".colorProfileSelectDiv.flexRow.alignItems_center.justifyContent_flexEnd",
                                                                    [ [ "label.colorProfileSelectLabel", "@Colour Profile", { "attr": [["for", "colorProfileSelect"]] }, 
                                                                      ],
                                                                      [ "select#colorProfileSelect" 
                                                                      ],
                                                                    ],
                                                                  ],
                                                                ],
                                                                [ [ ".showOtherUsersCheckBoxDiv.flexRow.alignItems_center.justifyContent_flexEnd",
                                                                    [ [ "label.showOtherUsersCheckBoxLabel", "@Show Other Users", { "attr": [["for", "showOtherUsersCheckBox"]] }, 
                                                                      ],
                                                                      [ "input#showOtherUsersCheckBox" , {"attr": [["type", "checkbox"]] }
                                                                      ],
                                                                    ],
                                                                  ],
                                                                ],
                                                              ],
                                                              [ "section.sliderContainerListContainer.flexColumn",
                                                                {"attr":[["aria-label", "questions with sliders and notes"]]},
                                                                dimensionElementList,
                                                              ],
                                                              
                                                            ],
                                                          ],
                                                          [ ".notesOverlayContainer.positionAbsolute.overflowY_scroll.overscrollBehavior_none.displayNone", 
                                                            ".notesOverlayDiv.flexColumn",
                                                                {"attr":[["role", "alertdialog"]]},
                                                          ],
                                                        ],
                                                      ],
                                                      
                                                      [ "section.cubeDiv.flex_grow1.positionRelative.flexScrollContainer", 
                                                        {"attr":[["aria-label", "3D rendered cube showing points from participants, keyboard controllable"]]},
                                                        [ 
                                                          // [ "button.hideAndShow_sliderContainer_element.cubeDisplayModeButton.positionAbsolute",
                                                          //     {"attr":[["tabindex", "0"]]},
                                                          //     {"attr": [["aria-label", "Hide questions panel" ]] },
                                                          //   "iconify-icon.hideAndShow_sliderContainer_icon.pointerEvents_none", 
                                                          //     {"attr":[["icon","bxs:left-arrow"]] },
                                                          //     {"attr":[["aria-hidden", true]] },
                                                          // ],
                                                          
                                                          [ ".cubeDisplayMode_container.width100.height100.flexScrollContainer",
                                                            [ 
                                                              [ "canvas.cubeDivCanvas.width100.height100",
                                                              ],
                                                              [ ".touchEchoCursor.positionAbsolute.displayNone", ".touchEchoCursorPing.positionAbsolute"
                                                              ],
                                                              [ ".questionnaireDiv.height100.overflowY_scroll.overscrollBehaviour_none.displayNone"
                                                              ],
                                                            ]
                                                          ],
    
                                                          [ ".chooseCubeDisplayMode_container.positionAbsolute.flexRow.flex_spaceBetween.displayNone",
                                                            [ 
                                                              [ "button.cubeStyle_3D.cubeDisplayModeButton.toggleActive",
                                                                {"attr":[["tabindex", "0"]]},
                                                                {"attr": [["aria-label", "Toggle cube style to: 3D" ], ["aria-current", true]] },
                                                                {"prop": [["targetDisplayMode", "default"]] },
                                                                "iconify-icon.pointerEvents_none", 
                                                                  {"attr": [["icon", "ion:cube"]] },
                                                                  {"attr": [["aria-hidden", true ]] },
                                                              ],
                                                              [ "button.cubeStyle_questionnaire.cubeDisplayModeButton",
                                                                {"attr":[["tabindex", "0"]]},
                                                                {"attr": [["aria-label", "Toggle cube style to: questionnaire" ]] },
                                                                {"prop": [["targetDisplayMode", "questionnaire"]] },
                                                                "iconify-icon.pointerEvents_none", 
                                                                  {"attr": [["icon", "fluent-mdl2:questionnaire"]] },
                                                                  {"attr": [["aria-hidden", true ]] },
                                                              ]
                                                            ]
                                                          ],
                                                          [ ".fadeModeTransitionDiv.positionAbsolute.height100.width100.fadeOutTransition.displayNone"
                                                          ],
                                                          
                                                          [ "button.hideAndShow_sliderContainer_element.cubeDisplayModeButton.positionAbsolute.displayNone",
                                                              {"attr":[["tabindex", "0"]]},
                                                              {"attr": [["aria-label", "Hide questions panel" ]] },
                                                            "iconify-icon.hideAndShow_sliderContainer_icon.pointerEvents_none", 
                                                              {"attr":[["icon","bxs:left-arrow"]] },
                                                              {"attr":[["aria-hidden", true]] },
                                                          ],
                                                        ],
                                                      ],
                                                      // [ ".notesOverlayContainer.positionAbsolute.overflowY_scroll.displayNone", ".notesOverlayDiv.flexColumn"
                                                      // ]      
                                                    ],
                                                  ],
                                                ],
                                              ]
                                            ]
                                            
                                          ],
                                          nodes,
                                          null
                                        );
                                        
                                        setImmediate
                                            ( () => 
                                              { 
                                                $(window).trigger("resize");
                                                nodes.sliderContainer.scrollTop(-10000);
                                              }
                                            );
                                            
                                            
                                        // process featuresConfig
                                        let chooseCubeDisplayMode_domainMatch_list = namespace.leafNode(featuresConfig, "chooseCubeDisplayMode_domainMatch_list", []);
                                        for (let domainToMatch of chooseCubeDisplayMode_domainMatch_list)
                                        {
                                          if (window.location.host.startsWith(domainToMatch))
                                          {
                                            nodes.testingFeatures = true;
                                            
                                            nodes.chooseCubeDisplayMode_container.toggleClass("displayNone", false);
                                            nodes.saveNotifier_container.toggleClass("displayNone", false);
                                            nodes.hideAndShow_sliderContainer_element.toggleClass("displayNone", false);
                                            
                                            nodes.notesOverlayDiv.on
                              	            ( "click", ".dimNotes",
                              	              (event) =>
                              	              {
                              	                $(".notesOverlayDiv .dimNotes").toggleClass("preWrap");
                              	              }
                              	            )
                                            
// ***************************************************** BREAK
                                            break;
                                          }
                                          else
                                          {
                                            
                                          }
                                        }
                                        
                                        // let checkCanvasTabIndex = 
                                        //     function ()
                                        //     {
                                        //       if (nodes.cubeDivCanvas.attr("tabindex") !== "1")
                                        //       { setTimeout(checkCanvasTabIndex, 100);
                                        //       }
                                        //       else
                                        //       { nodes.cubeDivCanvas.attr("tabindex", "0");
                                        //       }
                                        //     };
                                        // checkCanvasTabIndex();
                                        
                                        
                                        let portraitModeOrLandscapeMode = 
                                            (shouldBeInPortraitMode) =>
                                            {
                                              debugger;
                                              
                                              nodes.projectContainer.toggleClass("portraitMode", shouldBeInPortraitMode);
                                              
                                              nodes.cubeContent.toggleClass("flexRow"   , !shouldBeInPortraitMode);
                                              nodes.cubeContent.toggleClass("flexColumn", shouldBeInPortraitMode);
                                              
                                              nodes.notesOverlayContainer.toggleClass("positionAbsolute", !shouldBeInPortraitMode);
                                              
                                            }
                                            
                                            
                                        nodes.saveNotifierManager = {};
                                        nodes.saveNotifierManager.change = 
                                            () =>
                                            {
                                              nodes.saveNotifier_element.toggleClass("fadeOutTransition", false);
                                              nodes.saveNotifierTitle.text("Saving...");
                                              clearTimeout(nodes.saveNotifierManager.timeoutID);
                                              
                                              nodes.saveNotifierManager.timeoutID = setTimeout
                                                  ( () =>
                                                    {
                                                      nodes.saveNotifierTitle.text("Saved");
                                                      nodes.saveNotifierManager.timeoutID = setTimeout
                                                          ( () =>
                                                            {
                                                              nodes.saveNotifier_element.toggleClass("fadeOutTransition", true);
                                                            },
                                                            1200
                                                          );
                                                    },
                                                    600
                                                  );
                                            }
                                        
                                        $(window).on
                                            ( "resize",
                                              (event) =>
                                              {
                                                let width   = $(window).width();
                                                let height  = $(window).height();
                                                console.log("@: resize: ", {width, height});
                                                // by default we display for landscape
                                                let shouldBeInPortraitMode  = height > width || width < 800;
                                                let currentlyInPortraitMode = nodes.projectContainer.hasClass("portraitMode");
                                                
                                                if (shouldBeInPortraitMode !== currentlyInPortraitMode)
                                                {
                                                  portraitModeOrLandscapeMode(shouldBeInPortraitMode);
                                                }
                                              }
                                            );
                                            
                                            
                                        function onLongPress(node) {
                                          node.on("touchstart touchend touchcancel touchmove", nullEvent);
                                          // node.ontouchend = nullEvent;
                                          // node.ontouchcancel = nullEvent;
                                          // node.ontouchmove = nullEvent;
                                        }
                                        
                                        function nullEvent(event) {
                                          var e = event || window.event;
                                          e.preventDefault && e.preventDefault();
                                          e.stopPropagation && e.stopPropagation();
                                          e.cancelBubble = true;
                                          e.returnValue = false;
                                          return false;
                                        }
                                        onLongPress(nodes.cubeDivCanvas);
                                        // nodes.textSizer.measuredHeight = nodes.textSizer.height();
                                        
                                        nodes.hideAndShow_sliderContainer_element.on
                                            ( "click",
                                              () =>
                                              {
                                                if (! nodes.projectContainer.hasClass("hideSliderPane"))
                                                {
                                                  nodes.sliderContainer.toggleClass("fadeOutTransition", true);
                                                  setTimeout
                                                      ( () =>
                                                        { 
                                                          nodes.hideAndShow_sliderContainer_icon.attr("icon","bxs:right-arrow");
                                                          nodes.projectContainer.toggleClass("hideSliderPane", true);
                                                        },
                                                        550
                                                      );
                                                }
                                                else
                                                {
                                                  nodes.hideAndShow_sliderContainer_icon.attr("icon","bxs:left-arrow");
                                                  nodes.projectContainer.toggleClass("hideSliderPane", false);
                                                  setTimeout
                                                      ( () =>
                                                        { nodes.sliderContainer.toggleClass("fadeOutTransition", false);
                                                        },
                                                        20
                                                      );
                                                      
                                                }
                                              }
                                            )
                                        
                                        nodes.chooseCubeDisplayMode_container.on
                                            ( "click", "button",
                                              (event) =>
                                              {
                                                debugger;
                                                
                                                let $eventTarget = $(event.target);
                                                
                                                if ($eventTarget.hasClass("toggleActive"))
                                                { 
                                                  // do nothing
                                                }
                                                else
                                                { 
                                                  nodes.chooseCubeDisplayMode_container.find(".toggleActive").toggleClass("toggleActive", false).attr("aria-current", null);
                                                  
                                                  $eventTarget.toggleClass("toggleActive", true);
                                                  $eventTarget.attr("aria-current", true);
                                                  
                                                  
                                                  nodes.howDidILikeThat.showNotes_callWithAllPointData(false);
                                                  
                                                  
                                                  nodes.sendEventToServer
                                                  ( { "eventID": "uiMajorStateCollection",
                                                      "uiMajorStateCollectionParameters":
                                                      {
                                                        "targetNodeName": "switchCubeDisplayMode",
                                                        "command": "switchCubeDisplayMode",
                                                        "switchToThisMode": $eventTarget.prop("targetDisplayMode")
                                                      }
                                                    }
                                                  );
                                                }
                                              }
                                            );
                                            
                                            
                                        // QUESTIONNAIRE DIV STATE MANAGEMENT STUFF
                                        // eval(namespace.getMustExist(context, howDidILikeThatNamespace+".displayMode.questionnaire.stateManagement.codeBlock"));
                                        // state management for questionnaireLayout
                                        nodes.sliderContainer.on
                                            ( "touchstart mousedown touchend touchcancel mouseup", ".slider",
                                              (inputEvent) =>
                                              {
                                      		      nodes.projectContainer.toggleClass("thisUser_currentlySlidingSlider", ["touchstart", "mousedown"].includes(inputEvent.type));
                                              }
                                            );
                              
                                        
                                        
                                        // let sliderContainerElement = nodes.sliderContainer.get(0);
                                        // nodes.sliderContainer.toggleClass("overflowY_scroll", sliderContainerElement.scrollHeight > sliderContainerElement.clientHeight)
                                        
                                        let interpolateColor = 
                                            (colorProfileName, percentageBetween) =>
                                            {
                                              debugger;
                                              
                                              let colorProfileSpec = colorProfileByNameDict[colorProfileName]["4thDimensionRange"];
                                              let newColor = [];
                                              
                                              
                                              let initialColor;
                                              let finalColor;
                                              let keyFrameStart;
                                              let keyFrameEnd;
                                              let colorRangeIndex = 0;
                                              for (let i=0,max=colorProfileSpec.length; i<max; i++)
                                              {
                                                if (percentageBetween <= colorProfileSpec[i][0])
                                                {
                                                  
                                                  if (i === 0)
                                                  {
                                                    keyFrameStart   = colorProfileSpec[i][0];
                                                    initialColor    = colorProfileSpec[i][1];
                                                  }
                                                  else
                                                  {
                                                    keyFrameStart = colorProfileSpec[i-1][0];
                                                    initialColor  = colorProfileSpec[i-1][1];
                                                  }
                                                  
                                                  keyFrameEnd   = colorProfileSpec[i][0];
                                                  finalColor    = colorProfileSpec[i][1];
// ***************************************************** BREAK
                                                  break;
                                                }
                                              }
                                              
                                              let percentageBetweenKeyFramePair  = 
                                                    ((percentageBetween - keyFrameStart) / (keyFrameEnd - keyFrameStart)) + keyFrameStart;
                                              
                                              let stepSize = (keyFrameEnd - keyFrameStart) / 100;
                                              let stepCount = (percentageBetween - keyFrameStart) / stepSize;
                                              
                                              for (let i=0,max=initialColor.length; i<max; i++)
                                              {
                                                  let colorStepSize = (finalColor[i] - initialColor[i]) / 100;
                                                  newColor[i]   = (initialColor[i] + (stepCount * colorStepSize));
                                                  // newColor[i] = (((finalColor[i] - initialColor[i]) /100) * percentageBetweenKeyFramePair) + initialColor[i];
                                              }
                                              return newColor;
                                            }
                                        
                                        let colorProfileByNameDict =
                                            {
                                              "Default": 
                                                  { "4thDimensionRange": [ [0.0, [0.8,0,0.1]], [0.2, [1,0,0]], [50, [1,1,0]], [75, [0.2,1,0.2]], [100,[0,0.8,0]] ],
                                                  },
                                              "greenAndWhite": 
                                                  { "4thDimensionRange": [ [0, [0,1,0]], [100, [1,1,1]] ],
                                                  }
                                            }
                                        
                                        for (let [colorProfileName, colorProfileSpec] of Object.entries(colorProfileByNameDict))
                                        {
                                          debugger;
                                          nodes.colorProfileSelect.append(`<option value="${colorProfileName}">${colorProfileName}</option>`)
                                          // O.create
                                          // ( [ "option.colorProfileSelect_"+colorProfileName, "@"+colorProfileName 
                                          //   ],
                                          //   namespace(nodes, "colorProfileSelectElements"),
                                          //   nodes.colorProfileSelect,
                                          // )
                                        }
                                        nodes.currentColorProfileName = "Default";
                                        
                                        
                                        let ensureNotesTextAreaHeight = 
                                            (targetNode) =>
                                            {
                                              if (nodes.testingFeatures === true)
                                              {
                                                let targetNodeHeight = Math.round(targetNode.height()+4);
                                        				let newHeight = targetNode.prop("scrollHeight");
                                        				if (newHeight > targetNodeHeight) targetNode.height(newHeight);
                                        				
                                        				console.log("@: notes textarea height: ", {targetNodeHeight, newHeight});
                                              }
                                            }



                                        let canvas = nodes.cubeDivCanvas.get(0);

                                        let engine = null;
                                        let scene = null;
                                        let sceneToRender = null;
                                        let createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }, true); };
                                        
                                        setTimeout(() => nodes.cubeDivCanvas.css("touch-action","pinch-zoom"), 400);
                                        let createScene = 
                                            () =>
                                            {
                                              
                                              let nodes = namespace.getMustExist(atApplication, "nodes");
                                              
                                              // engine.setHardwareScalingLevel(1 / window.devicePixelRatio); 
                                              // let performanceMonitor = new  BABYLON.PerformanceMonitor(100);
                                              // performanceMonitor.enable();
                                          
                                              // This creates a basic Babylon Scene object (non-mesh)
                                              const PI = Math.PI;
                                              const sizeMult = 10;
                                          
                                              const color_lightBlue = new BABYLON.Color3(0.8,0.8,1.0);
                                              const color_black     = new BABYLON.Color3.Black;
                                          
                                              var scene = new BABYLON.Scene(engine);
                                          
                                              // This creates and positiofns a free camera (non-mesh)
                                              // var camera = new BABYLON.ArcRotateCamera("mainCamera", PI/8+PI+ PI/2 + PI/2, Math.PI / 2, 23*sizeMult, new BABYLON.Vector3(5*sizeMult,5*sizeMult,5*sizeMult), scene, true);
                                              var camera = new BABYLON.ArcRotateCamera("mainCamera", PI/4-PI/8, PI/2-PI/8, 28*sizeMult, new BABYLON.Vector3(5*sizeMult,5*sizeMult,5*sizeMult), scene, true)
                                          
                                              // This targets the camera to scene origin
                                              // camera.setTarget(BABYLON.Vector3.Zero());
                                              // camera.angularSensibilityX = 1;
                                              // camera.angularSensibilityY = 1;
                                              
                                              let cameraRotateLimit = PI/8;
                                          
                                              // camera.lowerAlphaLimit  = PI+PI/2+PI/2;//-cameraRotateLimit + PI/8 + PI + PI/2;
                                              camera.lowerAlphaLimit  = 0;//-cameraRotateLimit + PI/8 + PI + PI/2;
                                              // camera.upperAlphaLimit  = cameraRotateLimit +PI/2 - (cameraRotateLimit*2) + PI + PI/2 + PI/8 + PI/2;
                                              camera.upperAlphaLimit  = PI/2;
                                          
                                              camera.lowerBetaLimit   = 0;//-cameraRotateLimit    + (PI / 2) - PI/2;
                                              camera.upperBetaLimit   = (PI / 2);
                                          
                                              camera.lowerRadiusLimit = 15*sizeMult;
                                              camera.upperRadiusLimit = 30*sizeMult;
                                          
                                              camera.panningSensibility = 0;
                                              camera.moveSensibility = 500000;
                                              camera.angularSensibility = 500000;
                                          
                                              // This attaches the camera to the canvas
                                              camera.attachControl(canvas, true);
                                              
                                              // camera.upVector = new BABYLON.Vector3(0,-1,0);
                                          
                                          
                                          
                                              // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
                                              var ambientLight = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
                                              ambientLight.intensity = 0.8;
                                              ambientLight.groundColor = new BABYLON.Color3(1,1,1);
                                              var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
                                              light.position = new BABYLON.Vector3(20*sizeMult, 20*sizeMult, 20*sizeMult);
                                            	light.diffuse = new BABYLON.Color3(1, 1, 1);
                                            	light.specular = new BABYLON.Color3(0, 0, 0);
                                          
                                              // var angleLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, -1), scene);
                                              // angleLight.position = new BABYLON.Vector3(0, 10, 10);
                                          	// angleLight.diffuse = new BABYLON.Color3(1, 1, 1);
                                          	// angleLight.specular = new BABYLON.Color3(0, 0, 0);
                                          
                                              // Default intensity is 1. Let's dim the light a small amount
                                              light.intensity = 0.7;
                                          
                                              
                                          
                                              let shadowOnlyMaterial = new BABYLON.ShadowOnlyMaterial("shadowOnlyMaterial", scene);
                                          
                                              var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
                                              groundMaterial.diffuseColor  = new BABYLON.Color3.Gray;
                                              groundMaterial.ambientColor  = new BABYLON.Color3.Gray;
                                              groundMaterial.specularColor = new BABYLON.Color3.Black;
                                          
                                              // var groundMaterial = new BABYLON.CustomMaterial("ground", scene);
                                              // groundMaterial.Fragment_Custom_Diffuse('\
                                              // float g1 = min(1.,max(0., max(sin(vPositionW.x),sin(vPositionW.z))));\
                                              // float g2 = min(1.,max(0., max(sin(vPositionW.x*10.),sin(vPositionW.z*10.))));\
                                              // \
                                              // g1 = pow(g1,60.);\
                                              // g2= pow(g2,30.);\
                                              // g1=  0.5*min(0.9,max(0.,max(g1,g2)));\
                                              // \
                                              // result = vec3(1.,0.,0.) -vec3(g1);');
                                          	// groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                                          	// ground.position.y = -2.05;
                                          
                                          
                                              var planeGridMaterial = new BABYLON.GridMaterial("gridMaterial", scene);
                                              planeGridMaterial.mainColor = color_lightBlue;
                                              planeGridMaterial.opacity = 0.4;
                                              var planeGridMaterial2 = new BABYLON.GridMaterial("gridMaterial", scene);
                                              planeGridMaterial2.mainColor = color_lightBlue;
                                              planeGridMaterial2.specularColor = new BABYLON.Color3.White;
                                              planeGridMaterial2.opacity = 0.6;
                                          
                                              var cubeIternalMaterial = new BABYLON.StandardMaterial("cubeInternalMaterial", scene);
                                              cubeIternalMaterial.diffuseColor    = color_lightBlue;
                                              cubeIternalMaterial.ambientColor    = color_lightBlue;
                                              cubeIternalMaterial.specularColor   = color_black;
                                              cubeIternalMaterial.alpha           = 0.06;
                                              // cubeIternalMaterial.backFaceCulling = false;
                                          
                                              let planesByNameDict = 
                                                  { "ground":    { "sourcePlaneNormals": [1,0,0,0], "position": { "x":-2  , "y":5, "z":5 }, "internalPlaneDimension": "x"},
                                                    "sidePlane": { "sourcePlaneNormals": [0,1,0,0], "position": { "x":5 , "y":-2 , "z":5 }, "internalPlaneDimension": "y"},
                                                    "backPlane": { "sourcePlaneNormals": [0,0,1,0], "position": { "x":5  , "y":5 , "z":-2}, "internalPlaneDimension": "z"},
                                                  }    
                                          
                                              for ( let [planeName, planeSpec] of Object.entries(planesByNameDict))
                                              {
                                                  planeSpec.sourcePlane = new BABYLON.Plane(...planeSpec.sourcePlaneNormals);
                                                  planeSpec.sourcePlane.normalize();
                                                  // planeSpec.plane = 
                                                  //     BABYLON.MeshBuilder.CreatePlane
                                                  //     (   planeName, 
                                                  //         {   "height":10, "width":10, 
                                                  //             "sourcePlane": planeSpec.sourcePlane, 
                                                  //             "sideOrientation": BABYLON.Mesh.DOUBLESIDE
                                                  //         }, 
                                                  //         scene
                                                  //     );
                                                  planeSpec.gridPlane = 
                                                      BABYLON.MeshBuilder.CreatePlane
                                                      (   planeName, 
                                                          {   "height":12*sizeMult, "width":12*sizeMult, 
                                                              "sourcePlane": planeSpec.sourcePlane, 
                                                              "sideOrientation": BABYLON.Mesh.DOUBLESIDE
                                                          }, 
                                                          scene
                                                      );
                                                  planeSpec.gridPlane2 = 
                                                      BABYLON.MeshBuilder.CreatePlane
                                                      (   planeName, 
                                                          {   "height":10*sizeMult, "width":10*sizeMult, 
                                                              "sourcePlane": planeSpec.sourcePlane, 
                                                              "sideOrientation": BABYLON.Mesh.DOUBLESIDE
                                                          }, 
                                                          scene
                                                      );
                                          
                                                  for (let [xyz, value] of Object.entries(planeSpec.position))
                                                  {   
                                                      // planeSpec.plane.position[xyz] = ((value/100.)*99.)*sizeMult;
                                                      planeSpec.gridPlane.position[xyz] = value *sizeMult;
                                                      planeSpec.gridPlane2.position[xyz] = value *sizeMult;
                                                  }
                                                  // planeSpec.plane.material = shadowOnlyMaterial;
                                                  planeSpec.gridPlane.material = planeGridMaterial;
                                                  planeSpec.gridPlane2.material = planeGridMaterial2;
                                          
                                                  // pointShadowGenerator.getShadowMap().renderList.push(planeSpec.plane);
                                                  // planeSpec.plane.receiveShadows = true;
                                          
                                                  // planeSpec.cubeInternalPlaneList = [];
                                                  // for ( let counterZ=0; counterZ<11; counterZ+=1)
                                                  // {
                                                  //     let internalPlane = 
                                                  //         BABYLON.MeshBuilder.CreatePlane
                                                  //         (
                                                  //             planeName+".internalPlane."+counterZ,
                                                  //             {
                                                  //                 "height": 10 *sizeMult, "width": 10 *sizeMult,
                                                  //                 "sourcePlane": planeSpec.sourcePlane,
                                                  //                 "sideOrientation": BABYLON.Mesh.DOUBLESIDE,
                                                  //             }
                                                  //         );
                                                      
                                                  //     for (let [xyz, value] of Object.entries(planeSpec.position))
                                                  //     {   internalPlane.position[xyz] = 5 *sizeMult;
                                                  //     }
                                                  //     internalPlane.position[planeSpec.internalPlaneDimension] = counterZ * sizeMult;
                                                  //     internalPlane.material = cubeIternalMaterial;
                                                  //     planeSpec.cubeInternalPlaneList.push(internalPlane);
                                                  // }
                                              }   
                                          
                                              let cubeCentrePosition = new BABYLON.Vector3(5,5,5).scale(sizeMult);
                                              var box = BABYLON.Mesh.CreateBox("cubeBox", 10*sizeMult, scene);
                                              // box.position.x = 5*sizeMult;
                                              // box.position.y = 5*sizeMult;
                                              // box.position.z = 5*sizeMult;
                                              box.position = cubeCentrePosition;
                                              box.material = cubeIternalMaterial;
                                              box.enableEdgesRendering();    
                                              box.edgesWidth = 10.0 * sizeMult;
                                              box.edgesColor = new BABYLON.Color4(color_lightBlue.r, color_lightBlue.g, color_lightBlue.b, 0.8);
                                              box.isPickable = false;
                                          
                                          
                                              //  let pointShadowGenerator = new BABYLON.ShadowGenerator(1024, light);
                                              // pointShadowGenerator.usePoissonSampling = true;
                                          
                                              let gridOriginVector    = new BABYLON.Vector3(-2,-2,-2);
                                              let scoreMaxVector      = new BABYLON.Vector3(10,10,10);
                                              let gridMaxVector       = new BABYLON.Vector3(10,10,10);
                                              let pivotPointSubVector = new BABYLON.Vector3(6,6,6);
                                              
                                              let sphereDataByIDDict = {};
                                              let sphereMetaState = {};
                                              let spheresList = [];
                                              let axisByIndex = ["x", "y", "z"];
                                          
                                              let createHighlightAxes = 
                                                  (sphereID) =>
                                                  {
                                                      let sphereData = sphereDataByIDDict[sphereID];
                                                      let sphere = sphereData.sphereMesh;
                                          
                                                      for (let axisI=0; axisI<3; axisI++)
                                                      {
                                                          let gridLocationMult = [1,1,1];
                                                          gridLocationMult[axisI] = 0;
                                                          let gridLocationAdd = [0,0,0];
                                                          gridLocationAdd[axisI] = -2;
                                                          // if (axisI === 2) gridLocationAdd[axisI] = 12;
                                                          // let gridIndicatorSphereLocationAdd = [0,0,0];
                                                          // let gridIndicatorSphereSize = .3;
                                                          // gridIndicatorSphereLocationAdd[axisI] = -2-(gridIndicatorSphereSize/2);
                                                          // if (axisI === 2) gridIndicatorSphereLocationAdd[axisI] = 12+(gridIndicatorSphereSize/2);
                                          
                                                          let axisLineMeetsGridPosition = sphere.position.multiplyByFloats(...gridLocationMult).add((new BABYLON.Vector3(...gridLocationAdd)).scale(sizeMult))
                                                          // let gridIndicatorSpherePosition = sphere.position.multiplyByFloats(...gridLocationMult).add((new BABYLON.Vector3(...gridIndicatorSphereLocationAdd)).scale(sizeMult))
                                          
                                                          let axisHighlight = sphereData.axesHighlightList[axisI] = 
                                                              BABYLON.Mesh.CreateTube
                                                              (   sphereData.id+"_axis_"+axisByIndex[axisI],
                                                                  [
                                                                      sphere.position,
                                                                      axisLineMeetsGridPosition
                                                                      // gridOriginVector
                                                                  ],
                                                                  sizeMult/40,
                                                                  8,
                                                                  null,
                                                                  BABYLON.Mesh.NO_CAP,
                                                                  scene,
                                                                  true, //updatable
                                                              )
                                                          axisHighlight.material = sphereData.axesHighlightMaterial;
                                                          sphereData.axesHighlightList.push(axisHighlight);
                                                          
                                                          sphereData.updateHighlighAxesTimeout = null;
                                                          // console.log(axisHighlight.getVerticesData(BABYLON.VertexBuffer.PositionKind));
                                                          // axisHighlight.setPivotPoint(pivotPointSubVector);
                                                          // axisHighlight.scaling.x = 0.5;//(sphere.position.x / sizeMult)
                                                          // axisHighlight.scaling = (scoreMaxVector.divide(sphereData.scoreVector)).multiply(gridMaxVector);
                                          
                                          
                                                          
                                          
                                                          // let gridIndicatorSphere = new BABYLON.Mesh.CreateSphere
                                                          //     (   sphereData.id+"_axis_"+axisByIndex[axisI]+"_gridIndicatorSphere",
                                                          //         4,
                                                          //         gridIndicatorSphereSize*sizeMult,
                                                          //         scene
                                                          //     );
                                                          // gridIndicatorSphere.position = gridIndicatorSpherePosition;
                                                          // gridIndicatorSphere.material = axesHighlightMaterial;
                                                          // axisHighlightgridIndicatorSphere.includedOnlyMeshes()
                                                      }
                                                  }
                                          
                                              let sphereOverlapDictsByPositionDict = {}
                                              
                                              let updateSphereToShowMultipleCounter =
                                                  (sphereData, count) =>
                                                  {
                                                    if (sphereData.sphereNumberTextPlane !== undefined)
                                                    {
                                                      sphereData.sphereNumberTextPlane.dispose()
                                                      delete sphereData.sphereNumberTextPlane;
                                                    }
                                                    
                                                    sphereData.sphereNumberTextPlane = makeTextPlane(""+count, "rgb(50,50,50)", "rgb(50,50,50)", 0.5);
                                                    sphereData.sphereNumberTextPlane.parent = sphereData.sphereMesh;
                                                    // topSphereDataRemainingAtPosition.sphereNumberTextPlane.material.alpha = 1.0;
                                                    sphereData.sphereNumberTextPlane.position = new BABYLON.Vector3(0,0,-0.28*sizeMult);
                                                    sphereData.sphereNumberTextPlane.isPickable = false;
                                                    
                                                    sphereData.sphereMesh.scaling = new BABYLON.Vector3(1.1,1.1,1.1);
                                                  }
                                              let resetSphereFromMultipleCounter =
                                                  (sphereData) =>
                                                  {
                                                    console.log("@: resetSphereFromMultipleCounter: sphereData:", sphereData);
                                                    
                                                    if (sphereData.sphereNumberTextPlane !== undefined)
                                                    { sphereData.sphereNumberTextPlane.dispose();
                                                      delete sphereData.sphereNumberTextPlane;
                                                    }
                                                    sphereData.sphereMesh.scaling = new BABYLON.Vector3(1,1,1);
                                                  }
                                          
                                              let updateSpherePosition = 
                                                      (sphereID, newScoreArray) =>
                                                      {
                                                          debugger;
                                                          
                                                          if (! sphereDataByIDDict.hasOwnProperty(sphereID))
                                                          {
                                                              createNewSphere(sphereID);
                                                          }
                                                          
                                                          let sphereData = sphereDataByIDDict[sphereID];
                                          
                                                          for (let axisHighlightToDispose of sphereData.axesHighlightList)
                                                          {
                                                              axisHighlightToDispose.dispose();
                                                          }
                                                          sphereData.axesHighlightList = [];
                                                          sphereData.scoreVector = new BABYLON.Vector3(...(newScoreArray.reverse()));
                                          
                                                          let sphere = sphereData.sphereMesh;
                                                          sphere.position = sphereData.scoreVector;
                                                          sphere.position.scaleInPlace(sizeMult);
                                                      
                                                          let spherePositionString = sphere.position.x+"_"+sphere.position.y+"_"+sphere.position.z;
                                                          spherePositionString = spherePositionString.replace(".", ",");

                                                          // if (sphereData.oldPositionString === undefined) sphereData.oldPositionString = "";
                                                          // debugger;
                                                          
                                                          if (sphereData.oldPositionString !== spherePositionString)
                                                          {
                                                            if (sphereData.oldPositionString !== undefined)
                                                            { // get spheres at old position
                                                              let sphereDictAtPreviousPosition = sphereOverlapDictsByPositionDict[sphereData.oldPositionString];
                                                              // remove this sphere from old position
                                                              if (sphereDictAtPreviousPosition !== undefined)
                                                              { namespace.rm(sphereOverlapDictsByPositionDict, sphereData.oldPositionString+"."+sphereID);
                                                              
                                                              // check what spheres are remaining at old position
                                                                let sphereEntriesRemainingAtPreviousPosition = Object.entries(sphereDictAtPreviousPosition);
                                                                if (sphereEntriesRemainingAtPreviousPosition.length === 0)
                                                                {
                                                                  // if no spheres, remove the dict
                                                                  delete sphereOverlapDictsByPositionDict[sphereData.oldPositionString];
                                                                }
                                                                else if (sphereEntriesRemainingAtPreviousPosition.length === 1)
                                                                {
                                                                  // if one sphere, make sure its not showing a number
                                                                  let topSphereDataRemainingAtPosition = sphereEntriesRemainingAtPreviousPosition[0][1];
                                                                  
                                                                  resetSphereFromMultipleCounter(topSphereDataRemainingAtPosition);
                                                                }
                                                                else 
                                                                {
                                                                  let firstSphereDataRemaining = true;                                                                
                                                                  // if more than one sphere remaining, make the "top" one show the text
                                                                  for (let [sphereIDRemaining, sphereDataRemaining] of sphereEntriesRemainingAtPreviousPosition)
                                                                  {
                                                                    if (firstSphereDataRemaining === true)
                                                                    { 
                                                                      updateSphereToShowMultipleCounter(sphereDataRemaining, sphereEntriesRemainingAtPreviousPosition.length);
                                                                    }
                                                                    else
                                                                    {
                                                                      resetSphereFromMultipleCounter(sphereDataRemaining);
                                                                    }
                                                                    
                                                                    firstSphereDataRemaining = false;
                                                                  }
                                                                }
                                                                // make the sphere that is moving not show the number text
                                                              }
                                                            }
                                                            resetSphereFromMultipleCounter(sphereData);
                                                              
                                                            
                                                            // get spheres in new position
                                                            let sphereDataAtThisPositionByIDDict = namespace(sphereOverlapDictsByPositionDict, spherePositionString);
                                                            sphereDataAtThisPositionByIDDict[sphereID] = sphereData;
                                                            
                                                            let sphereEntriesAtThisPosition = Object.entries(sphereDataAtThisPositionByIDDict);
                                                            if (sphereEntriesAtThisPosition.length > 1)
                                                            {
                                                              let firstSphereData = true;
                                                              
                                                              for (let [sphereIDAtThisPosition, sphereDataAtThisPosition] of sphereEntriesAtThisPosition)
                                                              { 
                                                                if (firstSphereData === true)
                                                                { 
                                                                  updateSphereToShowMultipleCounter(sphereDataAtThisPosition, sphereEntriesAtThisPosition.length);
                                                                }
                                                                else
                                                                {
                                                                  resetSphereFromMultipleCounter(sphereDataAtThisPosition);
                                                                }
                                                                
                                                                firstSphereData = false;
                                                              }
                                                            }
                                                            
                                                            sphereData.sphereDataAtThisPositionByIDDict = sphereDataAtThisPositionByIDDict;
                                                            
                                                            // sphereData.oldPosition        = sphere.position.clone();
                                                            sphereData.oldPositionString  = spherePositionString;
                                                          }
                                                            

                                                          if (sphereData.updateHighlighAxesTimeout !== null)
                                                          { clearTimeout(sphereData.updateHighlighAxesTimeout);
                                                          }
                                                          sphereData.updateHighlighAxesTimeout = 
                                                              setTimeout( () => { createHighlightAxes(sphereID)}, 300);
                                                      }
                                              let updateSphereColor = 
                                                  (sphereID, newColor) =>
                                                  {
                                                    let sphereData = sphereDataByIDDict[sphereID];
                                                    
                                                    if (newColor !== undefined)
                                                    { sphereData.sphereMaterial.diffuseColor = new BABYLON.Color3(...newColor);
                                                    }
                                                    // debugger;
                                                    
                                                    // if (sphereID !== nodes.userID)
                                                    // {
                                                      
                                                    // }
                                                  }
                                          
                                              let createNewSphere = 
                                                  (sphereID) =>
                                                  {
                                                      // sphereData holds all the data for the internal representation of each spheres
                                                      let sphereData = sphereDataByIDDict[sphereID] = 
                                                          {   "id": sphereID,
                                                              "sphereMesh": null,
                                                              "sphereMaterial": null,
                                                              "axesHighlighMaterial": null,
                                                              "axesHighlightList": [],
                                                              
                                                              "scoreVector": null,
                                                              "updateHighlighAxesTimeout": null,
                                                          }
                                                      
                                                      // sphereMesh and so sphere is the actual rederered spherical 3D mesh, which is generated here by the CreateSphere function :)
                                                      let sphere = sphereData.sphereMesh = BABYLON.MeshBuilder.CreateSphere(sphereID, {diameter: 0.4*sizeMult, segments: 32}, scene);
                                                      sphere.renderOutline = true;
                                                      sphere.outlineWidth = sizeMult/20;
                                                      sphere.outlineColor = new BABYLON.Color3((Math.random()/3) + 0.66, (Math.random()/3) + 0.66, (Math.random()/3) + 0.66);
                                                      sphere.isPickable = true;
                                          
                                                      // sphereMesh and so sphere is the actual rederered spherical 3D mesh, which is generated here by the CreateSphere function :)
                                                      let sphereMaterial = sphereData.sphereMaterial = new BABYLON.StandardMaterial(sphereID+"_sphereMtl", scene);
                                                      sphereMaterial.diffuseColor = new BABYLON.Color3.Random();
                                                      sphereMaterial.ambientColor = new BABYLON.Color3.White;
                                                      sphere.material = sphereMaterial;
                                                      
                                                      
                                                      let sphereHitbox = sphereData.sphereHitbox = BABYLON.MeshBuilder.CreateSphere(sphereID+"Hitbox", {diameter: 1*sizeMult, segments: 32}, scene);
                                                      // sphereHitbox.parent = sphere;
                                                      sphereHitbox.isPickable = true;
                                                      
                                                      let sphereHitboxMaterial = sphereData.sphereHitboxMaterial = new BABYLON.StandardMaterial(sphereID+"Hitbox_sphereMtl", scene);
                                                      sphereHitboxMaterial.diffuseColor = new BABYLON.Color3.White;
                                                      sphereHitboxMaterial.alpha= 0.0;
                                                      sphereHitbox.material = sphereHitboxMaterial;
                                                      sphere.addChild(sphereHitbox);
                                                      

                                                      let axesHighlightMaterial = new BABYLON.StandardMaterial(sphereID+"_axesHighlightMaterial",scene);
                                                      axesHighlightMaterial.diffuseColor = planeGridMaterial.lineColor;
                                                      axesHighlightMaterial.specularColor = new BABYLON.Color3.Black;
                                                      axesHighlightMaterial.alpha = 0.0;
                                                      sphereData.axesHighlightMaterial = axesHighlightMaterial;
                                                      
                                                      axesHighlightMaterial.targetAlpha_OnPointerOverTrigger  = 0.8;
                                                      axesHighlightMaterial.targetAlpha_OnPointerOutTrigger   = 0.0;
                                                      
                                                      namespace.setValue
                                                          ( sphereData, 
                                                            "actionDict.OnPointerOverTrigger",
                                                            new BABYLON.InterpolateValueAction
                                                              (
                                                                  BABYLON.ActionManager.OnPointerOverTrigger,
                                                                  axesHighlightMaterial,
                                                                  "alpha",
                                                                  axesHighlightMaterial.targetAlpha_OnPointerOverTrigger,
                                                                  100, null, true
                                                              )
                                                          );
                                                          
                                                      namespace.setValue
                                                          ( sphereData, 
                                                            "actionDict.OnPointerOutTrigger",
                                                            new BABYLON.InterpolateValueAction
                                                              (
                                                                  BABYLON.ActionManager.OnPointerOutTrigger,
                                                                  axesHighlightMaterial,
                                                                  "alpha",
                                                                  axesHighlightMaterial.targetAlpha_OnPointerOutTrigger,
                                                                  100, null, true
                                                              )
                                                          );
                                                      
                                                      sphereHitbox.actionManager = new BABYLON.ActionManager(scene);
                                                      sphereData.toggleActionsRegistered = 
                                                          (trueMeansRegister = true) =>
                                                          {
                                                            if (sphereData.toggleActionsRegistered.currentRegisterState !== trueMeansRegister)
                                                            { 
                                                              let functionName = "registerAction";
                                                              if (trueMeansRegister === false) functionName = "unregisterAction";
                                                              
                                                              for (let action of Object.values(sphereData.actionDict))
                                                              {
                                                                sphereHitbox.actionManager[functionName](action);
                                                              }
                                                              sphereData.toggleActionsRegistered.currentRegisterState = trueMeansRegister;
                                                            }
                                                          }
                                                  }
                                          
                                              let axesByNameDict = 
                                                  {
                                                    
                                                    "dim_z": 
                                                          {   
                                                              "lineSpec"        : 
                                                              { "positionStart": [2,-1,11], "positionEnd": [8,-1,11],
                                                                  "color": [1.0, 0.7, 0.7],
                                                              },
                                                              "axisStartTextSpec":
                                                              {
                                                                  "position": [1,-1,11],
                                                                  "text": "Organisation"
                                                              },
                                                              "axisEndTextSpec":
                                                              {
                                                                  "position": [9,-1,11],
                                                                  "text": "Public"
                                                              }
                                                              
                                                              // "lineDefinition"        : [[1,-1,-1], [9,-1,-1]], 
                                                              // "axesStartDisplayText"  : "One way", 
                                                              // "axesEndDisplayText"    : "Many ways",
                                                          },
                                                          
                                                    "dim_y": 
                                                          {   
                                                              "lineSpec"        : 
                                                              { "positionStart": [11,1.3,-1], "positionEnd": [11,8.6,-1],
                                                                  "color": [1.0, 1.0, 0.7],
                                                              },
                                                              "axisStartTextSpec":
                                                              {
                                                                  "position": [11,1,-1],
                                                                  "text": "Weak voice"
                                                              },
                                                              "axisEndTextSpec":
                                                              {
                                                                  "position": [11,9,-1],
                                                                  "text": "Strong voice"
                                                              }
                                          
                                                              // "lineDefinition"        : [[-1,1,-1], [-1,9,-1]], 
                                                              // "axesStartDisplayText"  : "Weak voice", 
                                                              // "axesEndDisplayText"    : "Strong voice",
                                                          },
                                                    
                                                   
                                                   "dim_x": 
                                                          {   "lineSpec"        : 
                                                              { "positionStart": [11,-1,2], "positionEnd": [11,-1,8],
                                                                  "color": [0.7, 1.0, 0.7],
                                                              },
                                                              "axisStartTextSpec":
                                                              {
                                                                  "position": [11,-1,1],
                                                                  "text": "One Way"
                                                              },
                                                              "axisEndTextSpec":
                                                              {
                                                                  "position": [11,-1,9],
                                                                  "text": "Many Ways"
                                                              }
                                          
                                                          },
                                                  }
                                          
                                                
                                                let fontSize = 16;

                                                let temp = new BABYLON.DynamicTexture("DynamicTexture", 2000, scene);
                                                let tmpctx = temp.getContext();
                                                tmpctx.font         = fontSize+"px Sans";
                                                let textMetrics = tmpctx.measureText("My");
                                                let boundingHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxAscent;
                                                

                                              

                                                let makeTextPlane = function(text, color, outlineColor, textHeightIn3D, storeResultsHere) 
                                                    {
                                                      
                                                      
                                                      // text = text;
                                                      
                                                      let textMetrics     = tmpctx.measureText(text);
                                                      let textureWidth   = textMetrics.width;
                                                      let textureHeight  = boundingHeight;//textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
                                                    
                                                    // debugger;
                                                    
                                                      
                                                    
                                          //             nodes.textSizer.css("font-size", fontSize+"px");
                                          //             // nodes.textSizer.css("font-family", "Courier Prime");
                                          //             // // nodes.textSizer.text("My");
                                          //             // // let textureHeight = nodes.textSizer.height();
                                          //             text = " "+text+" ";
                                          //           nodes.textSizer.text(text);
                                          //             // let textureWidth  = window.getComputedStyle(nodes.textSizer[0]).getPropertyValue("width");//.width();
                                          //             // let textureHeight = window.getComputedStyle(nodes.textSizer[0]).getPropertyValue("height");//
                                          // let textureWidth  = nodes.textSizer.width();//+(10*size);
                                          //             let textureHeight = nodes.textSizer.height();
                                                    
                                                      let ratio         = textureWidth / textureHeight;
                                                      console.log("@: calculating ratio for "+text+": "+ratio+", width: "+textureWidth+", height: "+textureHeight);
                                                      
                                                      textHeightIn3D = textHeightIn3D * sizeMult;
                                                
                                                      let plane = BABYLON.MeshBuilder.CreatePlane("plane", {"height": textHeightIn3D, "width": (ratio * textHeightIn3D)*1.15}, scene);
                                                      
                                                      
                                                      let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane, textureWidth*1.15, textureHeight);
                                                
                                                      let text1 = new BABYLON.GUI.TextBlock();
                                                      text1.text = text;
                                                      // text1.resizeToFit = true;
                                                      // text1.background ="yellow";
                                                      text1.outlineColor = outlineColor;
                                                      text1.outlineWidth = fontSize / 60;
                                                      text1.color = color;
                                                      text1.fontSize = fontSize;
                                                      // text1.fontFamily = "Sans";
                                                      // text1.fontWeight = "bold";
                                                      // text1.width = textureWidth;
                                                      // text1.height = textureHeight;
                                                      // text1.resizeToFit = true;
                                                      advancedTexture.addControl(text1);
                                                      
                                                      if (isObject_notArray(storeResultsHere))
                                                      { storeResultsHere.advancedTexture = advancedTexture;
                                                        storeResultsHere.plane = plane;
                                                      }
                                                
                                                      // advancedTexture.rootContainer.scaleX = window.devicePixelRatio;
                                                      // advancedTexture.rootContainer.scaleY = window.devicePixelRatio;
                                                
                                                      // plane.lookAt(camera.position);
                                                      return plane;
                                                     };
                                          
                                              let preloadTextPlane = makeTextPlane("helloWorld", "white", 0.5, undefined);
                                              preloadTextPlane.dispose();
                                              delete preloadTextPlane;
                                                
                                          
                                              let axisTextPlaneList = [];
                                              for (let [axisName, axisSpec] of Object.entries(axesByNameDict))
                                              {
                                                let axisLine = BABYLON.Mesh.CreateTube
                                                (   axisName, 
                                                    [ 
                                                        new BABYLON.Vector3(...axisSpec.lineSpec.positionStart).scale(sizeMult), 
                                                        new BABYLON.Vector3(...axisSpec.lineSpec.positionEnd).scale(sizeMult, sizeMult, sizeMult),
                                                    ],
                                                    sizeMult/20,8,null,BABYLON.Mesh.NO_CAP,
                                                    scene
                                                );
                                                let axisMaterial    = new BABYLON.StandardMaterial("axisMaterial_"+axisName, scene);
                                                axisMaterial.diffuseColor   = new BABYLON.Color3(...axisSpec.lineSpec.color);
                                                axisMaterial.specularColor  = new BABYLON.Color3.Black;
                                                axisLine.material   = axisMaterial;
                                                // axisLine.color = new BABYLON.Color3(...axisSpec.lineSpec.color);
                                                axisLine.alpha = 0.4;
                                                
                                                
                                                let dimensionSpec   = dimensionSpecificationByNameDict[axisName];
                                                
                                                axisSpec.axisTextMin = {};
                                                
                                                let startChar       = makeTextPlane(dimensionSpec.questionCubeMin, "white", "white", 0.5, axisSpec.axisTextMin);
                                                startChar.position  = new BABYLON.Vector3(...axisSpec.axisStartTextSpec.position).scale(sizeMult);
                                                // startChar.position.x = startChar.position.x + (sizeMult*1.75);
                                                // startChar.position.y = startChar.position.y - (sizeMult);
                                                // startChar.position.z = startChar.position.z + (sizeMult*1.75);
                                                axisTextPlaneList.push(startChar);
                                    
                                                axisSpec.axisTextMax = {};
                                                let endChar         = makeTextPlane(dimensionSpec.questionCubeMax, "white", "white", 0.5, axisSpec.axisTextMax);
                                                endChar.position    = new BABYLON.Vector3(...axisSpec.axisEndTextSpec.position).scale(sizeMult);
                                                // endChar.position.x = endChar.position.x + (sizeMult*1.75);
                                                // endChar.position.y = endChar.position.y - (sizeMult);
                                                // endChar.position.z = endChar.position.z + (sizeMult*1.75);
                                                axisTextPlaneList.push(endChar);
                                              }
                                              
                                              // for (let axisSpec of Object.values(axesByNameDict))
                                              // {
                                              //   axisSpec.axisTextMin.advancedTexture.markAsDirty();
                                              //   axisSpec.axisTextMax.advancedTexture.markAsDirty();
                                              // }
                                          
                                              let minBetaBeforeLocking = PI/2 - PI/4 - PI/8; 
                                              let cameraAlphaMidPoint = ((camera.upperAlphaLimit - camera.lowerAlphaLimit) /2) + camera.lowerAlphaLimit;
                                              let cameraMetaManagement = 
                                              {
                                                  state: "default",
                                          
                                                  targetCameraAlpha: null,
                                                  targetCameraBeta: null,
                                                  alphaRotationAtLock: null,
                                          
                                                  alphaTrackRate: PI/100,
                                          
                                                  originalLowerAlphaLimit: camera.lowerAlphaLimit,
                                                  originalUpperAlphaLimit: camera.upperAlphaLimit,
                                              }
                                              
                                              // this function is called every render tick before rendering
                                              scene.registerBeforeRender
                                                  (   function () 
                                                      {
                                                        // diff is a point very very far behind the camera. Things that "lookAt" the diff point can be read by the user
                                                        let diff = camera.position.subtract(cubeCentrePosition).scale(-100000)
                                                        
                                                        
                                                        // make the text on each axis follow the camera
                                                        for (let axisTextPlane of axisTextPlaneList)
                                                          {
                                                              // let opposite = axisTextPlane.position.add(diff.scale(-1));
                                                              axisTextPlane.lookAt(diff);
                                                              // axisTextPlane.lookAt(camera.position);
                                                          }
                                          
                                                        
                                                        // When there are multiple points in one 3D location, the number on that point must follow the camera
                                                        for (let sphereData of Object.values(sphereDataByIDDict))
                                                          {
// ********************************************************************* CONTINUE
                                                            if (sphereData.sphereNumberTextPlane === undefined) continue;
                                                            if (sphereData.showSphereNumberTextPlane !== true)
                                                            { sphereData.sphereNumberTextPlane.material.alpha = 0;
                                                              continue;
                                                            }
                                                            else
                                                            {
                                                              sphereData.sphereNumberTextPlane.material.alpha = 1.0;
                                                            }
                                                            
                                                            let sphereMesh = sphereData.sphereMesh;
                                                            
                                                            let targetCameraPosition = camera.position.clone();
                                                            let targetSphereMeshPosition = sphereMesh.position.clone();

                                                            // if (camera.beta < minBetaBeforeLocking)
                                                            // {
                                                                // console.log(camera.position, diff);
                                                                if (camera.alpha <= cameraAlphaMidPoint)
                                                                {   
                                                                    targetCameraPosition.x = Math.max(targetCameraPosition.x, targetSphereMeshPosition.x+0.01);
                                                                    // targetCameraPosition.z = -20*sizeMult;
                                                                    // targetSphereMeshPosition.y = 5 * sizeMult;
                                                                    // targetSphereMeshPosition.x = 10 * sizeMult;
                                                                    // targetSphereMeshPosition.z = 0 * sizeMult;

                                                                    // sphereMesh.position = targetSphereMeshPosition;
                                                                }
                                                                else
                                                                {   
                                                                    // if (targetCameraPosition.z )
                                                                    targetCameraPosition.z = Math.max(targetCameraPosition.z, targetSphereMeshPosition.z+0.01);
                                                                    
                                                                }

                                                            // }
                                                                
                                                              let diff = targetCameraPosition.subtract(targetSphereMeshPosition).scale(-10000);//.add(targetSphereMeshPosition);
                                                            // //   if (diff.x > 10) diff.x = 10;
                                                            // //   if (diff.y > 10) diff.y = 10;
                                                            // //   if (diff.z < -10) diff.z = -10;
                                                            
                                                              sphereMesh.lookAt(diff);
                                                          }
                                          
                                                          // To avoid some complex mathematics in camera management, this block of code puts a maximum vertical angle on the free movement of the camera.
                                                          //   When the camera startts to look down at the seen (< minBetaBeforeLocking)
                                                          //   the camera is force into one of two angles looking down
                                                          //   there are three states of the camera
                                                          //     default, locking and locked
                                                          //       in the "locking" state the camera moves a small step alpha or -alpha each render tick
                                                          //         until it reaches one extreme or the other
                                                          //       in the "default" state the camera is free moving
                                                          //       in the "locked" state, only camera beta dimension is free, the alpha dimension is locked
                                                          // console.log(camera.getDirectionToRef(new BABYLON.Vector3(5,5,5)));
                                                          // console.log(camera.alpha, camera.beta, camera.radius);
                                                          if (cameraMetaManagement.state === "default" && camera.beta < minBetaBeforeLocking)
                                                          {
                                                              // camera.beta = 0;
                                                              cameraMetaManagement.state = "locking";
                                          
                                                              let distFromAlphaMin = Math.abs(camera.alpha - camera.lowerAlphaLimit);
                                                              let distFromAlphaMax = Math.abs(camera.alpha - camera.upperAlphaLimit);
                                          
                                                              cameraMetaManagement.targetCameraAlpha = camera.lowerAlphaLimit;
                                                              if (distFromAlphaMax < distFromAlphaMin)
                                                              { cameraMetaManagement.targetCameraAlpha = camera.upperAlphaLimit;
                                                              }
                                                              cameraMetaManagement.alphaTrackRate = 
                                                                  Math.abs(camera.alpha - cameraMetaManagement.targetCameraAlpha) / (engine.getFps() / 4);
                                                              cameraMetaManagement.alphaRotationAtLock = camera.alpha;
                                                              // cameraMetaManagement.totalAlphaChangeToLock = (cameraMetaManagement.targetCameraAlpha - camera.alpha);
                                                              // camera.alpha = cameraMetaManagement.targetCameraAlpha;
                                                              // cameraMetaManagement.state = "locked";
                                                          }
                                                          else if (cameraMetaManagement.state === "locking" && camera.beta < minBetaBeforeLocking)
                                                          {
                                                              let ratioVertical    = ( (minBetaBeforeLocking - camera.beta)  / minBetaBeforeLocking );
                                                              let newCameraAlpha   = cameraMetaManagement.alphaRotationAtLock + (cameraMetaManagement.totalAlphaChangeToLock * ratioVertical);
                                                              
                                                              if (ratioVertical > 1)
                                                              {
                                          
                                                              }
                                                              else
                                                              {
                                                                  let trackMult = 1;
                                                                  if (camera.alpha > cameraMetaManagement.targetCameraAlpha)
                                                                  { trackMult = -1;
                                                                  }
                                                                  let newCameraAlpha = camera.alpha + (cameraMetaManagement.alphaTrackRate * trackMult);
                                                                  if  (    ( trackMult === 1  && newCameraAlpha >= cameraMetaManagement.targetCameraAlpha )
                                                                        || ( trackMult === -1 && newCameraAlpha <= cameraMetaManagement.targetCameraAlpha )   
                                                                      )
                                                                  {
                                                                      newCameraAlpha = cameraMetaManagement.targetCameraAlpha;
                                                                      cameraMetaManagement.state = "locked";
                                                                  }
                                                                  if (    ( trackMult === 1 && camera.alpha < newCameraAlpha )                            
                                                                      ||  ( trackMult === -1 && camera.alpha > newCameraAlpha )
                                                                     )
                                                                  {
                                                                      camera.alpha = newCameraAlpha;
                                                                  }
                                                                  
                                                                  if (trackMult === -1)
                                                                  { camera.upperAlphaLimit = newCameraAlpha;
                                                                  }
                                                                  else
                                                                  {
                                                                      camera.lowerAlphaLimit = newCameraAlpha;
                                                                  }
                                                              }
                                                          }
                                                          
                                                          if (camera.beta > minBetaBeforeLocking)
                                                          {
                                                              cameraMetaManagement.state = "default";
                                                              // camera.upVector = new BABYLON.Vector3(0,1,0);
                                                              camera.lowerAlphaLimit = cameraMetaManagement.originalLowerAlphaLimit;
                                                              camera.upperAlphaLimit = cameraMetaManagement.originalUpperAlphaLimit;
                                          
                                                              // cameraMetaManagement.state = "default";
                                          
                                                          }
                                                      }
                                                  );
                                          
                                              // var cubeOutline = BABYLON.Mesh.CreateLines
                                              //         (   "cubeOutline", 
                                              //             [ 
                                              //                 BABYLON.Vector3.Zero(), 
                                              //                     new BABYLON.Vector3(10 *sizeMult, 0, 0), new BABYLON.Vector3(10 *sizeMult, 10* sizeMult, 0), new BABYLON.Vector3(0, 10 *sizeMult, 0),  
                                              //                 BABYLON.Vector3.(0,0,10*sizeMult),
                                              //                     new BABYLON.Vector3(10 *sizeMult, 0, 10*sizeMult), new BABYLON.Vector3(10 *sizeMult, 10* sizeMult, 0), new BABYLON.Vector3(0, 10 *sizeMult, 0),  
                                                              
                                              //             ], 
                                              //             scene
                                              //         );
                                              //     cubeOutline.color = new BABYLON.Color3(0.9, 0.8, 1.0);
                                          
                                              
                                              // Our built-in 'ground' shape.
                                              // var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 12, height: 12}, scene);
                                              // ground.position.y = -2;
                                              
                                          
                                              
                                              // pointShadowGenerator.getShadowMap().renderList.push(ground);
                                              
                                              // var sourcePlane = new BABYLON.Plane(1, 0, 0, 0);
                                              // sourcePlane.normalize();
                                              // var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:12, width: 12, sourcePlane: sourcePlane, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
                                              // plane.position.x = -7;
                                              // plane.position.y = 5;
                                              // plane.position.z = 0;
                                          
                                              // var sourcePlane2 = new BABYLON.Plane(0, 0, 1, 0);
                                              // sourcePlane.normalize();
                                              // var plane = BABYLON.MeshBuilder.CreatePlane("plane2", {height:12, width: 12, sourcePlane: sourcePlane2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
                                              // plane.position.x = 0;
                                              // plane.position.y = 5;
                                              // plane.position.z = -7;
                                          
                                              // scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
                                              // scene.fogDensity = 0.001;
                                              

    
                                        		
                                        		  let pointDataByUserIDDict = namespace(nodes, "userNamespace.userPointData");
                                        		  let mapSpreadsheetFieldNameDict = 
                                        		      { "point x": "position.x",
                                        		        "point y": "position.y",
                                        		        "point z": "position.z",
                                        		        "point a": "color",
                                        		        "notes x": "notes.x",
                                        		        "notes y": "notes.y",
                                        		        "notes z": "notes.z",
                                        		        "notes a": "notes.a",
                                        		        "userID" : "userID",
                                        		      };
                                        		  
                                        			howDidILikeThatSocket = {};
                                        			howDidILikeThatSocket.onmessage = function (messageData) 
                                        			{
                                          		  // 	let messageData = JSON.parse(incomingMessageJSONString.data);
                                          			console.log
                                          			( { "@: howDidILikeThatSocket.onmessage: messageData": messageData
                                          				}
                                          			);
                                          		// 	debugger;
                                          
                                          			if (messageData.eventID === "newConnection_response")
                                          			{ 
                                          			 // debugger;
                                          			
                                          				let userID  = nodes.userID = messageData.userID;
                                          				let newPointData  = messageData.data;
                                          
                                                  updateUIForNewData(newPointData);
                                          			}
                                          			else if (messageData.eventID === "updateUserData_fromServer")
                                          			{
                                          			 // debugger;
                                          			  
                                          				let userID        = messageData.userID;
                                          				let newPointData  = messageData.data;
                                          				
                                          				updateUIForNewData(newPointData);
                                          			}
                                        			};
                                        			
                                        			let updateUIForNewData = nodes.updateUIForNewData = 
                                          		    (newData, dataIsAlreadyMapped=false) =>
                                          		    {
                                          		      debugger;
                                          		      
                                          		      let currentPointData  = namespace(pointDataByUserIDDict, newData.userID);

                                          		      let mappedNewData;
                                          		      
                                          		      if (dataIsAlreadyMapped === false)
                                          		      { mappedNewData = {};
                                            		      for (let [key, value] of Object.entries(newData))
                                            		      {
                                            		        let mapToThisNamespace = mapSpreadsheetFieldNameDict[key];
  // ************************************************************** CONTINUE
                                            		        if (mapToThisNamespace === undefined) continue;
                                            		        namespace.setValue(mappedNewData, mapToThisNamespace, value);
                                            		        namespace.setValue(currentPointData, mapToThisNamespace, value, {"overwrite":true});
                                            		      }
                                          		      }
                                          		      else if (dataIsAlreadyMapped === true)
                                          		      { mappedNewData = JSON.parse(JSON.stringify(newData));
                                          		      }
                                          		      
                                          		      
                                          		      let cubeDisplayMode = namespace.leafNode(nodes, "browserState.cubeDisplayMode", "default");
                                          		      if (cubeDisplayMode === "default")
                                          		      {
                                          		        if (mappedNewData.hasOwnProperty("position"))
                                            		      {
                                            		        updateSpherePosition(newData.userID, [currentPointData.position.x *10, currentPointData.position.y *10, currentPointData.position.z *10]);
                                            		        
                                            		      }
                                          		        if (mappedNewData.hasOwnProperty("color"))
                                            		      {
                                            		        updateSphereColor(newData.userID, interpolateColor(nodes.currentColorProfileName, currentPointData.color*100));
                                            		      }
                                            		      // if (mappedNewData.hasOwnProperty("notes"))
                                            		      // {
                                            		      //   updateNotesHUD(newData.userID, currentPointData.notes);
                                            		      // }
                                            		      updateShowOtherUsers(newData.userID);  
                                          		      }
                                          		      else if (cubeDisplayMode === "questionnaire")
                                          		      {
                                          		        if (mappedNewData.hasOwnProperty("position"))
                                            		      {
                                          		        namespace.getMustExist(nodes, "questionnaire.functions.updateQuestionnairePosition")(newData.userID, [currentPointData.position.x *10, currentPointData.position.y *10, currentPointData.position.z *10]);
                                            		        
                                            		      }
                                          		        if (mappedNewData.hasOwnProperty("color"))
                                            		      {
                                            		        namespace.getMustExist(nodes, "questionnaire.functions.updateQuestionnaireColor")(newData.userID, interpolateColor(nodes.currentColorProfileName, currentPointData.color*100));
                                            		      }
                                          		      }
                                          		        
                                          		      
                                          		      
                                          		      
                                          		      
                                          		      if (newData.userID === nodes.userID)
                                          		      {
                                          		        // debugger;
                                          		        
                                          		        if (mappedNewData.hasOwnProperty("position"))
                                            		      {
                                            		        for (let [key, value] of Object.entries(mappedNewData.position))
                                            		        {
                                            		          nodes["dim_"+key].val(value*100);
                                            		        }
                                            		      }
                                            		      if (mappedNewData.hasOwnProperty("color"))
                                            		      {
                                          		        nodes.dim_a.val(mappedNewData.color*100);
                                            		      }
                                            		      if (mappedNewData.hasOwnProperty("notes"))
                                            		      {
                                            		        for (let [key, value] of Object.entries(mappedNewData.notes))
                                            		        {
                                            		          let targetNode = nodes["dim_"+key+"_notes"];
                                            		          targetNode.val(value);
                                            		          ensureNotesTextAreaHeight(targetNode);
                                            		        }
                                            		      }
                                          		      }
                                          		    }
                                          		    
                                  		    
                                  		    nodes.sliderContainer.on
                                              ( "input", ".slider",
                                                (inputEvent) =>
                                                {
                                                  // debugger;
                                                  
                                                  let OCREATE_name = inputEvent.currentTarget.OCREATE_name;
                                                  let targetNode = nodes[OCREATE_name];
                                                  let dimName = OCREATE_name.replace("dim_", "");
                                                  let newSliderValue = targetNode.val();
                                                  let newSpreadsheetValue = newSliderValue/100;
                                                  
                                                  let dataToSend = {};
                                                  
                                                  let positionFunction;
                                                  let colorFunction;
                                                  
                                                  let cubeDisplayMode = namespace.leafNode(nodes, "browserState.cubeDisplayMode", "default");
                                        		      if (cubeDisplayMode === "default")
                                        		      { positionFunction    = updateSpherePosition;
                                        		        colorFunction       = updateSphereColor;
                                        		      }
                                        		      else if (cubeDisplayMode === "questionnaire")
                                        		      { positionFunction    = namespace.getMustExist(nodes, "questionnaire.functions.updateQuestionnairePosition");
                                        		        colorFunction       = namespace.getMustExist(nodes, "questionnaire.functions.updateQuestionnaireColor");
                                        		      }
                                        		      
                                        		      if (dimName !== "a")
                                                  {
                                                    let positionData = pointDataByUserIDDict[nodes.userID].position;
                                                    positionData[dimName] = newSpreadsheetValue;
                                                    positionFunction(nodes.userID, [positionData.x*10, positionData.y*10, positionData.z*10]);
                                                    
                                                    dataToSend["point "+dimName] = newSpreadsheetValue;
                                                  }
                                                  else
                                                  {
                                                    pointDataByUserIDDict[nodes.userID].color = newSpreadsheetValue;
                                                    colorFunction(nodes.userID, interpolateColor(nodes.currentColorProfileName, newSpreadsheetValue*100));
                                                    
                                                    dataToSend["point a"] = newSpreadsheetValue;
                                                  }


                                          				console.log("sending ", dataToSend)
                                          
                                          				atApplication.nodes.sendEventToServer
                                          				( { "eventID" : "updateUserData_fromClient",
                                          					  "data"    : dataToSend
                                          					}
                                          				);
                                          				
                                          				nodes.saveNotifierManager.change();
                                          				
                                          				
                                                }
                                              );

                                          let showNotes = namespace.setValue
                                              ( nodes, "howDidILikeThat.showNotes",
                                                (pointData) =>
                                        				{
                                          				// 	debugger;
                                        					let sphereData                        = sphereDataByIDDict[pointData.userID];
                                        	        let sphereDataAtThisPositionByIDDict  = sphereData.sphereDataAtThisPositionByIDDict;
                                        	        
                                        				  debugger;
                                        				  showNotes_callWithAllPointData(Object.keys(sphereDataAtThisPositionByIDDict));
                                        				  
                                        				}
                                        			);
                                        	let showNotes_callWithAllPointData = namespace.setValue
                                              ( nodes, "howDidILikeThat.showNotes_callWithAllPointData",
                                                (pointIDsToShow_list) =>
                                        				{
                                        	        if (pointIDsToShow_list === false)
                                        	        {
                                        	          clearNotes();
                                        	          return;
                                        	        }
                                        	        
                                        	        let numberOfPointsAtThisPosition     = pointIDsToShow_list.length;
                                        	        
                                        	        
                                        	        let showOtherUserDataBoolean = nodes.showOtherUsersCheckBox.prop("checked");
                                        	        
                                        	        
                                        	        nodes.notesOverlayDiv.html("");
                                        	        nodes.notesOverlayContainer.scrollTop(0);
                                        	        // if (showOtherUserDataBoolean === true && numberOfPointsAtThisPosition > 1)
                                        	        // {
                                        	        //   O.create
                                        	        //   ( [ nodes.notesOverlayDiv,
                                        	        //       ".howManyPointsShownInList", "@Showing "+Object.keys(sphereDataAtThisPositionByIDDict).length+" points...",
                                        	        //     ],
                                        	        //     {},
                                        	        //     null
                                        	        //   )
                                        	        // }
  
                                                  let pointCounter = 0;
                                        	        for (let pointID of pointIDsToShow_list)
                                        	        {
                                        	          let pointCounterString = "";
                                        	          if (showOtherUserDataBoolean === false)
                                        	          { if (pointID !== nodes.userID) 
                                          	          { 
    // ************************************************************* CONTINUE
                                          	            continue;
                                          	          }
                                        	          }
                                        	          else
                                        	          {
                                        	            if (numberOfPointsAtThisPosition > 1)
                                        	            { pointCounter ++;
                                          	            pointCounterString = "Point "+pointCounter+" of "+numberOfPointsAtThisPosition;
                                        	            }
                                        	          }
  
                                        	          let notesHTMLArray = [];
                                        	          let userPointDataDict = pointDataByUserIDDict[pointID];
                                        	          ls ("@: howDidILikeThat_receive_incomingMessageEvent: userPointDataDict:", userPointDataDict)
                                        	          for (let [dimensionName, notesText] of Object.entries(userPointDataDict.notes))
                                          	        {
                                          	          
                                          	          let currentValue = userPointDataDict.position[dimensionName];
                                          	          if (currentValue === undefined) currentValue = userPointDataDict.color;
                                          	          currentValue = currentValue * 100;
                                          	          
                                          	          if (notesText === "") notesText = "no notes entered."
                                          	          
                                          	          let thisNoteHTML = 
                                          	            [ ".dimRow.flexColumn",
                                        	                [ 
                                          	                [ ".dimLabel", "@"+dimensionSpecificationByNameDict["dim_"+dimensionName].questionShortText
                                          	                ],
                                          	                [ "input#"+dimensionName+"_notesSlider.slider.notesSlider.width100", {"attr": [["type","range"],["min","1"],["max","100"],["value",""+currentValue]] } 
                                                            ],
                                          	                [ ".dimNotes", "@"+notesText,
                                          	                ],
                                          	              ]
                                          	            ];
                                          	          notesHTMLArray.push(thisNoteHTML);
                                          	        }
                                        	          
                                        	          O.create
                                        	          ( [ nodes.notesOverlayDiv,
                                        	              [ [ ".sphereDataInfoContainer_"+pointID+".sphereDataInfoContainer.flexColumn",
                                        	                  [ 
                                        	                    [ ".pointCounterRow.flexRow", "@"+pointCounterString,
                                            	                ],
                                            	                [ ".notesHTMLArrayContainer.flexColumn",
                                        	                      notesHTMLArray,
                                        	                    ]
                                        	                  ],
                                        	                ],
                                        	              ],
                                        	            ],
                                        	            {},
                                        	            null
                                        	          );
                                        	        };
                                        	        
                                        	        
                                        	       // debugger;
                                        	        
  
                                        	        nodes.notesOverlayContainer.toggleClass("displayNone", false);
                                        	        nodes.notesOverlayDiv.scrollTop(0);
                                        	        
                                        	        nodes.projectContainer.toggleClass("showNotes", true);
                                        	        
                                        	        
                                        	       // let scrollHeight = nodes.notesOverlayDiv.prop("scrollHeight");
                                        	       // let clientHeight = nodes.notesOverlayDiv.prop("clientHeight");
                                        	       // let scrollAvailable = nodes.notesOverlayContainer.scrollAvailable;
                                        	       // if (nodes.notesOverlayContainer.scrollAvailable === undefined)
                                      	         // { O.create
                                        	       //   ( [ nodes.notesOverlayContainer,
                                        	       //       [ [ "^.scrollAvailable.flexRow.flex_spaceAround.positionAbsolute",  
                                        	       //           [ [ ".downArrow", "@▼" ],
                                        	       //             [ ".downArrow", "@scroll down for more" ],
                                        	       //             [ ".downArrow", "@▼" ],
                                        	       //           ]
                                        	       //         ]
                                        	       //       ]
                                        	       //     ],
                                        	       //     {},
                                        	       //     null
                                        	       //   );
                                        	          
                                        	       //   scrollAvailable = nodes.notesOverlayContainer.scrollAvailable;
                                        	       //   nodes.notesOverlayDiv.on
                                        	       //   ( "scroll",
                                        	       //     () =>
                                        	       //     {
                                        	       //      // debugger;
                                        	       //       let scrollHeight = nodes.notesOverlayDiv.prop("scrollHeight");
                                        	       //       let clientHeight = nodes.notesOverlayDiv.prop("clientHeight");
                                        	       //       let scrollTop = nodes.notesOverlayDiv.scrollTop();
                                        	              
                                        	       //      // ls("@: howDidILikeThat_receive_incomingMessageEvent: ", scrollTop, scrollHeight, clientHeight)
                                        	       //       if (scrollTop >= Math.max(Math.min(70, scrollHeight - clientHeight - 10), 1))
                                        	       //       { scrollAvailable.fadeOut(300);  
                                        	       //       }
                                        	       //       else if (scrollTop < 70 || scrollTop === 0)
                                        	       //       {
                                        	       //        // clearTimeout(namespace.rm(scrollAvailable, "displayTimeout"));
                                        	       //         scrollAvailable.fadeIn(100);
                                        	       //       }
                                        	       //      // else if (scrollTop > scrollHeight - clientHeight - 60)
                                        	       //     }
                                        	       //   );
                                      	         // }
                                      	          
                                      	         // if (scrollHeight > clientHeight)
                                      	         // { scrollAvailable.show();
                                      	         // }
                                      	         // else
                                      	         // { scrollAvailable.hide();
                                      	         // }
                                        				}
                                              )
                                              
                                      	
                                      			let clearNotes = 
                                      			  () =>
                                      				{
                                      				  nodes.notesOverlayDiv.html("");
                                      				  nodes.notesOverlayContainer.toggleClass("displayNone", true);
                                      				  nodes.projectContainer.toggleClass("showNotes", false);
                                      				  
                                      				// 	document.getElementById('notes').innerHTML = "";
                                      				// 	document.getElementById('notes').style.visibility = "hidden";
                                      				}
                                      			
                                      			scene.onPointerDown = function (evt, pickResult) {
                                                  cameraMetaManagement.onPointerDownPosition = camera.position.clone();
                                              };
                                              
                                      			scene.onPointerUp = function (evt, pickResult) {
                                                  // We try to pick an object
                                                  
                                                  
                                                  debugger;
                                                  if (! cameraMetaManagement.onPointerDownPosition.equals(camera.position))
                                                  { 
// ****************************************************************  RETURN
                                                    return;
                                                  }
                                                  
                                                  clearCurrentlySelectedSphere();
                                                  
                                                  let showOtherUserDataBoolean = nodes.showOtherUsersCheckBox.prop("checked");
                                                  
                                                  let notesVisible = false;
                                                  let showPointerEcho = true;
                                                  if (pickResult.hit !== undefined) 
                                                  {
                                                    let sphereID             = namespace.getIfExists(pickResult, "pickedMesh.name");
                                                    if (! namespace.isNotFound(sphereID))
                                                    { 
                                                      console.log("HDILT: picked sphere: "+sphereID);
                                                      if (sphereID.endsWith("Hitbox")) sphereID = sphereID.slice(0,-6);
                                                      console.log("HDILT: canonical sphere ID: "+sphereID);
                                                      
                                                      let selectedSphere       = pointDataByUserIDDict[sphereID];
                                                      if (sphereID === nodes.userID || (selectedSphere !== undefined && showOtherUserDataBoolean === true))
                                                      {
                                                        showNotes(selectedSphere)
                                                        notesVisible             = true;
                                                       
                                                        sphereDataByIDDict[sphereID].axesHighlightMaterial.alpha = 0.99;
                                                        sphereDataByIDDict[sphereID].toggleActionsRegistered(false);
                                                        scene.onPointerUp.currentlySelectedSphereID = sphereID;
                                                        
                                                        showPointerEcho = false;
                                                      }
                                                    }
                                                  }
                                                  
                                                  if (showPointerEcho === true)
                                                  {
                                                    console.log("HDILT: clicked on not sphere");
                                                      
                                                    debugger;
                                                    
                                                    nodes.touchEchoCursor.css("left", evt.offsetX);
                                                    nodes.touchEchoCursor.css("top",  evt.offsetY);
                                                    
                                                    nodes.touchEchoCursor.toggleClass("displayNone", false);
                                                    nodes.touchEchoCursorPing.toggleClass("touchEchoCursorPing_animate", true);
                                                    
                                                    setTimeout
                                                        ( () => 
                                                          { nodes.touchEchoCursor.toggleClass("displayNone", true)
                                                            nodes.touchEchoCursorPing.toggleClass("touchEchoCursorPing_animate", false);
                                                          }
                                                          ,400
                                                        );
                                                  }
                                                  
                                                  
                                                  if (notesVisible === false) clearNotes();
                                              };
                                          let clearCurrentlySelectedSphere = 
                                              () =>
                                              {
                                                let currentlySelectedSphereID = scene.onPointerUp.currentlySelectedSphereID;
                                                if (currentlySelectedSphereID !== undefined)
                                                {
                                                  sphereDataByIDDict[currentlySelectedSphereID].axesHighlightMaterial.alpha = 0;
                                                  // if (currentlySelectedSphereID !== nodes.userID)
                                                  { 
                                                    updateShowOtherUsers(currentlySelectedSphereID);
                                                  }
                                                }
                                              }
                                          
                                          nodes.sliderContainer.find(".textInput").on
                                              ( "input",
                                                (keyupEvent) =>
                                                {
                                                  
                                                  // debugger;
                                                  
                                                  let OCREATE_name = keyupEvent.currentTarget.OCREATE_name;
                                                  let targetNode = nodes[OCREATE_name];
                                                  let dimName = OCREATE_name.replace("dim_", "").replace("_notes", "");
                                                  let newNotesValue = targetNode.val();

                                                  let dataToSend = {};
                                                  
                                                  let notesData = pointDataByUserIDDict[nodes.userID].notes;
                                                  notesData[dimName] = newNotesValue;
                                                  // updateSpherePosition(nodes.userID, [positionData.z*10, positionData.y*10, positionData.x*10]);
                                                  dataToSend["notes "+dimName] = newNotesValue;


                                          				// console.log("sending ", dataToSend)
                                          				
                                          				ensureNotesTextAreaHeight(targetNode);
                                          
                                          				atApplication.nodes.sendEventToServer
                                          				( { "eventID" : "updateUserData_fromClient",
                                          					  "data"    : dataToSend
                                          					}
                                          				);
                                          				
                                          				nodes.saveNotifierManager.change();
                                                  
                                                }
                                              );
                                          
                                          nodes.colorProfileSelect.on
                                            ( "change",
                                              () =>
                                              {
                                                nodes.currentColorProfileName = nodes.colorProfileSelect.val();
                                                
                                                for (let [userIDToUpdate, currentPointData] of Object.entries(pointDataByUserIDDict))
                                                {
                                                  updateSphereColor(userIDToUpdate, interpolateColor(nodes.currentColorProfileName, currentPointData.color*100));
                                                  // updateUIForNewData({"userID": userIDToUpdate, "color": currentPointData.color })
                                                }
                                              }
                                            )
                                          
                                          nodes.showOtherUsersCheckBox.on
                                            ( "click",
                                              () =>
                                              { 
                                                let checked = nodes.showOtherUsersCheckBox.prop("checked");
                                                for (let sphereID of Object.keys(sphereDataByIDDict))
                                                { updateShowOtherUsers(sphereID, checked);
                                                }
                                                
                                                if (checked === false)
                                                {
                                                  clearCurrentlySelectedSphere();
                                                  clearNotes();
                                                }
                                              }
                                            )
                                          let updateShowOtherUsers =
                                              (sphereID, checked) =>
                                              {
                                                if (checked === undefined)
                                                { checked = nodes.showOtherUsersCheckBox.prop("checked");
                                                }
                                                
                                                let targetOtherUsersAlpha = 0.05;
                                                if (checked === true) targetOtherUsersAlpha = 1;
                                                
                                                let sphereData = sphereDataByIDDict[sphereID]
                                                if (sphereID !== nodes.userID)
                                                {
                                                  sphereData.sphereMaterial.alpha = targetOtherUsersAlpha;
                                                  sphereData.toggleActionsRegistered(checked);
                                                  
                                                  sphereData.showSphereNumberTextPlane = checked;
                                                }
                                                else
                                                {
                                                  sphereData.sphereMaterial.alpha = 1;
                                                  sphereData.toggleActionsRegistered(true);
                                                  
                                                  sphereData.showSphereNumberTextPlane = checked;
                                                }
                                                
                                                $("body").toggleClass("showOtherUsers",checked);
                                              }
                                              
                                          
                                          return scene;
                                          
                                      };
                                      
                                      try 
                                      {
                                        engine = createDefaultEngine();
                                      } 
                                      catch(e) 
                                      {
                                        console.log("the available createEngine function failed. Creating the default engine instead");
                                        engine = createDefaultEngine();
                                      }
                                      if (!engine) throw 'engine should not be null.';
                                      
                                      engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
                                      
                                      scene = createScene();
                                      sceneToRender = scene;
                              
                                      let renderFunction = 
                                          () =>
                                          {
                                            if (sceneToRender) 
                                            { sceneToRender.render();
                                            }
                                          }
                                      
                                      namespace.setValue(nodes, "babylonJSScene", {engine, renderFunction});
                              
                                      engine.runRenderLoop
                                          ( renderFunction
                                          );
                                          
                                      // engine.runRenderLoop
                                      //     ( () =>
                                      //       {
                                      //         if (sceneToRender) 
                                      //         { sceneToRender.render();
                                      //         }
                                      //       }
                                      //     );
                                      atApplication.engine = engine;
                              
// Resize

engine.listenForCanvasSizeChanges =
    (listenOrNot) =>
    {
      engine.listenForCanvasSizeChanges.canvasHeight = null;
      engine.listenForCanvasSizeChanges.canvasWidth  = null;
      
      if (listenOrNot !== true)
      {
        clearTimeout(engine.listenForCanvasSizeChanges.listenTimeoutID);
        engine.listenForCanvasSizeChanges.listenTimeoutID = null;
      }
      else
      {
        // console.log("canvas size listening");
        engine.listenForCanvasSizeChanges.listenTimeoutID = 
            setTimeout
            ( engine.listenForCanvasSizeChanges.checkIfCanvasSizeChanged,
              200
            );
      }
    }
engine.listenForCanvasSizeChanges.checkIfCanvasSizeChanged = 
    () =>
    {
      // console.log("canvas size checked");
      let renderingCanvasClientRect = engine.getRenderingCanvasClientRect();
      if  (     engine.listenForCanvasSizeChanges.canvasHeight !== renderingCanvasClientRect.height
            ||  engine.listenForCanvasSizeChanges.canvasWidth  !== renderingCanvasClientRect.width
          )
      { engine.listenForCanvasSizeChanges.canvasHeight = renderingCanvasClientRect.height;
        engine.listenForCanvasSizeChanges.canvasWidth  = renderingCanvasClientRect.width;
        // engine.listenForCanvasSizeChanges.doResizeTimeoutID = 
        //     setTimeout(engine.doResize, 200);
        engine.resize()
        // console.log("canvas size changed", renderingCanvasClientRect);
      }
      engine.listenForCanvasSizeChanges.listenTimeoutID = 
          setTimeout
          ( engine.listenForCanvasSizeChanges.checkIfCanvasSizeChanged,
            200
          );
    }
// engine.doResize = 
//     () =>
//     {
//       if (engine.listenForCanvasSizeChanges.doResizeTimeoutID !== null)
//       {
//         clearTimeout(engine.listenForCanvasSizeChanges.doResizeTimeoutID);
//       }
//       engine.listenForCanvasSizeChanges.doResizeTimeoutID = 
//           setTimeout
//           ( () => 
//             { 
//               let renderingCanvasClientRect = engine.getRenderingCanvasClientRect();
//               let renderingCanvas           = engine.getRenderingCanvas();
//               renderingCanvas.clientWidth   = Math.round(renderingCanvasClientRect.width);
//               renderingCanvas.clientHeight  = Math.round(renderingCanvasClientRect.height);
//               engine.listenForCanvasSizeChanges.doResizeTimeoutID = null;
              
//             }, 
//             200
//           );
//     }

engine.listenForCanvasSizeChanges(true);
                                      
                                      
                                        nodes.projectContainer.append
                                        (
`


		
		<div class="credits" role="contentinfo">
			Andy Gibson is the academic lead for People in Health West of England (<a href="https://www.phwe.org.uk">www.phwe.org.uk</a>),
			a regional public involvement network that supports public involvement in research. He developed this framework as a way of thinking about and evaluating public involvement.
		</div>
    
    

` 
                                        )
                                    
                                      },
                                      animationIndex * animationDuration,
                                    );
                                    
                                    animationIndex ++;
                                    setTimeout
                                    ( () =>
                                      {
                                        nodes.sendEventToServer
                                        ( { "eventID": "uiMajorStateCollection",
                                            "uiMajorStateCollectionParameters":
                                            {
                                              "targetNodeName": "cubePage",
                                              "command": "loadCubeData",
                                            }
                                          }
                                        );
                                      },
                                      animationIndex * animationDuration
                                    );
                                    animationIndex++;
                                    
                                  }
                                ).toString().slice(6)
                          }
                        ]
                      );
                      
  //             
            }
