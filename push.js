// Run the function every 3 seconds
// Run the function every 3 seconds
setInterval(() => {
  try {
    let codeBlocks = document.querySelectorAll(".language-html");

    // Create a set to store unique parent 'pre' elements
    let uniquePreElements = new Set();

    // Loop through each 'language-html' class element
    codeBlocks.forEach((codeBlock) => {
      // Select the parent 'pre' element
      let preElement = codeBlock.closest("pre");

      // Add the preElement to the set
      uniquePreElements.add(preElement);
    });

    // Loop through each unique 'pre' element
    Array.from(uniquePreElements).forEach((preElement, index) => {
      // Check if a button already exists
      if (!document.getElementById("load-button-" + index)) {
        // Check if the preElement is complete with closing html tag
        if (preElement.textContent.includes("</html>")) {
          // Get the text content
          let codeText = preElement.querySelector(".language-html").textContent;

          // Create a new button element
          let button = document.createElement("button");
          button.textContent = "Make UI";
          button.className = "load-button"; // Add a class to the button
          button.id = "load-button-" + index; // Add an ID to the button

          // Add a style to make the button full width
          button.style.width = "100%";

          // Insert the new button before the 'pre' element
          preElement.parentNode.insertBefore(button, preElement);

          // Rest of your code...

          // Create a variable to hold the iframe
          let iframe;

          // Add an event listener to the button
          button.addEventListener("click", () => {
            // If the iframe exists, delete it
            if (iframe) {
              iframe.parentNode.removeChild(iframe);
              iframe = null;
              button.textContent = "Make UI";
            } else {
              // Create a new iframe element
              iframe = document.createElement("iframe");

              // Insert the new iframe after the button
              button.parentNode.insertBefore(iframe, button.nextSibling);

              // Set the iframe to full size
              iframe.style.width = "600px";
              iframe.style.height = "600px";

              // Write the HTML into the iframe's document
              let iframeDoc = iframe.contentWindow.document;
              iframeDoc.open();
              iframe.srcdoc = codeText;
              iframeDoc.close();

              button.textContent = "Hide";
            }
          });
        }
      }
    });
  } catch (error) {
    console.error("An error occurred: ", error);
  }
}, 3000); // 3000 milliseconds = 3 seconds

/////////////////////////////////////////////
/////////////////////////////////////////////

let counter = 0;

// keep searching add add button
let intervalId1 = setInterval(function () {
  if (
    document.querySelector(".original-query") &&
    !document.querySelector("#GPTEditor-btn")
  ) {
    addButtonToContainer();
  }
  addClassToResponse(className);
  isEditingEnabled && checkAndMoveMarkup();
  checkAndClear(1);
}, 100);

let intervalId2 = setInterval(() => {
  isEditingEnabled && main();
  isEditingEnabled && hideElements();
}, 200);

const className =
  // "min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap";
  "flex-col gap-1 md:gap-3";
let messages = [];
let elements;
let isEditingEnabled = false; // initialize editing as disabled

// const menuContainerClassname = "flex gap-2 pr-1";
const menuContainerClassname =
  "draggable no-draggable-children sticky top-0 p-3 mb-1.5 flex items-center";
// "sticky top-0 mb-1.5 flex items-center justify-between z-10 h-14 bg-white p-2 font-semibold";
// "flex flex-col text-sm gizmo:pb-9 dark:bg-gray-800 gizmo:dark:bg-transparent";
const menuContainerClassname_side_of =
  "stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl";
const menuContainerClassnameShortUpdateForADay =
  "stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl";
const menuContainerClassnamePreGPTReleaseWasWorking =
  "h-full flex ml-1 md:w-full md:m-auto md:mb-4 gap-0 md:gap-2 justify-center";
const menuContainerClassnameGeviner =
  "flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center";
const svg = `<svg width="14px" height="14px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.336 5.421a2.5 2.5 0 0 0 -1.692 1.615L0 17.969l0.574 0.574L6.438 12.679c-0.117 -0.245 -0.188 -0.515 -0.188 -0.804 0 -1.036 0.839 -1.875 1.875 -1.875s1.875 0.839 1.875 1.875 -0.839 1.875 -1.875 1.875c-0.289 0 -0.559 -0.071 -0.804 -0.188L1.457 19.426 2.031 20l10.932 -3.644a2.5 2.5 0 0 0 1.615 -1.692L16.25 8.75 11.25 3.75l-5.914 1.671zm14.115 -2.524l-2.348 -2.348c-0.732 -0.732 -1.92 -0.732 -2.653 0l-2.209 2.209 5.001 5.001 2.209 -2.209c0.732 -0.732 0.732 -1.92 0 -2.653z" fill="#808080"/>
  </svg>`;

function hideElements() {
  const originalResponseElements = [
    ...document.getElementsByClassName("original-response"),
  ];
  originalResponseElements.forEach((element) =>
    element.classList.add("hidden")
  );
}

function checkAndClear(seconds) {
  if (
    !document.querySelector("#response-0") ||
    !document.querySelector("#query-0")
  ) {
    counter++;
    if (counter >= seconds * 10) {
      messages = [];
    }
  } else {
    counter = 0;
  }
}

let firstRun = true; // added condition

function toggleEditorMode(isEnabled) {
  const originalResponseElements = [
    ...document.getElementsByClassName("original-response"),
  ];
  const markupWrapperElements = [
    ...document.getElementsByClassName("markup-wrapper"),
  ];

  const button = document.getElementById("GPTEditor-btn");

  if (isEnabled) {
    // button.innerHTML = svg + "Editing Enabled"; / temporary
    button.innerHTML = svg + "GPTEditor";
    button.className = `btn flex gap-2 justify-center btn-neutral we-green-on`;
    // button.className =
    //   " gizmo:bg-clip-padding border text-gray-600   border-black/10  bottom-5 btn flex gap-2 justify-end btn-neutral we-green translate-x-25";
    // button.style.position = "absolute";
    // button.style.right = "50%";
    // button.style.transform = "translateX(380px)";
    markupWrapperElements.forEach((element) =>
      element.classList.remove("hidden")
    );
    hideElements();
  } else {
    if (firstRun) {
      button.innerHTML = svg + "GPTEditor";
    } else {
      button.innerHTML = svg + "GPTEditor";
      // button.innerHTML = svg + "Editing Disabled"; / temporary
    }
    firstRun = false;
    button.className = `btn flex gap-2 justify-center btn-neutral we-green`;
    // button.className =
    //   " gizmo:bg-clip-padding border text-gray-600   border-black/10  bottom-5 btn flex gap-2 justify-end btn-neutral translate-x-25";
    // button.style.position = "absolute";
    // button.style.right = "50%";
    // button.style.transform = "translateX(380px)";
    markupWrapperElements.forEach((element) => element.classList.add("hidden"));
    originalResponseElements.forEach((element) =>
      element.classList.remove("hidden")
    );
  }

  // // Example JavaScript
  // button.addEventListener("click", async () => {
  //   try {
  //     const url =
  //       "https://maker.ifttt.com/trigger/email/json/with/key/d7oPSwBYxhewSa3xMTZYJz";
  //     const payload = { email: "clicked" };
  //     const response = await fetch(url, {
  //       method: "POST",
  //       mode: "no-cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     // Handle response here if needed
  //   } catch (error) {
  //     // Handle error here if needed
  //     console.log(error);
  //   }
  // });
}

function addButtonToContainer() {
  try {
    const menuContainer = document.getElementsByClassName(
      menuContainerClassname
    )[0].children[1];

    // Create and insert the button
    const button = document.createElement("button");
    button.setAttribute("id", "GPTEditor-btn");

    // Set button text content based on editing status

    // Add click event listener to toggle editing status
    button.addEventListener("click", () => {
      isEditingEnabled = !isEditingEnabled;
      toggleEditorMode(isEditingEnabled);
    });

    menuContainer.appendChild(button);
    toggleEditorMode(isEditingEnabled);
  } catch {
    // Handle any errors here
  }
}

// function addButtonToContainer() {
//   toggleEditorMode(isEditingEnabled);

//   // Add click event listener to toggle editing status
//   button.addEventListener("click", () => {
//     isEditingEnabled = !isEditingEnabled;
//     toggleEditorMode(isEditingEnabled);
//   });

//   menuContainer.appendChild(button);
// }

function main() {
  let responseHasChanged = false;
  let bigChange = false;
  const newMessages = getMessages(className);
  try {
    if (
      messages[0] &&
      messages[0].query &&
      ((newMessages.length === 1 &&
        newMessages[0].query != messages[0].query) ||
        (newMessages.length > 1 &&
          newMessages[0].query != messages[0].query &&
          newMessages[1].query != messages[1].query))
    ) {
      console.table(newMessages);
      console.table(messages);
      console.table("FIRST HAS CHANGED");
      bigChange = true;
      newMessages.forEach((message, index) => {
        retry(() => {
          insertMarkupElement(
            message.markupHtml,
            elements[index * 2 + 1],
            index
          );
        });
      });
      messages = deepCopyArray(newMessages);
      return;
    }
  } catch {}

  if (newMessages.length > messages.length) {
    responseHasChanged = true;
  }

  newMessages.forEach((message, index) => {
    if (
      messages[index] &&
      messages[index].responseHTML !== message.responseHTML
    ) {
      responseHasChanged = true;
      retry(() => {
        refreshMarkupElement(index, message.markupHtml);
      });
    }
    if (!messages[index]) {
      retry(() => {
        insertMarkupElement(message.markupHtml, elements[index * 2 + 1], index);
      });
    }
  });

  responseHasChanged && (messages = deepCopyArray(newMessages));
}

function deepCopyArray(arr) {
  const copy = [];

  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];
    if (Array.isArray(currentItem)) {
      copy.push(deepCopyArray(currentItem));
    } else {
      copy.push(currentItem);
    }
  }

  return copy;
}

