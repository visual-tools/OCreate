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

}(jQuery);

window.O = ThisEqualsThat.BootstrapObjects;