function retry(fn, retryCount = 20, interval = 100) {
  function attempt() {
    try {
      fn();
    } catch (error) {
      if (retryCount === 0) {
      } else {
        retryCount--;
        setTimeout(attempt, interval);
      }
    }
  }
  attempt();
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// var readyStateCheckInterval = setInterval(function () {
//   if (document.readyState === "complete") {
//     clearInterval(readyStateCheckInterval);
//   }
// }, 10);
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/// all functions are below:
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

function addKey(str) {
  let counter = -1;
  let newStr = str.replace(/<(ins|del|span)>/g, function (match) {
    counter++;
    return `<${match.slice(1, -1)} key="${counter}">`;
  });
  return newStr;
}

const myOwnPretty = (diffs) => {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_br = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0]; // Operation (insert, delete, equal)
    var data = diffs[x][1]; // Text of change.
    var text = data
      .replace(pattern_amp, "&amp;")
      .replace(pattern_lt, "&lt;")
      .replace(pattern_gt, "&gt;")
      .replace(pattern_br, "<br/>");
    switch (op) {
      case DIFF_INSERT:
        html[x] = "<ins>" + text + "</ins>";
        break;
      case DIFF_DELETE:
        html[x] = "<del>" + text + "</del>";
        break;
      case DIFF_EQUAL:
        html[x] = "<span>" + text + "</span>";
        break;
    }
  }
  return html.join("");
};

const generateFirstTextDiff = (query, response) => {
  let textDiff = [];
  var Diff = diffWrapper();
  var diff = new Diff();
  textDiff = diff.main(query, response);
  diff.cleanupSemantic(textDiff);
  textDiff = splitSubarray(textDiff);
  const textDiffOriginal = textDiff.map((array) => [...array]);
  return { textDiff, textDiffOriginal };
};

const generateMarkup = (textDiff) => {
  const prettyHtml = addKey(myOwnPretty(textDiff)).replace(/\n/g, "<br>");
  const markupHtml = "<div>" + prettyHtml + "</div>";
  return markupHtml;
};

function getSelectedElements() {
  // const selectedElements = window.getSelection();

  let keyRange1;
  let keyRange2;

  try {
    keyRange1 = window.getSelection().anchorNode.attributes.key["value"];
  } catch {
    try {
      keyRange1 = window
        .getSelection()
        .anchorNode.parentNode.getAttribute("key");
    } catch {}
  }
  try {
    keyRange2 = window.getSelection().focusNode.attributes.key["value"];
  } catch {
    try {
      keyRange2 = window
        .getSelection()
        .focusNode.parentNode.getAttribute("key");
    } catch {}
  }

  let a = parseInt(keyRange1);
  let b = parseInt(keyRange2);

  return [a, b];
}

//sbr
// const getMessages = (className) => {
//   elements = document.getElementsByClassName(className);
//   const messages = [];

//   for (let i = 0; i < elements.length; i += 2) {
//     let query = elements[i + 1].innerHTML;
//     if (true) {
//       query = elements[i + 1].innerHTML
//         .replace(/<\/p>/gi, "\n\n")
//         .replace(/<[^>]+>/gi, "");
//     }
//     if (i > 1 && true) {
//       query = elements[i - 1].innerHTML
//         .replace(/<\/p>/gi, "\n\n")
//         .replace(/<[^>]+>/gi, "");
//     }
//     const responseHTML = elements[i + 1].innerHTML;
//     const response = elements[i + 1].innerHTML
//       .replace(/<\/p>/gi, "\n\n")
//       .replace(/<[^>]+>/gi, ""); //sbreview
//     const { textDiff, textDiffOriginal } = generateFirstTextDiff(
//       query,
//       response
//     );
//     const markupHtml = generateMarkup(textDiff);
//     messages.push({
//       query,
//       responseHTML,
//       response,
//       textDiff,
//       markupHtml,
//       textDiffOriginal,
//     });
//   }
//   return messages;
// };

const addClassToResponse = (className) => {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    const index = Math.floor(i / 2);
    if (i % 2 === 1) {
      if (!elements[i].classList.contains("original-response")) {
        if (!elements[i].classList.contains("original-query")) {
          elements[i].classList.add("original-response");
        }
        elements[i].setAttribute("id", `response-${index}`);
      }
    }
    if (i % 2 === 0) {
      if (!elements[i].classList.contains("original-query")) {
        elements[i].classList.add("original-query");
        elements[i].setAttribute("id", `query-${index}`);
      }
    }
  }
  for (let i = 0; i < elements.length; i++) {
    if (
      elements[i].classList.contains("original-query") &&
      elements[i].classList.contains("original-response")
    ) {
      elements[i].classList.remove("original-response");
    }
  }
};

const checkAndMoveMarkup = () => {
  try {
    const markupWrapper = document.querySelector("#markup-wrapper-0");
    const response0 = document.querySelector("#response-0");
    const parentOfResponse0 = response0.parentNode;

    if (parentOfResponse0 !== markupWrapper.parentNode) {
      parentOfResponse0.appendChild(markupWrapper);
    }
  } catch {}
};

const getMessages = (className) => {
  elements = document.getElementsByClassName(className);
  const messages = [];

  for (let i = 0; i < elements.length; i += 2) {
    let query = cleanPromptFromText(
      elements[i].firstElementChild.firstElementChild.innerHTML
    );
    if (false) {
      query = elements[i + 1].innerHTML
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]+>/gi, "");
    }
    if (i > 1 && false) {
      query = elements[i - 1].innerHTML
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]+>/gi, "");
    }
    const responseHTML = elements[i + 1].innerHTML;
    let response = elements[i + 1].innerHTML
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]+>/gi, ""); //sbreview
    response = cleanResponseFromText(response);
    const { textDiff, textDiffOriginal } = generateFirstTextDiff(
      query,
      response
    );
    const markupHtml = generateMarkup(textDiff);
    messages.push({
      query,
      responseHTML,
      response,
      textDiff,
      markupHtml,
      textDiffOriginal,
    });
  }
  return messages;
};

function modifyArrayWithRange(x, y, prop, index) {
  let startIndex, endIndex;
  if (x <= y) {
    startIndex = x;
    endIndex = y;
  } else {
    startIndex = y;
    endIndex = x;
  }

  if (endIndex >= messages[index].textDiff.length) {
    endIndex = messages[index].textDiff.length - 1;
  }

  for (let i = startIndex; i <= endIndex; i++) {
    if (
      messages[index].textDiff[i][0] === -1 ||
      messages[index].textDiff[i][0] === 1
    ) {
      if (prop === "accept") {
        if (messages[index].textDiff[i][0] === -1) {
          messages[index].textDiff.splice(i, 1);
        } else {
          // textDiff[i][0] = 0;
        }
      } else if (prop === "reject") {
        if (messages[index].textDiff[i][0] === 1) {
          messages[index].textDiff.splice(i, 1);
        } else {
          messages[index].textDiff[i][0] = 0;
        }
      }
    }
  }
}

const generateAndRefreshMarkup = (index) => {
  messages[index].markupHtml = generateMarkup(messages[index].textDiff);
  refreshMarkupElement(index, messages[index].markupHtml);
};

const refreshMarkupElement = (index, markup) => {
  const element = document.getElementById("markup-" + index);
  if (element) {
    element.innerHTML = markup;
  } else {
  }
  //put

  var rewrittenTextSpan = document.getElementById("rewritten-text-" + index);
  try {
    rewrittenTextSpan.innerHTML = Math.floor(
      (1 -
        runSimCheck(
          messages[index].query,
          getCleanText(messages[index].textDiff)
        )) *
        100
    );
  } catch (error) {
    throw error;
  }

  var originalWordCountSpan = document.getElementById(
    "original-word-count-" + index
  );

  try {
    const inputText = messages[index].query;
    const originalWordCount = getWordCount(inputText);
    originalWordCountSpan.innerHTML = originalWordCount;
  } catch (error) {
    throw error;
  }

  var revisedWordCountSpan = document.getElementById(
    "revised-word-count-" + index
  );
  try {
    const revisedText = getCleanText(messages[index].textDiff);
    const revisedWordCount = getWordCount(revisedText);
    revisedWordCountSpan.innerHTML = revisedWordCount;
  } catch (error) {
    throw error;
  }
};

function acceptAllText(arr) {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] !== -1) {
      result += arr[i][1];
    }
  }
  return result;
}

const insertMarkupElement = (markup, element, index) => {
  let markupWrapperElement;
  const existingMarkupElement = document.querySelector(
    "#markup-wrapper-" + index
  );
  if (existingMarkupElement) {
    refreshMarkupElement(index, markup);
    return;
  }

  markupWrapperElement = document.createElement("div");
  markupWrapperElement.id = "markup-wrapper-" + index;
  markupWrapperElement.className = "markup-wrapper";

  var infoInner = document.createElement("div");

  var rewrittenTextSpan = document.createElement("span");
  rewrittenTextSpan.id = "rewritten-text-" + index;
  rewrittenTextSpan.innerHTML = "n/a";
  try {
    rewrittenTextSpan.innerHTML = Math.floor(
      (1 -
        runSimCheck(
          messages[index].query,
          getCleanText(messages[index].textDiff)
        )) *
        100
    );
  } catch (error) {
    throw error;
  }

  var originalWordCountSpan = document.createElement("span");
  originalWordCountSpan.id = "original-word-count-" + index;
  originalWordCountSpan.innerHTML = "n/a";
  try {
    originalWordCountSpan.innerHTML = getWordCount(messages[index].query);
  } catch (error) {
    throw error;
  }

  var revisedWordCountSpan = document.createElement("span");
  revisedWordCountSpan.id = "revised-word-count-" + index;
  revisedWordCountSpan.innerHTML = "n/a";
  try {
    revisedWordCountSpan.innerHTML = getWordCount(
      getCleanText(messages[index].textDiff)
    );
  } catch {
    throw error;
  }

  var rewrittenTextStrong = document.createElement("strong");
  rewrittenTextStrong.appendChild(rewrittenTextSpan);

  var originalWordCountStrong = document.createElement("strong");
  originalWordCountStrong.appendChild(originalWordCountSpan);

  var revisedWordCountStrong = document.createElement("strong");
  revisedWordCountStrong.appendChild(revisedWordCountSpan);

  infoInner.innerHTML = `<div>${rewrittenTextStrong.outerHTML}% of your passage has been rewritten<br>Original Word Count:&nbsp;&nbsp;${originalWordCountStrong.outerHTML}<br>Revised Word Count:&nbsp; ${revisedWordCountStrong.outerHTML}</div>`;

  infoInner.className = "info-inner";

  const infoDashboardElement = document.createElement("div");
  infoDashboardElement.id = "info-dashboard-" + index;
  infoDashboardElement.style.width = "100%";
  infoDashboardElement.style.color = "black";

  const newElement = document.createElement("div");
  newElement.id = "markup-" + index;
  newElement.className = "markup";
  newElement.innerHTML = markup;

  const editBtnContainerElement = document.createElement("div");
  editBtnContainerElement.className = "edit-btn-container";

  const acceptBtn = document.createElement("button");
  acceptBtn.id = `accept-btn-${index}`;
  acceptBtn.title = "Accept changes";
  acceptBtn.classList.add(
    "button-1",
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );
  acceptBtn.innerHTML = `
    <svg class="edit-svg" width="64px" height="64px" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M40 20C39.264 20 38.667 19.403 38.667 18.667V8H21.333C19.861 8 18.667 9.194 18.667 10.667V48C18.667 49.473 19.861 50.667 21.333 50.667H48C49.473 50.667 50.667 49.473 50.667 48V20H40ZM53.333 18.667V48C53.333 50.945 50.945 53.333 48 53.333H21.333C18.388 53.333 16 50.945 16 48V10.667C16 7.721 18.388 5.333 21.333 5.333H40L53.333 18.667ZM41.333 10.438L48.229 17.333H41.333V10.438Z" /><path class="accept-mark" fill-rule="evenodd" clip-rule="evenodd" d="M43.609 28.391C44.13 28.911 44.13 29.755 43.609 30.276L32 41.886L25.724 35.609C25.203 35.089 25.203 34.245 25.724 33.724C26.245 33.203 27.089 33.203 27.609 33.724L32 38.114L41.724 28.391C42.245 27.87 43.089 27.87 43.609 28.391Z" /></svg>
    `;

  const rejectBtn = document.createElement("button");
  rejectBtn.id = `reject-btn-${index}`;
  rejectBtn.title = "Reject changes";
  rejectBtn.classList.add(
    "button-1",
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );
  rejectBtn.innerHTML = `<svg class="edit-svg" width="64px" height="64px" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M40 20C39.264 20 38.667 19.403 38.667 18.667V8H21.333C19.861 8 18.667 9.194 18.667 10.667V48C18.667 49.473 19.861 50.667 21.333 50.667H48C49.473 50.667 50.667 49.473 50.667 48V20H40ZM53.333 18.667V48C53.333 50.945 50.945 53.333 48 53.333H21.333C18.388 53.333 16 50.945 16 48V10.667C16 7.721 18.388 5.333 21.333 5.333H40L53.333 18.667ZM41.333 10.438L48.229 17.333H41.333V10.438Z" /><path class="reject-mark" fill-rule="evenodd" clip-rule="evenodd" d="M28.391 27.057C28.911 26.537 29.755 26.537 30.276 27.057L34.667 31.448L39.057 27.057C39.578 26.537 40.422 26.537 40.943 27.057C41.463 27.578 41.463 28.422 40.943 28.943L36.552 33.333L40.943 37.724C41.463 38.245 41.463 39.089 40.943 39.609C40.422 40.13 39.578 40.13 39.057 39.609L34.667 35.219L30.276 39.609C29.755 40.13 28.911 40.13 28.391 39.609C27.87 39.089 27.87 38.245 28.391 37.724L32.781 33.333L28.391 28.943C27.87 28.422 27.87 27.578 28.391 27.057Z"/></svg>
    </svg>`;

  // Reset button
  const resetBtn = document.createElement("button");
  resetBtn.id = `reset-btn-${index}`;
  resetBtn.title = "Reset";
  resetBtn.classList.add(
    "small-button",
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );
  resetBtn.innerHTML = `<svg class="edit-svg" width="24px" height="24px" viewBox="0 0 36 36" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M15.356 22.543 17.351 24.539H11.039a6.539 6.539 0 0 1 0 -13.078h1.266V9.352H11.039a8.648 8.648 0 0 0 0 17.297h6.312l-1.995 1.995 1.492 1.493L21.39 25.594l-4.543 -4.543Z" />
    <path d="M24.961 9.352H18.649l1.995 -1.995L19.152 5.863 14.61 10.406l4.543 4.543 1.492 -1.492L18.649 11.461H24.961a6.539 6.539 0 0 1 0 13.078H23.656v2.109H24.961a8.648 8.648 0 0 0 0 -17.297Z" /></svg>`;

  const acceptAllBtn = document.createElement("button");
  acceptAllBtn.id = `accept-all-btn-${index}`;
  acceptAllBtn.title = "Show/Hide Markup";
  acceptAllBtn.classList.add(
    "small-button",
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );
  acceptAllBtn.innerHTML = `<svg class="edit-svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20ZM15.483 16.276C17.23 14.748 18.333 12.503 18.333 10C18.333 5.398 14.602 1.667 10 1.667C5.398 1.667 1.667 5.398 1.667 10C1.667 12.468 2.74 14.685 4.444 16.211L5.833 9.145H7.642L10 5.06L12.358 9.145H14.167L15.483 16.276ZM13.41 17.606L12.671 10.812H7.329L6.59 17.606C7.631 18.073 8.785 18.333 10 18.333C11.215 18.333 12.369 18.073 13.41 17.606Z" transform="translate(3,2 )" fill="currentColor"/></svg>`;

  const copyBtn = document.createElement("button");
  copyBtn.id = `copy-btn-${index}`;
  copyBtn.title = "Copy to clipboard";
  copyBtn.classList.add(
    "small-button",
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );
  copyBtn.innerHTML = `<svg class="edit-svg" width="20px" height="20px" viewBox="-2.25 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M30.511 4.636l-3.648 -3.648A3.375 3.375 0 0 0 24.477 0H12.375c-1.864 0 -3.375 1.511 -3.375 3.375v3.375H3.375c-1.864 0 -3.375 1.511 -3.375 3.375v22.5c0 1.864 1.511 3.375 3.375 3.375h15.75c1.864 0 3.375 -1.511 3.375 -3.375v-3.375h5.625c1.864 0 3.375 -1.511 3.375 -3.375V7.023a3.375 3.375 0 0 0 -0.989 -2.386zM18.703 32.625H3.797a0.422 0.422 0 0 1 -0.422 -0.422V10.547a0.422 0.422 0 0 1 0.422 -0.422h5.203v15.75c0 1.864 1.511 3.375 3.375 3.375h6.75v2.953a0.422 0.422 0 0 1 -0.422 0.422zm9 -6.75H12.797a0.422 0.422 0 0 1 -0.422 -0.422V3.797a0.422 0.422 0 0 1 0.422 -0.422h7.453v6.188c0 0.932 0.756 1.688 1.688 1.688h6.188v14.203a0.422 0.422 0 0 1 -0.422 0.422zm0.422 -18h-4.5V3.375h0.677c0.112 0 0.219 0.044 0.298 0.124l3.401 3.401a0.422 0.422 0 0 1 0.124 0.298V7.875z"/></svg>`;

  const copyWordBtn = document.createElement("button");
  copyWordBtn.id = `copy-btn-${index}`;
  copyWordBtn.title = "Copy to clipboard";
  copyWordBtn.classList.add(
    "small-button",
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );
  copyWordBtn.innerHTML = `<svg class="edit-svg" width="20px" height="20px" viewBox="-2.25 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M30.511 4.636l-3.648 -3.648A3.375 3.375 0 0 0 24.477 0H12.375c-1.864 0 -3.375 1.511 -3.375 3.375v3.375H3.375c-1.864 0 -3.375 1.511 -3.375 3.375v22.5c0 1.864 1.511 3.375 3.375 3.375h15.75c1.864 0 3.375 -1.511 3.375 -3.375v-3.375h5.625c1.864 0 3.375 -1.511 3.375 -3.375V7.023a3.375 3.375 0 0 0 -0.989 -2.386zM18.703 32.625H3.797a0.422 0.422 0 0 1 -0.422 -0.422V10.547a0.422 0.422 0 0 1 0.422 -0.422h5.203v15.75c0 1.864 1.511 3.375 3.375 3.375h6.75v2.953a0.422 0.422 0 0 1 -0.422 0.422zm9 -6.75H12.797a0.422 0.422 0 0 1 -0.422 -0.422V3.797a0.422 0.422 0 0 1 0.422 -0.422h7.453v6.188c0 0.932 0.756 1.688 1.688 1.688h6.188v14.203a0.422 0.422 0 0 1 -0.422 0.422zm0.422 -18h-4.5V3.375h0.677c0.112 0 0.219 0.044 0.298 0.124l3.401 3.401a0.422 0.422 0 0 1 0.124 0.298V7.875z"/></svg>`;

  const tipsBtn = document.createElement("button");
  tipsBtn.id = `info-btn-${index}`;
  tipsBtn.title = "Show tips";
  tipsBtn.classList.add(
    "small-button",
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );
  // );
  tipsBtn.innerHTML = `
   <svg class="edit-svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.53846C7.32682 3.53846 3.53846 7.32682 3.53846 12C3.53846 16.6732 7.32682 20.4615 12 20.4615C16.6732 20.4615 20.4615 16.6732 20.4615 12C20.4615 7.32682 16.6732 3.53846 12 3.53846ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16.359C12.4248 16.359 12.7692 16.0146 12.7692 15.5897V11.4872C12.7692 11.0623 12.4248 10.7179 12 10.7179C11.5752 10.7179 11.2308 11.0623 11.2308 11.4872V15.5897C11.2308 16.0146 11.5752 16.359 12 16.359Z" />
      <path d="M13.0256 8.41026C13.0256 7.84381 12.5664 7.38462 12 7.38462C11.4336 7.38462 10.9744 7.84381 10.9744 8.41026C10.9744 8.9767 11.4336 9.4359 12 9.4359C12.5664 9.4359 13.0256 8.9767 13.0256 8.41026Z"/>
      </svg>`;

  const siteLinkElement = document.createElement("div");
  siteLinkElement.id = "site-link-" + index;
  siteLinkElement.classList.add("site-link");

  const siteLinkButton = document.createElement("div");
  siteLinkButton.id = "site-link-button-" + index;
  siteLinkButton.classList.add("site-link-button");
  siteLinkButton.innerHTML = `Love the extension? Try our new editor at <a href="https://GPTEditor.app" target="_blank" style="text-decoration: underline; font-weight: bold;">GPTEditor.app</a> - we just soft launched! `;

  siteLinkElement.appendChild(siteLinkButton);

  const infoTipContainerElement = document.createElement("div");
  infoTipContainerElement.id = "info-tip-container-" + index;
  infoTipContainerElement.classList.add("info-tip-container");
  infoTipContainerElement.classList.add("hidden");
  infoTipContainerElement.innerHTML = `<h4><strong>Track Changes</strong></h4>
    <br />
    Select (highlight) the text and press Accept or Reject button to accept or reject changes in the highlighted portion.
    <br />
    Reset button will reset to original.
    <br /> Markup button will show/hide markup.
    <br />
    Clipboard button will copy your text including any changes you've made to clipboard (without markup). 
    <br />
    <br />
    <h4><strong>Example Prompts</strong></h4>
    <br />
    Proofread this but only fix grammar:
    <br />
    Proofread this: 
    <br />
    Proofread this, lightly improving clarity and flow: 
    <br />
    Proofread this, improving clarity and flow: 
    <br />
    Proofread this, significantly improving clarity and flow: 
    <br />
    Rewrite this, improving prose:
    <br />
    Proofread these bullet points from my CV, keep it in CV language:
    <br />
    Proofread these bullet points:
    <br />
    <br />


    
    Everything after 'Proofread' or 'Rewrite' and before the first colon (:) will be considered a prompt and removed from the text comparison
    <br />
    
    <br />
    <h4><strong>Contact</strong></h4>
    <br />
    Or join <a href="https://www.reddit.com/r/GPTEditor/" style="text-decoration: underline; font-weight: bold;">r/GPTEditor</a> on Reddit if you have any questions, requests or want to share  prompts and other hacks.  `;

  //click handlers

  if (!acceptBtn.classList.contains("click-handler")) {
    // firstEditRequested();
    acceptBtn.classList.add("click-handler");
    acceptBtn.addEventListener("click", function () {
      let range = getSelectedElements();
      try {
        modifyArrayWithRange(range[0], range[1], "accept", index);
      } catch {}
      generateAndRefreshMarkup(index);
    });
  }

  function switchOnTrackChanges(index) {
    if (messages[index].temporaryUntracked) {
      messages[index].textDiff = deepCopyArray(
        messages[index].temporaryUntracked
      );
      messages[index].temporaryUntracked = null;
    } else {
      messages[index].temporaryUntracked = deepCopyArray(
        messages[index].textDiff
      );
      for (let i = 0; i < messages[index].textDiff.length; i++) {
        if (messages[index].textDiff[i][0] === -1) {
          messages[index].textDiff.splice(i, 1);
          i--;
        } else if (messages[index].textDiff[i][0] === 1) {
          messages[index].textDiff[i][0] = 0;
        }
      }
    }
  }

  if (!acceptAllBtn.classList.contains("click-handler")) {
    // firstEditRequested();
    acceptAllBtn.classList.add("click-handler");
    acceptAllBtn.addEventListener("click", function () {
      switchOnTrackChanges(index);
      generateAndRefreshMarkup(index);
    });
  }

  if (!rejectBtn.classList.contains("click-handler")) {
    // firstEditRequested();
    rejectBtn.classList.add("click-handler");
    rejectBtn.addEventListener("click", function () {
      let range = getSelectedElements();
      try {
        modifyArrayWithRange(range[0], range[1], "reject", index);
      } catch {}
      generateAndRefreshMarkup(index);
    });
  }

  if (!resetBtn.classList.contains("click-handler")) {
    // firstEditRequested();
    resetBtn.classList.add("click-handler");
    resetBtn.addEventListener("click", function () {
      messages[index].textDiff = messages[index].textDiffOriginal.map(
        (array) => [...array]
      );
      generateAndRefreshMarkup(index);
    });
  }

  if (!copyBtn.classList.contains("click-handler")) {
    copyBtn.classList.add("click-handler");
    copyBtn.addEventListener("click", function () {
      const finalText = acceptAllText(
        messages[index].textDiff.map((array) => [...array])
      );
      navigator.clipboard.writeText(finalText);
    });
  }

  if (!tipsBtn.classList.contains("click-handler")) {
    tipsBtn.classList.add("click-handler");
    tipsBtn.addEventListener("click", function () {
      const infoTipContainer = document.querySelector(
        "#info-tip-container-" + index
      );
      if (infoTipContainer.classList.contains("hidden")) {
        infoTipContainer.classList.remove("hidden");
      } else {
        infoTipContainer.classList.add("hidden");
      }
    });
  }

  // if (!copyWordBtn.classList.contains("click-handler")) {
  //   copyWordBtn.classList.add("click-handler");
  //   copyWordBtn.addEventListener("click", function () {
  //     const finalText = getMarkupText(
  //       messages[index].markupHtml.map((array) => [...array])
  //     );
  //     navigator.clipboard.writeText(finalText);
  //   });
  // }

  const innerDiv1 = document.createElement("div");
  innerDiv1.className = "div-2";
  innerDiv1.appendChild(tipsBtn);
  innerDiv1.appendChild(copyBtn);
  // innerDiv1.appendChild(copyWordBtn);

  const innerDiv2 = document.createElement("div");
  innerDiv2.className = "div-2";
  innerDiv2.appendChild(resetBtn);
  innerDiv2.appendChild(acceptAllBtn);

  // editBtnContainerElement.appendChild(resetBtn);
  editBtnContainerElement.appendChild(acceptBtn);
  // editBtnContainerElement.appendChild(acceptAllBtn);
  editBtnContainerElement.appendChild(rejectBtn);
  editBtnContainerElement.appendChild(innerDiv2);
  editBtnContainerElement.appendChild(innerDiv1);

  // let acceptBtn = document.querySelector(`accept-btn-${index}`);

  infoDashboardElement;
  markupWrapperElement.appendChild(infoDashboardElement);
  infoInner.appendChild(editBtnContainerElement);
  if (index === 3) {
    //temp
    infoInner.appendChild(siteLinkElement);
  }
  infoInner.appendChild(infoTipContainerElement);
  markupWrapperElement.appendChild(infoInner);

  const newButton = document.createElement("button");
  newButton.id = `new-button-${index}`;
  newButton.title = "Open in Editor";
  newButton.innerText = "Open in Editor";
  newButton.classList.add(
    // "small-button",
    "btn",
    "flex",
    // "we-green",
    "gap-2",
    "justify-end",
    "btn-neutral"
  );

  newButton.addEventListener("click", function () {
    const markupContent = document.querySelector(`#markup-${index}`).innerHTML;
    const encodedMarkupContent = encodeURIComponent(markupContent);
    window.open(
      `https://GPTEditor.app/api/posts/import?content=${encodedMarkupContent}`
    );
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.style.width = "100%";
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "flex-end";
  buttonContainer.style.marginTop = "10px"; // Add this line

  buttonContainer.appendChild(newButton);
  // newElement.appendChild(buttonContainer);

  markupWrapperElement.appendChild(newElement);
  markupWrapperElement.appendChild(buttonContainer);

  element.parentNode.insertBefore(markupWrapperElement, element.nextSibling);
};

// const refreshMarkupElement = (markup, element, index) => {
//   const oldMarkupWrapper = document.getElementById(`markup-wrapper-${index}`);
//   const newMarkupWrapper = insertMarkupElement(markup, element, index);
//   oldMarkupWrapper.parentNode.replaceChild(
//     newMarkupWrapper,
//     oldMarkupWrapper
//   );
// };

function getCleanText(array) {
  let text = "";

  for (const subArray of array) {
    if (subArray[0] === 0 || subArray[0] === 1) {
      text += subArray[1];
    }
  }

  return text;
}

function runSimCheck(text1, text2) {
  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    );
  }
  const myOriginalText22 = text1;
  const myReviewedText22 = text2;
  const answer = similarity(myOriginalText22, myReviewedText22);
  return answer;
}

function diffWrapper() {
  /**
   * This library was modified by Harrison Liddiard. The source code to this
   * modified version can be found at https://github.com/liddiard/google-diff/.
   * The original source code can be found at
   * http://code.google.com/p/google-diff-match-patch/. This unofficial fork is
   * not maintained by or affiliated with Google Inc. The original attribution
   * and licensing information follows.
   */

  /**
   * Diff Match and Patch
   *
   * Copyright 2006 Google Inc.
   * http://code.google.com/p/google-diff-match-patch/
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @fileoverview Computes the difference between two texts to create a patch.
   * Applies the patch onto another text, allowing for errors.
   * @author fraser@google.com (Neil Fraser)
   */

  /**
   * Class containing the diff.
   * @constructor
   */
  function diff(options) {
    var options = options || {};

    // Defaults.
    // Redefine these in your program to override the defaults.

    // Number of seconds to map a diff before giving up (0 for infinity).
    this.Timeout = options.timeout || 1.0;
    // Cost of an empty edit operation in terms of edit characters.
    this.EditCost = options.editCost || 4;
  }

  //  DIFF FUNCTIONS

  /**
   * The data structure representing a diff is an array of tuples:
   * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
   * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
   */
  var DIFF_DELETE = -1;
  var DIFF_INSERT = 1;
  var DIFF_EQUAL = 0;

  /** @typedef {{0: number, 1: string}} */
  diff.Diff;

  /**
   * Find the differences between two texts.  Simplifies the problem by stripping
   * any common prefix or suffix off the texts before diffing.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
   *     then don't run a line-level diff first to identify the changed areas.
   *     Defaults to true, which does a faster, slightly less optimal diff.
   * @param {number} opt_deadline Optional time when the diff should be complete
   *     by.  Used internally for recursive calls.  Users should set DiffTimeout
   *     instead.
   * @return {!Array.<!diff.Diff>} Array of diff tuples.
   */
  diff.prototype.main = function (text1, text2, opt_checklines, opt_deadline) {
    // Set a deadline by which time the diff must be complete.
    if (typeof opt_deadline == "undefined") {
      if (this.Timeout <= 0) {
        opt_deadline = Number.MAX_VALUE;
      } else {
        opt_deadline = new Date().getTime() + this.Timeout * 1000;
      }
    }
    var deadline = opt_deadline;

    // Check for null inputs.
    if (text1 == null || text2 == null) {
      throw new Error("Null input. (diff_main)");
    }

    // Check for equality (speedup).
    if (text1 == text2) {
      if (text1) {
        return [[DIFF_EQUAL, text1]];
      }
      return [];
    }

    if (typeof opt_checklines == "undefined") {
      opt_checklines = true;
    }
    var checklines = opt_checklines;

    // Trim off common prefix (speedup).
    var commonlength = this.commonPrefix(text1, text2);
    var commonprefix = text1.substring(0, commonlength);
    text1 = text1.substring(commonlength);
    text2 = text2.substring(commonlength);

    // Trim off common suffix (speedup).
    commonlength = this.commonSuffix(text1, text2);
    var commonsuffix = text1.substring(text1.length - commonlength);
    text1 = text1.substring(0, text1.length - commonlength);
    text2 = text2.substring(0, text2.length - commonlength);

    // Compute the diff on the middle block.
    var diffs = this.compute_(text1, text2, checklines, deadline);

    // Restore the prefix and suffix.
    if (commonprefix) {
      diffs.unshift([DIFF_EQUAL, commonprefix]);
    }
    if (commonsuffix) {
      diffs.push([DIFF_EQUAL, commonsuffix]);
    }
    this.cleanupMerge(diffs);
    return diffs;
  };

  /**
   * Find the differences between two texts.  Assumes that the texts do not
   * have any common prefix or suffix.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {boolean} checklines Speedup flag.  If false, then don't run a
   *     line-level diff first to identify the changed areas.
   *     If true, then run a faster, slightly less optimal diff.
   * @param {number} deadline Time when the diff should be complete by.
   * @return {!Array.<!diff.Diff>} Array of diff tuples.
   * @private
   */
  diff.prototype.compute_ = function (text1, text2, checklines, deadline) {
    var diffs;

    if (!text1) {
      // Just add some text (speedup).
      return [[DIFF_INSERT, text2]];
    }

    if (!text2) {
      // Just delete some text (speedup).
      return [[DIFF_DELETE, text1]];
    }

    var longtext = text1.length > text2.length ? text1 : text2;
    var shorttext = text1.length > text2.length ? text2 : text1;
    var i = longtext.indexOf(shorttext);
    if (i != -1) {
      // Shorter text is inside the longer text (speedup).
      diffs = [
        [DIFF_INSERT, longtext.substring(0, i)],
        [DIFF_EQUAL, shorttext],
        [DIFF_INSERT, longtext.substring(i + shorttext.length)],
      ];
      // Swap insertions for deletions if diff is reversed.
      if (text1.length > text2.length) {
        diffs[0][0] = diffs[2][0] = DIFF_DELETE;
      }
      return diffs;
    }

    if (shorttext.length == 1) {
      // Single character string.
      // After the previous speedup, the character can't be an equality.
      return [
        [DIFF_DELETE, text1],
        [DIFF_INSERT, text2],
      ];
    }

    // Check to see if the problem can be split in two.
    var hm = this.halfMatch_(text1, text2);
    if (hm) {
      // A half-match was found, sort out the return data.
      var text1_a = hm[0];
      var text1_b = hm[1];
      var text2_a = hm[2];
      var text2_b = hm[3];
      var mid_common = hm[4];
      // Send both pairs off for separate processing.
      var diffs_a = this.main(text1_a, text2_a, checklines, deadline);
      var diffs_b = this.main(text1_b, text2_b, checklines, deadline);
      // Merge the results.
      return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
    }

    if (checklines && text1.length > 100 && text2.length > 100) {
      return this.lineMode_(text1, text2, deadline);
    }

    return this.bisect_(text1, text2, deadline);
  };

  /**
   * Do a quick line-level diff on both strings, then rediff the parts for
   * greater accuracy.
   * This speedup can produce non-minimal diffs.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} deadline Time when the diff should be complete by.
   * @return {!Array.<!diff.Diff>} Array of diff tuples.
   * @private
   */
  diff.prototype.lineMode_ = function (text1, text2, deadline) {
    // Scan the text on a line-by-line basis first.
    var a = this.linesToChars_(text1, text2);
    text1 = a.chars1;
    text2 = a.chars2;
    var linearray = a.lineArray;

    var diffs = this.main(text1, text2, false, deadline);

    // Convert the diff back to original text.
    this.charsToLines_(diffs, linearray);
    // Eliminate freak matches (e.g. blank lines)
    this.cleanupSemantic(diffs);

    // Rediff any replacement blocks, this time character-by-character.
    // Add a dummy entry at the end.
    diffs.push([DIFF_EQUAL, ""]);
    var pointer = 0;
    var count_delete = 0;
    var count_insert = 0;
    var text_delete = "";
    var text_insert = "";
    while (pointer < diffs.length) {
      switch (diffs[pointer][0]) {
        case DIFF_INSERT:
          count_insert++;
          text_insert += diffs[pointer][1];
          break;
        case DIFF_DELETE:
          count_delete++;
          text_delete += diffs[pointer][1];
          break;
        case DIFF_EQUAL:
          // Upon reaching an equality, check for prior redundancies.
          if (count_delete >= 1 && count_insert >= 1) {
            // Delete the offending records and add the merged ones.
            diffs.splice(
              pointer - count_delete - count_insert,
              count_delete + count_insert
            );
            pointer = pointer - count_delete - count_insert;
            var a = this.main(text_delete, text_insert, false, deadline);
            for (var j = a.length - 1; j >= 0; j--) {
              diffs.splice(pointer, 0, a[j]);
            }
            pointer = pointer + a.length;
          }
          count_insert = 0;
          count_delete = 0;
          text_delete = "";
          text_insert = "";
          break;
      }
      pointer++;
    }
    diffs.pop(); // Remove the dummy entry at the end.

    return diffs;
  };

  /**
   * Find the 'middle snake' of a diff, split the problem in two
   * and return the recursively constructed diff.
   * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} deadline Time at which to bail if not yet complete.
   * @return {!Array.<!diff.Diff>} Array of diff tuples.
   * @private
   */
  diff.prototype.bisect_ = function (text1, text2, deadline) {
    // Cache the text lengths to prevent multiple calls.
    var text1_length = text1.length;
    var text2_length = text2.length;
    var max_d = Math.ceil((text1_length + text2_length) / 2);
    var v_offset = max_d;
    var v_length = 2 * max_d;
    var v1 = new Array(v_length);
    var v2 = new Array(v_length);
    // Setting all elements to -1 is faster in Chrome & Firefox than mixing
    // integers and undefined.
    for (var x = 0; x < v_length; x++) {
      v1[x] = -1;
      v2[x] = -1;
    }
    v1[v_offset + 1] = 0;
    v2[v_offset + 1] = 0;
    var delta = text1_length - text2_length;
    // If the total number of characters is odd, then the front path will collide
    // with the reverse path.
    var front = delta % 2 != 0;
    // Offsets for start and end of k loop.
    // Prevents mapping of space beyond the grid.
    var k1start = 0;
    var k1end = 0;
    var k2start = 0;
    var k2end = 0;
    for (var d = 0; d < max_d; d++) {
      // Bail out if deadline is reached.
      if (new Date().getTime() > deadline) {
        break;
      }

      // Walk the front path one step.
      for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
        var k1_offset = v_offset + k1;
        var x1;
        if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
          x1 = v1[k1_offset + 1];
        } else {
          x1 = v1[k1_offset - 1] + 1;
        }
        var y1 = x1 - k1;
        while (
          x1 < text1_length &&
          y1 < text2_length &&
          text1.charAt(x1) == text2.charAt(y1)
        ) {
          x1++;
          y1++;
        }
        v1[k1_offset] = x1;
        if (x1 > text1_length) {
          // Ran off the right of the graph.
          k1end += 2;
        } else if (y1 > text2_length) {
          // Ran off the bottom of the graph.
          k1start += 2;
        } else if (front) {
          var k2_offset = v_offset + delta - k1;
          if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
            // Mirror x2 onto top-left coordinate system.
            var x2 = text1_length - v2[k2_offset];
            if (x1 >= x2) {
              // Overlap detected.
              return this.bisectSplit_(text1, text2, x1, y1, deadline);
            }
          }
        }
      }

      // Walk the reverse path one step.
      for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
        var k2_offset = v_offset + k2;
        var x2;
        if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
          x2 = v2[k2_offset + 1];
        } else {
          x2 = v2[k2_offset - 1] + 1;
        }
        var y2 = x2 - k2;
        while (
          x2 < text1_length &&
          y2 < text2_length &&
          text1.charAt(text1_length - x2 - 1) ==
            text2.charAt(text2_length - y2 - 1)
        ) {
          x2++;
          y2++;
        }
        v2[k2_offset] = x2;
        if (x2 > text1_length) {
          // Ran off the left of the graph.
          k2end += 2;
        } else if (y2 > text2_length) {
          // Ran off the top of the graph.
          k2start += 2;
        } else if (!front) {
          var k1_offset = v_offset + delta - k2;
          if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
            var x1 = v1[k1_offset];
            var y1 = v_offset + x1 - k1_offset;
            // Mirror x2 onto top-left coordinate system.
            x2 = text1_length - x2;
            if (x1 >= x2) {
              // Overlap detected.
              return this.bisectSplit_(text1, text2, x1, y1, deadline);
            }
          }
        }
      }
    }
    // Diff took too long and hit the deadline or
    // number of diffs equals number of characters, no commonality at all.
    return [
      [DIFF_DELETE, text1],
      [DIFF_INSERT, text2],
    ];
  };

  /**
   * Given the location of the 'middle snake', split the diff in two parts
   * and recurse.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} x Index of split point in text1.
   * @param {number} y Index of split point in text2.
   * @param {number} deadline Time at which to bail if not yet complete.
   * @return {!Array.<!diff.Diff>} Array of diff tuples.
   * @private
   */
  diff.prototype.bisectSplit_ = function (text1, text2, x, y, deadline) {
    var text1a = text1.substring(0, x);
    var text2a = text2.substring(0, y);
    var text1b = text1.substring(x);
    var text2b = text2.substring(y);

    // Compute both diffs serially.
    var diffs = this.main(text1a, text2a, false, deadline);
    var diffsb = this.main(text1b, text2b, false, deadline);

    return diffs.concat(diffsb);
  };

  /**
   * Split two texts into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
   *     An object containing the encoded text1, the encoded text2 and
   *     the array of unique strings.
   *     The zeroth element of the array of unique strings is intentionally blank.
   * @private
   */
  diff.prototype.linesToChars_ = function (text1, text2) {
    var lineArray = []; // e.g. lineArray[4] == 'Hello\n'
    var lineHash = {}; // e.g. lineHash['Hello\n'] == 4

    // '\x00' is a valid character, but various debuggers don't like it.
    // So we'll insert a junk entry to avoid generating a null character.
    lineArray[0] = "";

    /**
     * Split a text into an array of strings.  Reduce the texts to a string of
     * hashes where each Unicode character represents one line.
     * Modifies linearray and linehash through being a closure.
     * @param {string} text String to encode.
     * @return {string} Encoded string.
     * @private
     */
    function diff_linesToCharsMunge_(text) {
      var chars = "";
      // Walk the text, pulling out a substring for each line.
      // text.split('\n') would would temporarily double our memory footprint.
      // Modifying text would create many large strings to garbage collect.
      var lineStart = 0;
      var lineEnd = -1;
      // Keeping our own length variable is faster than looking it up.
      var lineArrayLength = lineArray.length;
      while (lineEnd < text.length - 1) {
        lineEnd = text.indexOf("\n", lineStart);
        if (lineEnd == -1) {
          lineEnd = text.length - 1;
        }
        var line = text.substring(lineStart, lineEnd + 1);
        lineStart = lineEnd + 1;

        if (
          lineHash.hasOwnProperty
            ? lineHash.hasOwnProperty(line)
            : lineHash[line] !== undefined
        ) {
          chars += String.fromCharCode(lineHash[line]);
        } else {
          chars += String.fromCharCode(lineArrayLength);
          lineHash[line] = lineArrayLength;
          lineArray[lineArrayLength++] = line;
        }
      }
      return chars;
    }

    var chars1 = diff_linesToCharsMunge_(text1);
    var chars2 = diff_linesToCharsMunge_(text2);
    return { chars1: chars1, chars2: chars2, lineArray: lineArray };
  };

  /**
   * Rehydrate the text in a diff from a string of line hashes to real lines of
   * text.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   * @param {!Array.<string>} lineArray Array of unique strings.
   * @private
   */
  diff.prototype.charsToLines_ = function (diffs, lineArray) {
    for (var x = 0; x < diffs.length; x++) {
      var chars = diffs[x][1];
      var text = [];
      for (var y = 0; y < chars.length; y++) {
        text[y] = lineArray[chars.charCodeAt(y)];
      }
      diffs[x][1] = text.join("");
    }
  };

  /**
   * Determine the common prefix of two strings.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the start of each
   *     string.
   */
  diff.prototype.commonPrefix = function (text1, text2) {
    // Quick check for common null cases.
    if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
      return 0;
    }
    // Binary search.
    // Performance analysis: http://neil.fraser.name/news/2007/10/09/
    var pointermin = 0;
    var pointermax = Math.min(text1.length, text2.length);
    var pointermid = pointermax;
    var pointerstart = 0;
    while (pointermin < pointermid) {
      if (
        text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)
      ) {
        pointermin = pointermid;
        pointerstart = pointermin;
      } else {
        pointermax = pointermid;
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
  };

  /**
   * Determine the common suffix of two strings.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the end of each string.
   */
  diff.prototype.commonSuffix = function (text1, text2) {
    // Quick check for common null cases.
    if (
      !text1 ||
      !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)
    ) {
      return 0;
    }
    // Binary search.
    // Performance analysis: http://neil.fraser.name/news/2007/10/09/
    var pointermin = 0;
    var pointermax = Math.min(text1.length, text2.length);
    var pointermid = pointermax;
    var pointerend = 0;
    while (pointermin < pointermid) {
      if (
        text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)
      ) {
        pointermin = pointermid;
        pointerend = pointermin;
      } else {
        pointermax = pointermid;
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
  };

  /**
   * Determine if the suffix of one string is the prefix of another.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the end of the first
   *     string and the start of the second string.
   * @private
   */
  diff.prototype.commonOverlap_ = function (text1, text2) {
    // Cache the text lengths to prevent multiple calls.
    var text1_length = text1.length;
    var text2_length = text2.length;
    // Eliminate the null case.
    if (text1_length == 0 || text2_length == 0) {
      return 0;
    }
    // Truncate the longer string.
    if (text1_length > text2_length) {
      text1 = text1.substring(text1_length - text2_length);
    } else if (text1_length < text2_length) {
      text2 = text2.substring(0, text1_length);
    }
    var text_length = Math.min(text1_length, text2_length);
    // Quick check for the worst case.
    if (text1 == text2) {
      return text_length;
    }

    // Start by looking for a single character match
    // and increase length until no match is found.
    // Performance analysis: http://neil.fraser.name/news/2010/11/04/
    var best = 0;
    var length = 1;
    while (true) {
      var pattern = text1.substring(text_length - length);
      var found = text2.indexOf(pattern);
      if (found == -1) {
        return best;
      }
      length += found;
      if (
        found == 0 ||
        text1.substring(text_length - length) == text2.substring(0, length)
      ) {
        best = length;
        length++;
      }
    }
  };

  /**
   * Do the two texts share a substring which is at least half the length of the
   * longer text?
   * This speedup can produce non-minimal diffs.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     text1, the suffix of text1, the prefix of text2, the suffix of
   *     text2 and the common middle.  Or null if there was no match.
   * @private
   */
  diff.prototype.halfMatch_ = function (text1, text2) {
    if (this.Timeout <= 0) {
      // Don't risk returning a non-optimal diff if we have unlimited time.
      return null;
    }
    var longtext = text1.length > text2.length ? text1 : text2;
    var shorttext = text1.length > text2.length ? text2 : text1;
    if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
      return null; // Pointless.
    }
    var dmp = this; // 'this' becomes 'window' in a closure.

    /**
     * Does a substring of shorttext exist within longtext such that the substring
     * is at least half the length of longtext?
     * Closure, but does not reference any external variables.
     * @param {string} longtext Longer string.
     * @param {string} shorttext Shorter string.
     * @param {number} i Start index of quarter length substring within longtext.
     * @return {Array.<string>} Five element Array, containing the prefix of
     *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
     *     of shorttext and the common middle.  Or null if there was no match.
     * @private
     */
    function diff_halfMatchI_(longtext, shorttext, i) {
      // Start with a 1/4 length substring at position i as a seed.
      var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
      var j = -1;
      var best_common = "";
      var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
      while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
        var prefixLength = dmp.commonPrefix(
          longtext.substring(i),
          shorttext.substring(j)
        );
        var suffixLength = dmp.commonSuffix(
          longtext.substring(0, i),
          shorttext.substring(0, j)
        );
        if (best_common.length < suffixLength + prefixLength) {
          best_common =
            shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
          best_longtext_a = longtext.substring(0, i - suffixLength);
          best_longtext_b = longtext.substring(i + prefixLength);
          best_shorttext_a = shorttext.substring(0, j - suffixLength);
          best_shorttext_b = shorttext.substring(j + prefixLength);
        }
      }
      if (best_common.length * 2 >= longtext.length) {
        return [
          best_longtext_a,
          best_longtext_b,
          best_shorttext_a,
          best_shorttext_b,
          best_common,
        ];
      } else {
        return null;
      }
    }

    // First check if the second quarter is the seed for a half-match.
    var hm1 = diff_halfMatchI_(
      longtext,
      shorttext,
      Math.ceil(longtext.length / 4)
    );
    // Check again based on the third quarter.
    var hm2 = diff_halfMatchI_(
      longtext,
      shorttext,
      Math.ceil(longtext.length / 2)
    );
    var hm;
    if (!hm1 && !hm2) {
      return null;
    } else if (!hm2) {
      hm = hm1;
    } else if (!hm1) {
      hm = hm2;
    } else {
      // Both matched.  Select the longest.
      hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
    }

    // A half-match was found, sort out the return data.
    var text1_a, text1_b, text2_a, text2_b;
    if (text1.length > text2.length) {
      text1_a = hm[0];
      text1_b = hm[1];
      text2_a = hm[2];
      text2_b = hm[3];
    } else {
      text2_a = hm[0];
      text2_b = hm[1];
      text1_a = hm[2];
      text1_b = hm[3];
    }
    var mid_common = hm[4];
    return [text1_a, text1_b, text2_a, text2_b, mid_common];
  };

  /**
   * Reduce the number of edits by eliminating semantically trivial equalities.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   */
  diff.prototype.cleanupSemantic = function (diffs) {
    var changes = false;
    var equalities = []; // Stack of indices where equalities are found.
    var equalitiesLength = 0; // Keeping our own length var is faster in JS.
    /** @type {?string} */
    var lastequality = null;
    // Always equal to diffs[equalities[equalitiesLength - 1]][1]
    var pointer = 0; // Index of current position.
    // Number of characters that changed prior to the equality.
    var length_insertions1 = 0;
    var length_deletions1 = 0;
    // Number of characters that changed after the equality.
    var length_insertions2 = 0;
    var length_deletions2 = 0;
    while (pointer < diffs.length) {
      if (diffs[pointer][0] == DIFF_EQUAL) {
        // Equality found.
        equalities[equalitiesLength++] = pointer;
        length_insertions1 = length_insertions2;
        length_deletions1 = length_deletions2;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = diffs[pointer][1];
      } else {
        // An insertion or deletion.
        if (diffs[pointer][0] == DIFF_INSERT) {
          length_insertions2 += diffs[pointer][1].length;
        } else {
          length_deletions2 += diffs[pointer][1].length;
        }
        // Eliminate an equality that is smaller or equal to the edits on both
        // sides of it.
        if (
          lastequality &&
          lastequality.length <=
            Math.max(length_insertions1, length_deletions1) &&
          lastequality.length <= Math.max(length_insertions2, length_deletions2)
        ) {
          // Duplicate record.
          diffs.splice(equalities[equalitiesLength - 1], 0, [
            DIFF_DELETE,
            lastequality,
          ]);
          // Change second copy to insert.
          diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
          // Throw away the equality we just deleted.
          equalitiesLength--;
          // Throw away the previous equality (it needs to be reevaluated).
          equalitiesLength--;
          pointer =
            equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
          length_insertions1 = 0; // Reset the counters.
          length_deletions1 = 0;
          length_insertions2 = 0;
          length_deletions2 = 0;
          lastequality = null;
          changes = true;
        }
      }
      pointer++;
    }

    // Normalize the diff.
    if (changes) {
      this.cleanupMerge(diffs);
    }
    this.cleanupSemanticLossless(diffs);

    // Find any overlaps between deletions and insertions.
    // e.g: <del>abcxxx</del><ins>xxxdef</ins>
    //   -> <del>abc</del>xxx<ins>def</ins>
    // e.g: <del>xxxabc</del><ins>defxxx</ins>
    //   -> <ins>def</ins>xxx<del>abc</del>
    // Only extract an overlap if it is as big as the edit ahead or behind it.
    pointer = 1;
    while (pointer < diffs.length) {
      if (
        diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT
      ) {
        var deletion = diffs[pointer - 1][1];
        var insertion = diffs[pointer][1];
        var overlap_length1 = this.commonOverlap_(deletion, insertion);
        var overlap_length2 = this.commonOverlap_(insertion, deletion);
        if (overlap_length1 >= overlap_length2) {
          if (
            overlap_length1 >= deletion.length / 2 ||
            overlap_length1 >= insertion.length / 2
          ) {
            // Overlap found.  Insert an equality and trim the surrounding edits.
            diffs.splice(pointer, 0, [
              DIFF_EQUAL,
              insertion.substring(0, overlap_length1),
            ]);
            diffs[pointer - 1][1] = deletion.substring(
              0,
              deletion.length - overlap_length1
            );
            diffs[pointer + 1][1] = insertion.substring(overlap_length1);
            pointer++;
          }
        } else {
          if (
            overlap_length2 >= deletion.length / 2 ||
            overlap_length2 >= insertion.length / 2
          ) {
            // Reverse overlap found.
            // Insert an equality and swap and trim the surrounding edits.
            diffs.splice(pointer, 0, [
              DIFF_EQUAL,
              deletion.substring(0, overlap_length2),
            ]);
            diffs[pointer - 1][0] = DIFF_INSERT;
            diffs[pointer - 1][1] = insertion.substring(
              0,
              insertion.length - overlap_length2
            );
            diffs[pointer + 1][0] = DIFF_DELETE;
            diffs[pointer + 1][1] = deletion.substring(overlap_length2);
            pointer++;
          }
        }
        pointer++;
      }
      pointer++;
    }
  };

  /**
   * Look for single edits surrounded on both sides by equalities
   * which can be shifted sideways to align the edit to a word boundary.
   * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   */
  diff.prototype.cleanupSemanticLossless = function (diffs) {
    /**
     * Given two strings, compute a score representing whether the internal
     * boundary falls on logical boundaries.
     * Scores range from 6 (best) to 0 (worst).
     * Closure, but does not reference any external variables.
     * @param {string} one First string.
     * @param {string} two Second string.
     * @return {number} The score.
     * @private
     */
    function diff_cleanupSemanticScore_(one, two) {
      if (!one || !two) {
        // Edges are the best.
        return 6;
      }

      // Each port of this function behaves slightly differently due to
      // subtle differences in each language's definition of things like
      // 'whitespace'.  Since this function's purpose is largely cosmetic,
      // the choice has been made to use each language's native features
      // rather than force total conformity.
      var char1 = one.charAt(one.length - 1);
      var char2 = two.charAt(0);
      var nonAlphaNumeric1 = char1.match(diff.nonAlphaNumericRegex_);
      var nonAlphaNumeric2 = char2.match(diff.nonAlphaNumericRegex_);
      var whitespace1 = nonAlphaNumeric1 && char1.match(diff.whitespaceRegex_);
      var whitespace2 = nonAlphaNumeric2 && char2.match(diff.whitespaceRegex_);
      var lineBreak1 = whitespace1 && char1.match(diff.linebreakRegex_);
      var lineBreak2 = whitespace2 && char2.match(diff.linebreakRegex_);
      var blankLine1 = lineBreak1 && one.match(diff.blanklineEndRegex_);
      var blankLine2 = lineBreak2 && two.match(diff.blanklineStartRegex_);

      if (blankLine1 || blankLine2) {
        // Five points for blank lines.
        return 5;
      } else if (lineBreak1 || lineBreak2) {
        // Four points for line breaks.
        return 4;
      } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
        // Three points for end of sentences.
        return 3;
      } else if (whitespace1 || whitespace2) {
        // Two points for whitespace.
        return 2;
      } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
        // One point for non-alphanumeric.
        return 1;
      }
      return 0;
    }

    var pointer = 1;
    // Intentionally ignore the first and last element (don't need checking).
    while (pointer < diffs.length - 1) {
      if (
        diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL
      ) {
        // This is a single edit surrounded by equalities.
        var equality1 = diffs[pointer - 1][1];
        var edit = diffs[pointer][1];
        var equality2 = diffs[pointer + 1][1];

        // First, shift the edit as far left as possible.
        var commonOffset = this.commonSuffix(equality1, edit);
        if (commonOffset) {
          var commonString = edit.substring(edit.length - commonOffset);
          equality1 = equality1.substring(0, equality1.length - commonOffset);
          edit = commonString + edit.substring(0, edit.length - commonOffset);
          equality2 = commonString + equality2;
        }

        // Second, step character by character right, looking for the best fit.
        var bestEquality1 = equality1;
        var bestEdit = edit;
        var bestEquality2 = equality2;
        var bestScore =
          diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
        while (edit.charAt(0) === equality2.charAt(0)) {
          equality1 += edit.charAt(0);
          edit = edit.substring(1) + equality2.charAt(0);
          equality2 = equality2.substring(1);
          var score =
            diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
          // The >= encourages trailing rather than leading whitespace on edits.
          if (score >= bestScore) {
            bestScore = score;
            bestEquality1 = equality1;
            bestEdit = edit;
            bestEquality2 = equality2;
          }
        }

        if (diffs[pointer - 1][1] != bestEquality1) {
          // We have an improvement, save it back to the diff.
          if (bestEquality1) {
            diffs[pointer - 1][1] = bestEquality1;
          } else {
            diffs.splice(pointer - 1, 1);
            pointer--;
          }
          diffs[pointer][1] = bestEdit;
          if (bestEquality2) {
            diffs[pointer + 1][1] = bestEquality2;
          } else {
            diffs.splice(pointer + 1, 1);
            pointer--;
          }
        }
      }
      pointer++;
    }
  };

  // Define some regex patterns for matching boundaries.
  diff.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
  diff.whitespaceRegex_ = /\s/;
  diff.linebreakRegex_ = /[\r\n]/;
  diff.blanklineEndRegex_ = /\n\r?\n$/;
  diff.blanklineStartRegex_ = /^\r?\n\r?\n/;

  /**
   * Reduce the number of edits by eliminating operationally trivial equalities.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   */
  diff.prototype.cleanupEfficiency = function (diffs) {
    var changes = false;
    var equalities = []; // Stack of indices where equalities are found.
    var equalitiesLength = 0; // Keeping our own length var is faster in JS.
    /** @type {?string} */
    var lastequality = null;
    // Always equal to diffs[equalities[equalitiesLength - 1]][1]
    var pointer = 0; // Index of current position.
    // Is there an insertion operation before the last equality.
    var pre_ins = false;
    // Is there a deletion operation before the last equality.
    var pre_del = false;
    // Is there an insertion operation after the last equality.
    var post_ins = false;
    // Is there a deletion operation after the last equality.
    var post_del = false;
    while (pointer < diffs.length) {
      if (diffs[pointer][0] == DIFF_EQUAL) {
        // Equality found.
        if (
          diffs[pointer][1].length < this.EditCost &&
          (post_ins || post_del)
        ) {
          // Candidate found.
          equalities[equalitiesLength++] = pointer;
          pre_ins = post_ins;
          pre_del = post_del;
          lastequality = diffs[pointer][1];
        } else {
          // Not a candidate, and can never become one.
          equalitiesLength = 0;
          lastequality = null;
        }
        post_ins = post_del = false;
      } else {
        // An insertion or deletion.
        if (diffs[pointer][0] == DIFF_DELETE) {
          post_del = true;
        } else {
          post_ins = true;
        }
        /*
         * Five types to be split:
         * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
         * <ins>A</ins>X<ins>C</ins><del>D</del>
         * <ins>A</ins><del>B</del>X<ins>C</ins>
         * <ins>A</del>X<ins>C</ins><del>D</del>
         * <ins>A</ins><del>B</del>X<del>C</del>
         */
        if (
          lastequality &&
          ((pre_ins && pre_del && post_ins && post_del) ||
            (lastequality.length < this.EditCost / 2 &&
              pre_ins + pre_del + post_ins + post_del == 3))
        ) {
          // Duplicate record.
          diffs.splice(equalities[equalitiesLength - 1], 0, [
            DIFF_DELETE,
            lastequality,
          ]);
          // Change second copy to insert.
          diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
          equalitiesLength--; // Throw away the equality we just deleted;
          lastequality = null;
          if (pre_ins && pre_del) {
            // No changes made which could affect previous entry, keep going.
            post_ins = post_del = true;
            equalitiesLength = 0;
          } else {
            equalitiesLength--; // Throw away the previous equality.
            pointer =
              equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
            post_ins = post_del = false;
          }
          changes = true;
        }
      }
      pointer++;
    }

    if (changes) {
      this.cleanupMerge(diffs);
    }
  };

  /**
   * Reorder and merge like edit sections.  Merge equalities.
   * Any edit section can move as long as it doesn't cross an equality.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   */
  diff.prototype.cleanupMerge = function (diffs) {
    diffs.push([DIFF_EQUAL, ""]); // Add a dummy entry at the end.
    var pointer = 0;
    var count_delete = 0;
    var count_insert = 0;
    var text_delete = "";
    var text_insert = "";
    var commonlength;
    while (pointer < diffs.length) {
      switch (diffs[pointer][0]) {
        case DIFF_INSERT:
          count_insert++;
          text_insert += diffs[pointer][1];
          pointer++;
          break;
        case DIFF_DELETE:
          count_delete++;
          text_delete += diffs[pointer][1];
          pointer++;
          break;
        case DIFF_EQUAL:
          // Upon reaching an equality, check for prior redundancies.
          if (count_delete + count_insert > 1) {
            if (count_delete !== 0 && count_insert !== 0) {
              // Factor out any common prefixies.
              commonlength = this.commonPrefix(text_insert, text_delete);
              if (commonlength !== 0) {
                if (
                  pointer - count_delete - count_insert > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                    DIFF_EQUAL
                ) {
                  diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
                } else {
                  diffs.splice(0, 0, [
                    DIFF_EQUAL,
                    text_insert.substring(0, commonlength),
                  ]);
                  pointer++;
                }
                text_insert = text_insert.substring(commonlength);
                text_delete = text_delete.substring(commonlength);
              }
              // Factor out any common suffixies.
              commonlength = this.commonSuffix(text_insert, text_delete);
              if (commonlength !== 0) {
                diffs[pointer][1] =
                  text_insert.substring(text_insert.length - commonlength) +
                  diffs[pointer][1];
                text_insert = text_insert.substring(
                  0,
                  text_insert.length - commonlength
                );
                text_delete = text_delete.substring(
                  0,
                  text_delete.length - commonlength
                );
              }
            }
            // Delete the offending records and add the merged ones.
            if (count_delete === 0) {
              diffs.splice(
                pointer - count_insert,
                count_delete + count_insert,
                [DIFF_INSERT, text_insert]
              );
            } else if (count_insert === 0) {
              diffs.splice(
                pointer - count_delete,
                count_delete + count_insert,
                [DIFF_DELETE, text_delete]
              );
            } else {
              diffs.splice(
                pointer - count_delete - count_insert,
                count_delete + count_insert,
                [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]
              );
            }
            pointer =
              pointer -
              count_delete -
              count_insert +
              (count_delete ? 1 : 0) +
              (count_insert ? 1 : 0) +
              1;
          } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
            // Merge this equality with the previous one.
            diffs[pointer - 1][1] += diffs[pointer][1];
            diffs.splice(pointer, 1);
          } else {
            pointer++;
          }
          count_insert = 0;
          count_delete = 0;
          text_delete = "";
          text_insert = "";
          break;
      }
    }
    if (diffs[diffs.length - 1][1] === "") {
      diffs.pop(); // Remove the dummy entry at the end.
    }

    // Second pass: look for single edits surrounded on both sides by equalities
    // which can be shifted sideways to eliminate an equality.
    // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
    var changes = false;
    pointer = 1;
    // Intentionally ignore the first and last element (don't need checking).
    while (pointer < diffs.length - 1) {
      if (
        diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL
      ) {
        // This is a single edit surrounded by equalities.
        if (
          diffs[pointer][1].substring(
            diffs[pointer][1].length - diffs[pointer - 1][1].length
          ) == diffs[pointer - 1][1]
        ) {
          // Shift the edit over the previous equality.
          diffs[pointer][1] =
            diffs[pointer - 1][1] +
            diffs[pointer][1].substring(
              0,
              diffs[pointer][1].length - diffs[pointer - 1][1].length
            );
          diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
          diffs.splice(pointer - 1, 1);
          changes = true;
        } else if (
          diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]
        ) {
          // Shift the edit over the next equality.
          diffs[pointer - 1][1] += diffs[pointer + 1][1];
          diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
          diffs.splice(pointer + 1, 1);
          changes = true;
        }
      }
      pointer++;
    }
    // If shifts were made, the diff needs reordering and another shift sweep.
    if (changes) {
      this.cleanupMerge(diffs);
    }
  };

  /**
   * loc is a location in text1, compute and return the equivalent location in
   * text2.
   * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   * @param {number} loc Location within text1.
   * @return {number} Location within text2.
   */
  diff.prototype.xIndex = function (diffs, loc) {
    var chars1 = 0;
    var chars2 = 0;
    var last_chars1 = 0;
    var last_chars2 = 0;
    var x;
    for (x = 0; x < diffs.length; x++) {
      if (diffs[x][0] !== DIFF_INSERT) {
        // Equality or deletion.
        chars1 += diffs[x][1].length;
      }
      if (diffs[x][0] !== DIFF_DELETE) {
        // Equality or insertion.
        chars2 += diffs[x][1].length;
      }
      if (chars1 > loc) {
        // Overshot the location.
        break;
      }
      last_chars1 = chars1;
      last_chars2 = chars2;
    }
    // Was the location was deleted?
    if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
      return last_chars2;
    }
    // Add the remaining character length.
    return last_chars2 + (loc - last_chars1);
  };

  /**
   * Convert a diff array into a pretty HTML report.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   * @return {string} HTML representation.
   */
  diff.prototype.prettyHtml = function (diffs) {
    var html = [];
    var pattern_amp = /&/g;
    var pattern_lt = /</g;
    var pattern_gt = />/g;
    var pattern_br = /\n/g;
    for (var x = 0; x < diffs.length; x++) {
      var op = diffs[x][0]; // Operation (insert, delete, equal)
      var data = diffs[x][1]; // Text of change.
      var text = data
        .replace(pattern_amp, "&amp;")
        .replace(pattern_lt, "&lt;")
        .replace(pattern_gt, "&gt;")
        .replace(pattern_br, "<br/>");
      switch (op) {
        case DIFF_INSERT:
          html[x] = "<ins>" + text + "</ins>";
          break;
        case DIFF_DELETE:
          html[x] = "<del>" + text + "</del>";
          break;
        case DIFF_EQUAL:
          html[x] = "<span>" + text + "</span>";
          break;
      }
    }
    return html.join("");
  };

  /**
   * Compute and return the source text (all equalities and deletions).
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   * @return {string} Source text.
   */
  diff.prototype.text1 = function (diffs) {
    var text = [];
    for (var x = 0; x < diffs.length; x++) {
      if (diffs[x][0] !== DIFF_INSERT) {
        text[x] = diffs[x][1];
      }
    }
    return text.join("");
  };

  /**
   * Compute and return the destination text (all equalities and insertions).
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   * @return {string} Destination text.
   */
  diff.prototype.text2 = function (diffs) {
    var text = [];
    for (var x = 0; x < diffs.length; x++) {
      if (diffs[x][0] !== DIFF_DELETE) {
        text[x] = diffs[x][1];
      }
    }
    return text.join("");
  };

  /**
   * Compute the Levenshtein distance; the number of inserted, deleted or
   * substituted characters.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   * @return {number} Number of changes.
   */
  diff.prototype.levenshtein = function (diffs) {
    var levenshtein = 0;
    var insertions = 0;
    var deletions = 0;
    for (var x = 0; x < diffs.length; x++) {
      var op = diffs[x][0];
      var data = diffs[x][1];
      switch (op) {
        case DIFF_INSERT:
          insertions += data.length;
          break;
        case DIFF_DELETE:
          deletions += data.length;
          break;
        case DIFF_EQUAL:
          // A deletion and an insertion is one substitution.
          levenshtein += Math.max(insertions, deletions);
          insertions = 0;
          deletions = 0;
          break;
      }
    }
    levenshtein += Math.max(insertions, deletions);
    return levenshtein;
  };

  /**
   * Crush the diff into an encoded string which describes the operations
   * required to transform text1 into text2.
   * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
   * Operations are tab-separated.  Inserted text is escaped using %xx notation.
   * @param {!Array.<!diff.Diff>} diffs Array of diff tuples.
   * @return {string} Delta text.
   */
  diff.prototype.toDelta = function (diffs) {
    var text = [];
    for (var x = 0; x < diffs.length; x++) {
      switch (diffs[x][0]) {
        case DIFF_INSERT:
          text[x] = "+" + encodeURI(diffs[x][1]);
          break;
        case DIFF_DELETE:
          text[x] = "-" + diffs[x][1].length;
          break;
        case DIFF_EQUAL:
          text[x] = "=" + diffs[x][1].length;
          break;
      }
    }
    return text.join("\t").replace(/%20/g, " ");
  };

  /**
   * Given the original text1, and an encoded string which describes the
   * operations required to transform text1 into text2, compute the full diff.
   * @param {string} text1 Source string for the diff.
   * @param {string} delta Delta text.
   * @return {!Array.<!diff.Diff>} Array of diff tuples.
   * @throws {!Error} If invalid input.
   */
  diff.prototype.fromDelta = function (text1, delta) {
    var diffs = [];
    var diffsLength = 0; // Keeping our own length var is faster in JS.
    var pointer = 0; // Cursor in text1
    var tokens = delta.split(/\t/g);
    for (var x = 0; x < tokens.length; x++) {
      // Each token begins with a one character parameter which specifies the
      // operation of this token (delete, insert, equality).
      var param = tokens[x].substring(1);
      switch (tokens[x].charAt(0)) {
        case "+":
          try {
            diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
          } catch (ex) {
            // Malformed URI sequence.
            throw new Error("Illegal escape in diff_fromDelta: " + param);
          }
          break;
        case "-":
        // Fall through.
        case "=":
          var n = parseInt(param, 10);
          if (isNaN(n) || n < 0) {
            throw new Error("Invalid number in diff_fromDelta: " + param);
          }
          var text = text1.substring(pointer, (pointer += n));
          if (tokens[x].charAt(0) == "=") {
            diffs[diffsLength++] = [DIFF_EQUAL, text];
          } else {
            diffs[diffsLength++] = [DIFF_DELETE, text];
          }
          break;
        default:
          // Blank tokens are ok (from a trailing \t).
          // Anything else is an error.
          if (tokens[x]) {
            throw new Error(
              "Invalid diff operation in diff_fromDelta: " + tokens[x]
            );
          }
      }
    }
    if (pointer != text1.length) {
      throw new Error(
        "Delta length (" +
          pointer +
          ") does not equal source text length (" +
          text1.length +
          ")."
      );
    }
    return diffs;
  };

  // Export these global variables so that they survive Google's JS compiler.
  // In a browser, 'this' will be 'window'.
  // Users of node.js should 'require' the uncompressed version since Google's
  // JS compiler may break the following exports for non-browser environments.
  this["diff"] = diff;
  this["DIFF_DELETE"] = DIFF_DELETE;
  this["DIFF_INSERT"] = DIFF_INSERT;
  this["DIFF_EQUAL"] = DIFF_EQUAL;

  // module.exports = diff;
  return diff;
}

function getWordCount(text) {
  return text.split(" ").length;
  //   return text
  //     .replace(/[^\w\s]/gi, "")
  //     .split(" ")
  //     .filter(Boolean).length;
}

function cleanPromptFromText(text) {
  const prefix = "Proofread:";
  const lowerCaseText = text.toLowerCase();
  const divStart = '<div class="">';
  const divEnd = "</div>";

  if (lowerCaseText.startsWith(prefix.toLowerCase())) {
    text = text.substring(prefix.length).trim();
  }

  const startsWith = [
    "proofread ",
    "i want you to ",
    "rewrite ",
    "improve ",
    "fix ",
  ];
  startsWith.forEach(function (start) {
    if (text.toLowerCase().startsWith(start.toLowerCase())) {
      let endIndex = text.indexOf(":", start.length);
      text = text.substring(endIndex + 1);
    }
  });
  text = text.trim();

  if (text.startsWith(divStart)) {
    text = text.substring(divStart.length);
  }
  if (text.endsWith(divEnd)) {
    text = text.substring(0, text.length - divEnd.length);
  }

  return text;
}

function cleanResponseFromText(text) {
  const startsWith = [
    "Here's the corrected ",
    "Here's a corrected ",
    "Here's the proofread ",
    "Here's a proofread",
    "Here is a proofread",
    "Here's a possible revision",
  ];
  startsWith.forEach(function (start) {
    if (text.toLowerCase().startsWith(start.toLowerCase())) {
      let endIndex = text.indexOf(":", start.length);
      text = text.substring(endIndex + 1);
    }
  });
  text = text.trim();
  return removeQuotation(text);
}

function removeQuotation(str) {
  if (str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, str.length - 1);
  }
  return str;
}

function splitSubarray(arr) {
  let result = [];
  arr.forEach(function (subarr) {
    let value = subarr[0];
    let text = subarr[1];
    let lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (i === 0) {
        result.push([value, lines[i]]);
      } else {
        result.push([value, `\n${lines[i]}`]);
      }
    }
  });
  return result;
}
