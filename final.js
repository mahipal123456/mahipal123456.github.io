window.onload = function () {
    let consent = localStorage.getItem("cookie_consent");

    if (consent === "granted") {
        enableGA4(); // Load GA4 if already accepted
        loadClarity();
        document.getElementById("cookie-banner").style.display = "none";
    } else if (consent === "denied") {
        document.getElementById("cookie-banner").style.display = "none";
    } else {
        setTimeout(function () {
            document.getElementById("cookie-banner").style.display = "flex";
        }, 5000); // Show banner after 5 seconds
    }

    // Show "Manage Cookies" button if consent is given
    if (consent) {
        document.getElementById("manage-cookies").style.display = "block";
    }
};

// Accept Cookies and Enable GA4
function acceptCookies() {
    localStorage.setItem("cookie_consent", "granted");

    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });

    gtag('config', 'G-9N9V3HXNYT'); // Now track page views
    loadClarity();

    document.getElementById("cookie-banner").style.display = "none";
    document.getElementById("manage-cookies").style.display = "block"; // Show manage button
    console.log("Cookies accepted, GA4 tracking enabled.");
}

// Deny Cookies and Disable Tracking
function denyCookies() {
    localStorage.setItem("cookie_consent", "denied");

    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    document.getElementById("cookie-banner").style.display = "none";
    document.getElementById("manage-cookies").style.display = "block"; // Show manage button
    console.log("Cookies denied, GA4 tracking disabled.");
}

// Reopen Cookie Banner for Consent Management
function manageCookies() {
    document.getElementById("cookie-banner").style.display = "flex";
}
function loadClarity() {
    if (!window.clarity) { // Prevent multiple loads
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r); t.async=1; t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ork3584d36");
    }
}
// Enable GA4 if user has already accepted cookies
function enableGA4() {
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });

    gtag('config', 'G-9N9V3HXNYT'); // Start tracking
    console.log("GA4 Consent Granted and Initialized");
}


const quill = new Quill('#mixed-input', {
    modules: {
      syntax: true, // Enable syntax highlighting
      toolbar: '#toolbar-container', // Attach toolbar to the editor
    },
    placeholder: 'Compose an epic...', // Placeholder text
    theme: 'snow', // Snow theme for Quill
  });
  quill.on('text-change', function () {
    convertToHTML(); // Call your function whenever content changes
  });
// Navigationbar

function toggleNav() {
    const navList = document.querySelector('nav ul');
    // Toggle the display of the navbar
    if (navList.style.display === 'flex') {
      navList.style.display = 'none';
    } else {
      navList.style.display = 'flex';
    }
  }
  

        let imagesArray = [];

        function convertToHTML() {
            const mixedInput = document.querySelector('.ql-editor').innerHTML; 
            const outputContainer = document.getElementById('output-inner-container');
            
            // Clear any existing content in the output container
            while (outputContainer.firstChild) {
                outputContainer.removeChild(outputContainer.firstChild);
            }
            // Utility function to decode HTML entities
            function decodeHTMLEntities(text) {
                const textarea = document.createElement('textarea');
                textarea.innerHTML = text;
                return textarea.value;
            }
            
            // Split the input into chunks, recognizing LaTeX parts enclosed in $$
            const chunks = mixedInput.split(/\$(.*?)\$/g);
            
            chunks.forEach((chunk, index) => {
                if (index % 2 === 0) {
                    // Format spaces by replacing multiple spaces with non-breaking spaces
                    const formattedChunk = chunk.replace(/  +/g, match => Array(match.length).fill('\u00A0').join(''));
                    outputContainer.innerHTML += formattedChunk;
                } else {
                    // Handle LaTeX content
                    const katexSpan = document.createElement('span');
                    try {
                        // Decode HTML entities in LaTeX chunk before rendering
                        const rawLatex = decodeHTMLEntities(chunk);
                        katex.render(rawLatex, katexSpan, { throwOnError: false });
                        outputContainer.appendChild(katexSpan);
                    } catch (e) {
                        console.error('Error rendering LaTeX with KaTeX:', e);
                        const errorNode = document.createTextNode(chunk);
                        outputContainer.appendChild(errorNode);
                    }
                }
            });
            
            let outputHtml = outputContainer.innerHTML;
            const imgRegex = /img(\d+)/g;
            
            let match;
            while ((match = imgRegex.exec(outputHtml)) !== null) {
                const imgIndex = parseInt(match[1]) - 1;
                if (imagesArray[imgIndex]) {
                    outputHtml = outputHtml.replace(match[0], imagesArray[imgIndex].outerHTML);
                }
            }
            
            outputContainer.innerHTML = outputHtml;
        }
        
        





        // Define a function to change CSS properties
        function changeCSSProperty(property, value, elementIds) {
            elementIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.style[property] = value;
                }
            });
        }

        // Use event delegation to handle input changes
        document.addEventListener('input', function(event) {
            var target = event.target;
            if (target.matches('#font-size-input')) {
                changeCSSProperty('fontSize', target.value + 'px', ['output-inner-container','left-margin']);
                
            } else if (target.matches('#font-color-input')) {
                changeCSSProperty('color', target.value, ['output-inner-container','left-margin','top-margin']);
            } else if (target.matches('#letter-spacing-input')) {
                changeCSSProperty('letterSpacing', target.value + 'px', ['output-inner-container','left-margin','top-margin']);
            } else if (target.matches('#word-spacing-input')) {
                changeCSSProperty('wordSpacing', target.value + 'px', ['output-inner-container','left-margin','top-margin']);
            } else if (target.matches('#background-color-input')) {
                changeCSSProperty('backgroundColor', target.value, ['shadow-effect']);
            } else if (target.matches('#margin-top-input')) {
                changeCSSProperty('marginTop', target.value + 'px', ['output-inner-container','left-margin']);
            } else if (target.matches('#margin-left-input')) {
                changeCSSProperty('marginLeft', target.value + 'px', ['output-inner-container']);
            } else if (target.matches('#quality-input')) {
                quality = parseFloat(target.value) || 1.0;
            } else if (target.matches('#line-spacing-text-input')) {
                changeCSSProperty('lineHeight', target.value + 'px', ['output-inner-container','left-margin']);
            } else if (target.matches('#line-spacing-input')) {
                document.getElementById('content_page').style.backgroundSize = `100% ${target.value}px`;
            }else if (target.matches('#height-input')) {
                changeCSSProperty('height', target.value + '%', ['box']);
            }else if (target.matches('#width-input')) {
                changeCSSProperty('width', target.value + '%', ['subbox','left-margin']);
            }else if (target.matches('#top-margin-font-size-input')) {
                changeCSSProperty('fontSize', target.value + 'px', ['top-margin']);
            }

        });

        // Toggle left margin
        let leftMarginOn = true;
        let topMarginOn = true;
        function toggleLeftMargin() {
            leftMarginOn = !leftMarginOn;
            //document.getElementById('toggle-left-margin').textContent = 'Left Margin: ' + (leftMarginOn ? 'ON' : 'OFF');
            var leftMargin = document.getElementById('left-margin');
           
            var topMargin = document.getElementById('top-margin');
            var subbox = document.getElementById('subbox');
            var outputcontainer = document.getElementById('output-container');
            
            // // Toggle left border on output container
            // outputcontainer.style.borderLeft = leftMarginOn ? '2px solid #00000066' : 'none';

            // // Toggle bottom and left border on top-margin
            // // topMargin.style.borderBottom = leftMarginOn ?  '1px solid #00000066': 'none';
            // topMargin.style.borderLeft = leftMarginOn ?  '2px solid #00000066': 'none';

            // // Toggle bottom border on subbox
            // subbox.style.borderBottom = leftMarginOn ?  '1px solid #00000066': 'none';

            if (leftMargin.style.display === 'none' && subbox.style.display === 'none') {
                leftMargin.style.display = 'block';
                subbox.style.display = 'block';
            } else {
                leftMargin.style.display = 'none';
                subbox.style.display = 'none';
            }
        }

        // Initial states
let isLeftBorderOn = true;
let isTopBorderOn = true;

        // Toggle top margin
        function toggleTopMargin() {
            topMarginOn = !topMarginOn;
            //document.getElementById('toggle-top-margin').textContent = 'Top Margin: ' + (topMarginOn ? 'ON' : 'OFF');
            var topMargin = document.getElementById('box');
            topMargin.style.display = topMargin.style.display === 'none' ? 'flex' : 'none';
        }
        // Toggle left border
        function toggleLeftBorder() {
            isLeftBorderOn = !isLeftBorderOn;
        
            // Get DOM elements
            var outputContainer = document.getElementById('output-container');
            var topMargin = document.getElementById('top-margin');
        
            // Toggle left border on output container
            outputContainer.style.borderLeft = isLeftBorderOn ? '2px solid #00000066' : 'none';
        
            // Toggle left border on top margin
            topMargin.style.borderLeft = isLeftBorderOn ? '2px solid #00000066' : 'none';
        }
        
        // Toggle top border
        function toggleTopBorder() {
            isTopBorderOn = !isTopBorderOn;
        
            // Get DOM elements
            var topMargin = document.getElementById('top-margin');
            var subbox = document.getElementById('subbox');
        
            // Toggle bottom border on top margin
            topMargin.style.borderBottom = isTopBorderOn ? '1px solid #00000066' : 'none';
        
            // Toggle bottom border on subbox
            subbox.style.borderBottom = isTopBorderOn ? '1px solid #00000066' : 'none';
        }
        


        // Toggle background image
        function toggleBackground() {
            var content_page = document.getElementById('content_page');
            var bgToggle = document.getElementById('bg-toggle');

            content_page.style.backgroundImage = bgToggle.checked ? 'linear-gradient(#00000066  0.05em, transparent 0.1em)' : 'none';
        }
        function Shadow() {
            var heading_page = document.getElementById('heading_page');
            var effect = document.getElementById('shadow');

            heading_page.style.background = effect.checked ? 'linear-gradient(-75deg, rgb(0 0 0 / 40%), rgb(0 0 0 / 0%))' : 'none';
        }

        function changeBackgroundImage() {
            var input = document.getElementById('background-image-input');
            var file = input.files[0];
            var reader = new FileReader();
            document.getElementById('remove-button').style.display = 'block';

            reader.onload = function(e) {
                var backgroundImage = e.target.result;
                document.getElementById('shadow-effect').style.backgroundImage = "url('" + backgroundImage + "')";
            };

            reader.readAsDataURL(file);
        }

        function removeBackgroundImage() {
            document.getElementById('shadow-effect').style.backgroundImage = 'none';
            
            document.getElementById('background-image-input').value = ''; // Clear the file input
            document.getElementById('remove-button').style.display = 'none'; // Hide the remove button
        }
        // Function to apply the custom font to MathJax elements


var customFontUploaded = false;
var uploadedFontFamily = '';

// Function to apply custom font to MathJax elements
function applyCustomFontToMathJax(font, fallbackfont) {
    var effectiveFont = customFontUploaded ? uploadedFontFamily : font;
    var useDefaultMathFont = document.getElementById('default-math-font-checkbox').checked;

    var mathJaxElements = document.querySelectorAll('.katex .mathdefault,.katex .mathnormal,.katex .op-symbol.small-op,.katex,.katex .mathbf,.katex .delimsizing.size2');
    mathJaxElements.forEach(function(element) {
        if (useDefaultMathFont) {
            element.style.fontFamily ='CustomFont, KaTeX_Main';
        } else {
            element.style.fontFamily = effectiveFont + fallbackfont;
        }
    });
}
function toggleMathFont() {
    document.getElementById('default-math-font-checkbox').addEventListener('change', function() {
        const isChecked = this.checked;
        const elements = document.querySelectorAll('.katex .mathdefault,.katex .mathnormal,.katex .op-symbol.small-op,.katex,.katex .mathbf,.katex .delimsizing.size2');
        elements.forEach(element => {
            if (isChecked) {
                element.style.fontFamily = 'customFont, KaTeX_Main';
            } 
        });
    });
}
function changeFontfile(elementId, fontFamily) {
    var fileInput = document.getElementById('font-file-input');
    if (!fileInput.files[0]) {
        alert('Please upload a font file first.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var fontData = e.target.result;

        // Convert ArrayBuffer to Base64 for CSS @font-face
        var base64FontData = arrayBufferToBase64(fontData);
        var fontFaceRule = `
            @font-face {
                font-family: '${fontFamily}';
                src: url(data:font/truetype;base64,${base64FontData}) format('truetype');
            }
        `;

        // Remove previous custom font-face rule if any
        if (window.customFontStyle) {
            window.customFontStyle.remove();
        }

        // Create a new style element to inject @font-face rule
        var style = document.createElement('style');
        style.innerHTML = fontFaceRule;
        document.head.appendChild(style);
        window.customFontStyle = style;  // Store the new custom font style

        // Apply the new font to the specified element
        var element = document.getElementById(elementId);
        if (element) {
            element.style.fontFamily = fontFamily;
        }

        // Apply custom font to MathJax elements (if needed)
// Apply custom font to MathJax elements, with custom font first and KaTeX as fallback
        applyCustomFontToMathJax(fontFamily +  ', CustomFont',', KaTeX_Main' );

        // Set the font for the output container and heading page
        var outputContainer = document.getElementById('output-inner-container');
        var heading_page = document.getElementById('heading_page');
        outputContainer.style.fontFamily = fontFamily +  ', CustomFont',', KaTeX_Main';
        heading_page.style.fontFamily = fontFamily +  ', CustomFont',', KaTeX_Main';

        // Hook into MathJax rendering events
        quill.on('text-change', function() {
            applyCustomFontToMathJax(fontFamily +  ', CustomFont',', KaTeX_Main' );
          });
    
        // Reset file input to clear the previously uploaded file
        fileInput.value = "";
    };

    reader.readAsArrayBuffer(fileInput.files[0]);
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function changeFontFamily() {
    var fontFamilySelect = document.getElementById('font-family-select');
    var selectedFont = fontFamilySelect.options[fontFamilySelect.selectedIndex].value;

    // Reset the custom font flag if a new font is selected from the dropdown
    customFontUploaded = false;
    uploadedFontFamily = '';

    // Clear the file input
    var fileInput = document.getElementById('font-file-input');
    fileInput.value = '';

    // Apply selected font to MathJax elements
    applyCustomFontToMathJax(selectedFont +  ', CustomFont',', KaTeX_Main' );

    // Also, set the font for the output container and heading page
    var outputContainer = document.getElementById('output-inner-container');
    var heading_page = document.getElementById('heading_page');
    outputContainer.style.fontFamily = selectedFont + ', CustomFont',', KaTeX_Main';
    heading_page.style.fontFamily = selectedFont +  ', CustomFont',', KaTeX_Main';
    quill.on('text-change', function() {
        applyCustomFontToMathJax(selectedFont +  ', CustomFont',', KaTeX_Main' );
      });

    
}


document.addEventListener('DOMContentLoaded', changeFontFamily());


//to cntrol screeshot scroll problem 
const container = document.getElementById('content_page');
const lineSpacingInput = document.getElementById('line-spacing-input');

// Function to get the scroll step value
function getScrollStep() {
    const value = parseInt(lineSpacingInput.value, 10);
    
    // Use 20 as the default if the screen width is less than 900px, otherwise use 23
    const defaultStep = window.innerWidth < 900 ? 20 : 23;
    
    return isNaN(value) ? defaultStep : value;
}

// Add a scroll event listener
container.addEventListener('scroll', () => {
  const step = getScrollStep(); // Get the current scroll step
  const scrollTop = container.scrollTop;

  // Calculate the nearest step
  const nearestStep = Math.round(scrollTop / step) * step;

  // Set the container's scrollTop to the nearest step
  if (scrollTop !== nearestStep) {
    container.scrollTo({
      top: nearestStep,
    });
  }
});





        var imageQueue = []; // Array to store generated images
        var quality = 5.0; // Initial quality value

        // Global variable to track if the alert has been shown
let highQualityAlertShown = false;

function changeQuality() {
    var qualityInput = document.getElementById('quality-input').value;
    var quality = parseFloat(qualityInput) || 1.0;

    // Check if the quality value exceeds the maximum limit
    if (quality > 20) {
        alert('Maximum quality is 20.');
        quality = 20; // Set quality to maximum allowed value
        highQualityAlertShown = false; // Reset the flag when exceeding max quality
    } 
    // Check if the quality value is high
    else if (quality > 5) {
        if (!highQualityAlertShown) { // Show alert only once
            alert('High quality may take generating image up to 1 minute.');
            highQualityAlertShown = true; // Set the flag to true after showing the alert
        }
    } else {
        // Reset the flag if the quality is 5 or lower
        highQualityAlertShown = false;
    }

    // Optional: Update quality in a global or higher scope variable if needed
    // qualityVariable = quality; // Uncomment and define qualityVariable elsewhere if needed
}

        

// function generateAndPreview() {
//     // Select the canvas element by its ID
//     const canvas = document.getElementById('drawing-canvas');
//     const button = document.getElementById('generate_image');
    
//     // Change the button text to "Generating..."
//     button.textContent = "Generating...";
//     button.disabled = true; // Disable the button during processing

//     // Set the border to 'none' dynamically
//     canvas.style.border = 'none';

//     // Perform the shadow effect if the checkbox is checked
//     const shadowBox = document.getElementById('shadow').checked;
//     if (shadowBox) {
//         const randomAngle = Math.floor(Math.random() * 360);
//         const target = document.getElementById('heading_page');
//         target.style.background = `linear-gradient(${randomAngle}deg, rgb(0 0 0 / 40%), rgb(0 0 0 / 0%))`;
//     }

//     var textElement = document.getElementById('images-store-container-text');
//     if (textElement) {
//         // Remove the text element
//         textElement.remove();
//     }

//     var containerWrapper = document.getElementById('shadow-effect');
//     var imageQueueContainer = document.getElementById('images-store-container');

//     // Use html2canvas to capture the containerWrapper content
//     html2canvas(containerWrapper, { scale: quality }).then(function (canvas) {
//         // Create a new image object from the canvas
//         var newImage = new Image();
//         newImage.src = canvas.toDataURL();

//         // Create a container for the new image and its download button
//         var imageContainer = document.createElement('div');
//         imageContainer.classList.add('image-container');

//         // Create a cross sign for removing the image
//         var crossSign = document.createElement('div');
//         crossSign.textContent = '✖';
//         crossSign.classList.add('buttontype_2');
//         crossSign.onclick = function () {
//             removeImage(imageContainer, newImage);
//         };

//         // Create a download button for the new image
//         var downloadButton = document.createElement('button');
//         downloadButton.textContent = 'Download Image ' + imageQueue.length;
//         downloadButton.classList.add('buttontype_2');
//         downloadButton.onclick = function () {
//             downloadImage(newImage, 'container_image_' + imageQueue.length + '.png');
//         };

//         // Create a preview image for the new image
//         var previewImage = new Image();
//         previewImage.src = canvas.toDataURL();
//         previewImage.classList.add('preview-image');
//         previewImage.onclick = function () {
//             openImageInNewTab(newImage.src);
//         };

//         // Create a container for the move left and move right buttons
//         var moveButtonsContainer = document.createElement('div');
//         moveButtonsContainer.classList.add('button-container');

//         // Create buttons for moving left and right
//         var moveLeftButton = document.createElement('button');
//         moveLeftButton.textContent = '←';
//         moveLeftButton.classList.add('buttontype_2');
//         moveLeftButton.onclick = function () {
//             moveImageLeft(imageContainer);
//         };

//         var moveRightButton = document.createElement('button');
//         moveRightButton.textContent = '→';
//         moveRightButton.classList.add('buttontype_2');
//         moveRightButton.onclick = function () {
//             moveImageRight(imageContainer);
//         };

//         // Append the move buttons to the container
//         moveButtonsContainer.appendChild(moveLeftButton);
//         moveButtonsContainer.appendChild(moveRightButton);

//         // Append the preview image, move buttons, cross sign, and download button to the container
//         imageContainer.appendChild(crossSign);
//         imageContainer.appendChild(previewImage);
//         imageContainer.appendChild(moveButtonsContainer); // Append the move buttons container
//         imageContainer.appendChild(downloadButton);

//         // Append the container to the queue container
//         imageQueueContainer.appendChild(imageContainer);

//         // Add the new image to the queue
//         imageQueue.push(newImage);

//         // Add a shadow effect to the image container
//         imageContainer.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
        
//         // Re-enable the button after the image is generated
//         button.textContent = "Generate Image";
//         button.disabled = false; // Re-enable the button after processing
//     });

//     // Set the border back to '1px solid black' after processing
//     canvas.style.border = '1px solid black';
// }
function generateAndPreview() {
    // Select the canvas element by its ID
    const canvas = document.getElementById('drawing-canvas');
    const button = document.getElementById('generate_image');

    // Change the button text to "Generating..."
    document.getElementById('loader').style.display = 'block';

    // Set the border to 'none' dynamically
    canvas.style.border = 'none';
    setTimeout(() => {
        //shadow effect 
        const shadowBox = document.getElementById('shadow').checked;
        if (shadowBox) {
            const randomAngle = Math.floor(Math.random() * 360);
            const target = document.getElementById('heading_page');
            target.style.background = `linear-gradient(${randomAngle}deg, rgb(0 0 0 / 40%), rgb(0 0 0 / 0%))`;
        }
        var textElement = document.getElementById('images-store-container-text');
        if (textElement) {
            // Remove the text element
            textElement.remove();
        }
        var containerWrapper = document.getElementById('shadow-effect');
        // containerWrapper.style.border = 'none';
        var imageQueueContainer = document.getElementById('images-store-container');

        html2canvas(containerWrapper, { scale: quality }).then(function (canvas) {
            // Create a new image object
            var newImage = new Image();
            newImage.src = canvas.toDataURL();

            // Create a container for the new image and its download button
            var imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            // Create a cross sign for removing the image
            var crossSign = document.createElement('div');
            crossSign.textContent = '✖';
            crossSign.classList.add('buttontype_2');
            crossSign.onclick = function () {
                removeImage(imageContainer, newImage);
            };

            // Create a download button for the new image
            var downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download Image ' + imageQueue.length;
            downloadButton.classList.add('buttontype_2');
            downloadButton.onclick = function () {
                downloadImage(newImage, 'container_image_' + imageQueue.length + '.png');
            };

            // Create a preview image for the new image
            var previewImage = new Image();
            previewImage.src = canvas.toDataURL();
            previewImage.classList.add('preview-image');
            previewImage.onclick = function () {
                openImageInNewTab(newImage.src);
            };

            // Create a container for the move left and move right buttons
            var moveButtonsContainer = document.createElement('div');
            moveButtonsContainer.classList.add('button-container');

            // Create buttons for moving left and right
            var moveLeftButton = document.createElement('button');
            moveLeftButton.textContent = '←';
            moveLeftButton.classList.add('buttontype_2');
            moveLeftButton.onclick = function () {
                moveImageLeft(imageContainer);
            };

            var moveRightButton = document.createElement('button');
            moveRightButton.textContent = '→';
            moveRightButton.classList.add('buttontype_2');
            moveRightButton.onclick = function () {
                moveImageRight(imageContainer);
            };

            // Append the move buttons to the container
            moveButtonsContainer.appendChild(moveLeftButton);
            moveButtonsContainer.appendChild(moveRightButton);

            // Append the preview image, move buttons, cross sign, and download button to the container
            imageContainer.appendChild(crossSign);
            imageContainer.appendChild(previewImage);
            imageContainer.appendChild(moveButtonsContainer); // Append the move buttons container
            imageContainer.appendChild(downloadButton);

            // Append the container to the queue container
            imageQueueContainer.appendChild(imageContainer);

            // Add the new image to the queue
            imageQueue.push(newImage);

            // Add a shadow effect to the image container
            imageContainer.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
            // containerWrapper.style.border = "1px solid black";
            document.getElementById('loader').style.display = 'none';
            document.getElementById('drawing-canvas').style.border = '1px solid black';
            
        });
    }, 1000); 
    
}

        function removeImage(imageContainer, image) {
            var index = imageQueue.indexOf(image);
            if (index !== -1) {
                // Remove the image from the array
                imageQueue.splice(index, 1);
                // Remove the image container from the queue container
                imageContainer.remove();

                // Check if the queue is empty
                if (imageQueue.length === 0) {
                    var imageQueueContainer = document.getElementById('images-store-container');
                    var textElement = document.createElement('p');
                    textElement.id = 'images-store-container-text';
                    textElement.textContent = 'Click "Generate Image" Button to generate new image';
                    imageQueueContainer.appendChild(textElement);
                }
            }
        }



        function moveImageLeft(imageContainer) {
            var currentIndex = Array.from(imageContainer.parentNode.children).indexOf(imageContainer);
            if (currentIndex > 0) {
                imageContainer.parentNode.insertBefore(imageContainer, imageContainer.parentNode.children[currentIndex - 1]);
                // Swap the images in the queue
                [imageQueue[currentIndex], imageQueue[currentIndex - 1]] = [imageQueue[currentIndex - 1], imageQueue[currentIndex]];
            }
        }

        function moveImageRight(imageContainer) {
            var currentIndex = Array.from(imageContainer.parentNode.children).indexOf(imageContainer);
            if (currentIndex < imageQueue.length - 1) {
                imageContainer.parentNode.insertBefore(imageContainer, imageContainer.parentNode.children[currentIndex + 2]);
                // Swap the images in the queue
                [imageQueue[currentIndex], imageQueue[currentIndex + 1]] = [imageQueue[currentIndex + 1], imageQueue[currentIndex]];
            }
        }

        function clearAllImages() {
            var imageQueueContainer = document.getElementById('images-store-container');
            imageQueueContainer.innerHTML = '<p id="images-store-container-text">Click "Generate Image" Button to generate new image</p>';
            imageQueue = [];
        }


        function downloadImage(image, fileName) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        
            canvas.toBlob(function(blob) {
                // Creating a blob URL
                var blobURL = URL.createObjectURL(blob);
        
                // Create a link and simulate a user click on it
                var link = document.createElement('a');
                link.href = blobURL;
                link.download = fileName;
        
                // For mobile devices: Make sure the link is added to the DOM and user interacts with it
                document.body.appendChild(link);
                
                // Try triggering the click manually
                link.click();
                
                // Cleanup: Remove the link from the DOM and revoke the object URL
                document.body.removeChild(link);
                URL.revokeObjectURL(blobURL);
            }, 'image/png');
        }


        function openImageInNewTab(imageSrc) {
            var newTab = window.open();
            newTab.document.body.innerHTML = '<img src="' + imageSrc + '" style="height: 90%;">';
        }
        
        // function generatePDF() {
        //     // Check if there are any images in the imageQueue
        //     if (imageQueue.length === 0) {
        //         alert("There are no images to generate a PDF. Please add images before generating.");
        //         return; // Exit the function if there are no images
        //     }
        
        //     // Show the loader before starting the PDF generation
        //     document.getElementById('loader').style.display = 'block';
        
        //     // Delay the PDF generation by a few milliseconds to allow the loader to show up
        //     setTimeout(function () {
        //         // Create a new jsPDF instance
        //         var { jsPDF } = jspdf;
        //         var pdf = new jsPDF({
        //             orientation: 'landscape', // Set the orientation to landscape
        //             unit: 'px', // Use pixels as the unit
        //             format: 'a4' // Set the format to A4
        //         });
        
        //         var pageWidth = pdf.internal.pageSize.getWidth();
        //         var pageHeight = pdf.internal.pageSize.getHeight();
        
        //         // Loop through each image in the imageQueue
        //         imageQueue.forEach(function (image, index) {
        //             // Add a new page for each image
        //             if (index > 0) {
        //                 pdf.addPage();
        //             }
        
        //             // Calculate aspect ratio and set dimensions
        //             var aspectRatio = image.width / image.height;
        //             var maxWidth = pageWidth * 0.8; // 80% of the page width
        //             var maxHeight = maxWidth / aspectRatio;
        
        //             // Check if the image height exceeds the page height
        //             if (maxHeight > pageHeight) {
        //                 maxHeight = pageHeight;
        //                 maxWidth = maxHeight * aspectRatio;
        //             }
        
        //             // Calculate x and y positions to center the image
        //             var x = (pageWidth - maxWidth) / 2;
        //             var y = (pageHeight - maxHeight) / 2;
        
        //             // Compress the image before adding it to the PDF
        //             var canvas = document.createElement('canvas');
        //             var ctx = canvas.getContext('2d');
        //             canvas.width = image.width;
        //             canvas.height = image.height;
        //             ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        //             var compressedImage = canvas.toDataURL('image/jpeg', 0.5); // 50% quality JPEG
        
        //             // Add the image to the PDF with calculated dimensions and positions
        //             pdf.addImage(compressedImage, 'JPEG', x, y, maxWidth, maxHeight);
        //         });
        
        //         // Save the PDF
        //         pdf.save('document.pdf');
        
        //         // Hide the loader after the PDF is generated
        //         document.getElementById('loader').style.display = 'none';
        
        //     }, 0); // Use a timeout to allow the loader to display first
        // }
        function generatePDF() {
            // Check if there are any images in the imageQueue
            if (imageQueue.length === 0) {
                alert("There are no images to generate a PDF. Please add images before generating.");
                return; // Exit the function if there are no images
            }
        
            // Show the loader before starting the PDF generation
            document.getElementById('loader').style.display = 'block';
        
            // Delay the PDF generation by a few milliseconds to allow the loader to show up
            setTimeout(function () {
                // Create a new jsPDF instance
                var { jsPDF } = jspdf;
                var pdf = new jsPDF({
                    orientation: 'landscape', // Set the orientation to landscape
                    unit: 'px', // Use pixels as the unit
                    format: 'a4' // Set the format to A4
                });
        
                var pageWidth = pdf.internal.pageSize.getWidth();
                var pageHeight = pdf.internal.pageSize.getHeight();
        
                // Loop through each image in the imageQueue
                imageQueue.forEach(function (image, index) {
                    // Add a new page for each image
                    if (index > 0) {
                        pdf.addPage();
                    }
        
                    // Calculate aspect ratio and set dimensions
                    var aspectRatio = image.width / image.height;
                    var maxWidth = pageWidth * 0.8; // 80% of the page width
                    var maxHeight = maxWidth / aspectRatio;
        
                    // Check if the image height exceeds the page height
                    if (maxHeight > pageHeight) {
                        maxHeight = pageHeight;
                        maxWidth = maxHeight * aspectRatio;
                    }
        
                    // Calculate x and y positions to center the image
                    var x = (pageWidth - maxWidth) / 2;
                    var y = (pageHeight - maxHeight) / 2;
        
                    // Compress the image before adding it to the PDF
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    var compressedImage = canvas.toDataURL('image/jpeg', 0.5); // 50% quality JPEG
        
                    // Add the image to the PDF with calculated dimensions and positions
                    pdf.addImage(compressedImage, 'JPEG', x, y, maxWidth, maxHeight);
                });
        
                // Create a Blob object from the PDF output
                var pdfBlob = pdf.output('blob');
        
                // Create a download link for the Blob and trigger a download
                var link = document.createElement('a');
                link.href = URL.createObjectURL(pdfBlob);  // Create an object URL for the Blob
                link.download = 'document.pdf';  // Set the filename for the download
                link.click();  // Programmatically click the link to trigger the download
        
                // Hide the loader after the PDF is generated
                document.getElementById('loader').style.display = 'none';
        
            }, 100); // Use a timeout to allow the loader to display first
        }
        
        

        let isDrawingMode = false; // Start with customization mode
        function toggleMode() {
            const drawingContainer = document.getElementById('drawing-controls');
            const customizationBoxes = document.querySelectorAll('.input-box:not(#drawing-controls)');
            const toggleButton = document.getElementById('toggle-mode-button');
            const canvas_top = document.getElementById('drawing-canvas');
        
            if (isDrawingMode) {
                // Switch to Customization mode
                drawingContainer.style.display = 'none'; // Hide drawing container
                customizationBoxes.forEach(box => box.style.display = 'block'); // Show all other boxes
                toggleButton.innerText = 'Switch to Drawing';
                canvas_top.style.zIndex = '-10000';
                canvas_top.style.display = 'none'; // Hide the canvas in Customization mode
            } else {
                // Switch to Drawing mode
                drawingContainer.style.display = 'block'; // Show drawing container
                customizationBoxes.forEach(box => box.style.display = 'none'); // Hide all other boxes
                toggleButton.innerText = 'Switch to Customization';
                canvas_top.style.zIndex = '1';
                canvas_top.style.display = 'block'; // Show the canvas in Drawing mode
            }
        
            isDrawingMode = !isDrawingMode; // Toggle mode state
        }
        




            
        const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let startX, startY, lastX, lastY;
let drawingColor = '#000f64';
let drawingSize = 4;

let selectedTool = 'pen';
let undoStack = [];
let redoStack = [];
let snapshot;
let images = [];
//let imagesArray = [];

function setCanvasSize() {
    const drawingContainer = document.querySelector('#shadow-effect');
    const containerWidth = drawingContainer.clientWidth;
    const containerHeight = drawingContainer.clientHeight;

    const canvasWidthSlider = document.getElementById('canvas-width');
    const canvasHeightSlider = document.getElementById('canvas-height');

    const canvasWidth = canvasWidthSlider.valueAsNumber * containerWidth / 100;
    const canvasHeight = canvasHeightSlider.valueAsNumber * containerHeight / 100;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}


// Call setCanvasSize initially to set the canvas size when the page loads
setCanvasSize();

// Add event listeners to update the canvas size when the sliders are adjusted
document.getElementById('canvas-width').addEventListener('input', setCanvasSize);
document.getElementById('canvas-height').addEventListener('input', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


// Function to adjust canvas and update slider values based on container size
function adjustCanvasToContainer() {
    const shadowEffect = document.getElementById('shadow-effect');
    const canvas = document.getElementById('drawing-canvas');
    
    // Get the container size
    const containerWidth = shadowEffect.clientWidth;
    const containerHeight = shadowEffect.clientHeight;

    // Adjust the canvas size
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    console.log(`Canvas adjusted to: ${canvas.width}x${canvas.height}`);

    // Update the sliders to reflect the new container size as a percentage
    const canvasWidthSlider = document.getElementById('canvas-width');
    const canvasHeightSlider = document.getElementById('canvas-height');

    canvasWidthSlider.value = (canvas.width / containerWidth) * 100;
    canvasHeightSlider.value = (canvas.height / containerHeight) * 100;
}

// Observe container resizing
const shadowEffect = document.getElementById('shadow-effect');
const resizeObserver = new ResizeObserver(() => {
    adjustCanvasToContainer();
});
resizeObserver.observe(shadowEffect);

// Initial adjustment
adjustCanvasToContainer();


function openColorPicker() {
    var colorInput = document.getElementById("drawing-color");
    colorInput.click();
}

// function openDrawingContainer() {
//     alert('Before drawing and adding images to the page, ensure that your page parameters are fixed, like page size and line spacing. Changing these after adding images may distort your page structure');
//     document.getElementById('drawing_popup').style.display = 'flex';
//     setCanvasSize();
// }

// function closePopup() {
//     document.getElementById('drawing_popup').style.display = 'none';
// }

function changeDrawingColor(color) {
    drawingColor = color;
}
// Add an event listener to the color input element
document.getElementById("drawing-color").addEventListener('input', function(event) {
    changeDrawingColor(event.target.value);
});
function shape(shape) {
    selectedTool = shape;
}

function changeDrawingSize(size) {
    drawingSize = size;
}

function clearDrawing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = [];
    redoStack = [];
    images = [];
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push(canvas.toDataURL());
        const lastAction = undoStack.pop();
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = lastAction;
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(canvas.toDataURL());
        const lastAction = redoStack.pop();
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = lastAction;
    }
}

function saveDrawing() {
    const imgData = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'drawing.png';
    link.click();
}

const startDraw = (e) => {
    e.preventDefault(); // Prevent default touch events
    isDrawing = true;
    const { offsetX, offsetY } = getPointerPos(e);
    startX = offsetX;
    startY = offsetY;
    ctx.beginPath();
    ctx.lineWidth = drawingSize;
    ctx.strokeStyle = drawingColor;
    ctx.lineCap = 'round';
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.push(canvas.toDataURL());
    redoStack = [];
}

function drawShape(x, y) {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === 'pen') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = drawingColor;
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (selectedTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = '#ffffff';
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (selectedTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (selectedTool === 'rectangle') {
        ctx.beginPath();
        const width = x - startX;
        const height = y - startY;
        ctx.rect(startX, startY, width, height);
        ctx.stroke();
    } else if (selectedTool === 'circle') {
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
}

function addDrawingToOutput() {
    const imgData = canvas.toDataURL();
    const img = new Image();
    const imageCount = imagesArray.length + 1;
    const imgId = 'image' + imageCount;
    img.src = imgData;
    img.id = imgId;
    imagesArray.push(img);
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('drawing_popup').style.display = 'none';
        document.getElementById('popup-output').style.display = 'flex';
        const target = document.querySelector('#mixed-input .ql-editor');
        if (target && target.lastChild) {
            target.lastChild.innerHTML += 'img' + imageCount;
        }
        
    };
}

// function setProperties() {
//     const floatInput = document.getElementById('floatInput').value;
//     const widthInput = document.getElementById('widthInput').value;
//     const img = imagesArray[imagesArray.length - 1];

//     // Line height used for text (ensure this matches the actual line height of the container's text)
//     const lineSpacingInput = document.getElementById('line-spacing-text-input').value;
//     // const lineHeight = lineSpacingInput ? parseInt(lineSpacingInput) : 23;
//     let lineHeight;

//     if (window.innerWidth <= 900) {  // Check if the screen width is for mobile
//     lineHeight = lineSpacingInput ? lineSpacingInput : 20;  // Use 18px for mobile if no input is provided
//     } else {
//     lineHeight = lineSpacingInput ? lineSpacingInput : 23;  // Use 23px for desktop if no input is provided
//     }

//     // Function to set the image's width and height, ensuring height is a multiple of line height
//     function adjustImageDimensions() {
//         const outputContainer = document.getElementById('output-inner-container');
//         const containerWidth = outputContainer.clientWidth; // Get the current container width
//         const imgWidthPercent = parseFloat(widthInput); // Convert width input from percentage to a number
//         const imgWidthInPixels = (imgWidthPercent / 100) * containerWidth; // Calculate width in pixels
        
//         // Get the image's natural aspect ratio (for quality preservation)
//         const aspectRatio = img.naturalWidth / img.naturalHeight;

//         // Calculate the image's height based on the aspect ratio and width
//         let imgHeightInPixels = imgWidthInPixels / aspectRatio;

//         // Adjust the height to the nearest multiple of the line height
//         imgHeightInPixels = Math.round(imgHeightInPixels / lineHeight) * lineHeight;

//         // Check if the calculated width fits in the container
//         if (imgWidthInPixels > containerWidth) {
//             imgWidthInPixels = containerWidth; // Ensure image doesn't overflow container width
//             imgHeightInPixels = imgWidthInPixels / aspectRatio; // Adjust height based on new width
//         }

//         // Now check if the calculated height exceeds container height
//         if (imgHeightInPixels > outputContainer.clientHeight) {
//             imgHeightInPixels = outputContainer.clientHeight; // Limit height to container height
//             imgWidthInPixels = imgHeightInPixels * aspectRatio; // Recalculate width based on new height
//         }

//         // Ensure the width doesn't exceed the container after height adjustment
//         if (imgWidthInPixels > containerWidth) {
//             imgWidthInPixels = containerWidth; // Set width to container width if it exceeds
//             imgHeightInPixels = imgWidthInPixels / aspectRatio; // Adjust height based on new width
//         }

//         // Apply the calculated width and height while preserving the aspect ratio
//         //img.style.maxWidth = `${(imgWidthPercent / 100) * containerWidth}px`; // Set max-width
//         img.style.maxHeight = `${imgHeightInPixels}px`;  // Set max-height with line height multiple
//         img.style.width = 'auto';  // Auto width maintains aspect ratio
//         img.style.height = 'auto'; // Let the height scale naturally
//         img.style.leftMargin='3px'
//         img.style.rightMargin='3px'
//     }

//     // Set basic styles for the image
//     // img.style.verticalAlign = 'bottom'; // Align the image to the bottom of the line
//     img.style.float = floatInput; // Apply the float value (left, right, or none)
//     img.style.objectFit = 'cover'; // Ensure the image covers its box without distortion

//     // Adjust the image dimensions on load
//     adjustImageDimensions();

//     // Append the image to the container
//     const outputContainer = document.getElementById('output-inner-container');
//     outputContainer.appendChild(img);

//     // Close the popup
//     document.getElementById('popup-output').style.display = 'none';

//     // Recalculate dimensions when the window or container resizes
//     window.addEventListener('resize', adjustImageDimensions);
// }
function setProperties() {
    const floatInput = document.getElementById('floatInput').value;
    const widthInput = document.getElementById('widthInput').value;
    const img = imagesArray[imagesArray.length - 1];

    // Line height used for text (ensure this matches the actual line height of the container's text)
    const lineSpacingInput = document.getElementById('line-spacing-text-input').value;
    let lineHeight;

    if (window.innerWidth <= 900) {  // Check if the screen width is for mobile
        lineHeight = lineSpacingInput ? parseInt(lineSpacingInput) : 20;
    } else {
        lineHeight = lineSpacingInput ? parseInt(lineSpacingInput) : 23;
    }

    // Set the initial margin-top based on input or screen size
    const marginTopInput = document.getElementById('margin-top-input');
    let marginTop;

    if (window.innerWidth <= 900) {
        marginTop = marginTopInput && marginTopInput.value ? -Math.abs(parseInt(marginTopInput.value, 10)): -7;  // Set margin-top to -5px for screens less than 900px wide
    } else {
        marginTop = marginTopInput && marginTopInput.value ? -Math.abs(parseInt(marginTopInput.value, 10)): -7;  // Use input or -8px
    }

    // Function to set the image's width and height, ensuring height is a multiple of line height
    function adjustImageDimensions() {
        const outputContainer = document.getElementById('output-inner-container');
        const containerWidth = outputContainer.clientWidth;
        const imgWidthPercent = parseFloat(widthInput);
        let imgWidthInPixels = (imgWidthPercent / 100) * containerWidth;
        
        // Get the image's natural aspect ratio (for quality preservation)
        const aspectRatio = img.naturalWidth / img.naturalHeight;

        // Calculate the image's height based on the aspect ratio and width
        let imgHeightInPixels = imgWidthInPixels / aspectRatio;

        // Adjust the height to the nearest multiple of the line height
        imgHeightInPixels = Math.round(imgHeightInPixels / lineHeight) * lineHeight;

        // Check if the calculated width fits in the container
        if (imgWidthInPixels > containerWidth) {
            imgWidthInPixels = containerWidth;
            imgHeightInPixels = imgWidthInPixels / aspectRatio;
        }

        // Now check if the calculated height exceeds container height
        if (imgHeightInPixels > outputContainer.clientHeight) {
            imgHeightInPixels = outputContainer.clientHeight;
            imgWidthInPixels = imgHeightInPixels * aspectRatio;
        }

        // Ensure the width doesn't exceed the container after height adjustment
        if (imgWidthInPixels > containerWidth) {
            imgWidthInPixels = containerWidth;
            imgHeightInPixels = imgWidthInPixels / aspectRatio;
        }

        // Apply calculated width, height, and other styles
        img.style.maxHeight = `${imgHeightInPixels}px`;
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.marginLeft = '3px';
        img.style.marginRight = '3px';
    }

    // Set basic styles for the image
    img.style.float = floatInput; // Apply the float value (left, right, or none)
    img.style.objectFit = 'cover';
    img.style.marginTop = `${marginTop}px`;  // Initial margin-top value based on conditions

    // Adjust the image dimensions on load
    adjustImageDimensions();

    // Append the image to the container
    const outputContainer = document.getElementById('output-inner-container');
    outputContainer.appendChild(img);

    // Close the popup
    document.getElementById('popup-output').style.display = 'none';

    // Recalculate dimensions when the window or container resizes
    window.addEventListener('resize', adjustImageDimensions);
}


function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
        return {
            offsetX: e.touches[0].clientX - rect.left,
            offsetY: e.touches[0].clientY - rect.top
        };
    }
    return {
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top
    };
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('touchstart', startDraw, { passive: false });

canvas.addEventListener('mousemove', function(e) {
    const { offsetX, offsetY } = getPointerPos(e);
    drawShape(offsetX, offsetY);
});
canvas.addEventListener('touchmove', function(e) {
    const { offsetX, offsetY } = getPointerPos(e);
    drawShape(offsetX, offsetY);
}, { passive: false });

canvas.addEventListener('mouseup', function(e) {
    isDrawing = false;
});
canvas.addEventListener('touchend', function(e) {
    isDrawing = false;
}, { passive: false });

canvas.addEventListener('mouseleave', function() {
    isDrawing = false;
});
canvas.addEventListener('touchcancel', function() {
    isDrawing = false;
}, { passive: false });



function openImageUploadPopup() {
    document.getElementById('popup-image').style.display = 'flex';
}

function closePopupimage() {
    document.getElementById('popup-image').style.display = 'none';
}

function drawImage() {
    const input = document.getElementById('image-upload');
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            images.push({ img, x: 0, y: 0, width: 100, height: 100 });
            undoStack.push(canvas.toDataURL());
            redoStack = [];
            setProperty();
            drawImages()
            
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    closePopupimage();
}

function setProperty() {
    // Assuming 'container' is the id of the container element (e.g., a canvas or div)
const container = document.getElementById('drawing-canvas');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

const index = images.length - 1; // Index of the last added image
const aspectRatio = images[index].img.width / images[index].img.height;

// Get percentage values from input fields
const newWidthPercent = parseFloat(document.getElementById('image-width').value);
const newXPercent = parseFloat(document.getElementById('image-x').value);
const newYPercent = parseFloat(document.getElementById('image-y').value);

// Convert percentage values to pixels
const newWidth = (newWidthPercent / 100) * containerWidth;
const newHeight = newWidth / aspectRatio;
const newX = (newXPercent / 100) * containerWidth;
const newY = (newYPercent / 100) * containerHeight;

// Update the image properties
images[index].width = newWidth;
images[index].height = newHeight;
images[index].x = newX;
images[index].y = newY;



}

function drawImages() {
    const { img, x, y, width, height } =images[images.length-1];
    ctx.drawImage(img, x, y, width, height);

   
}
// // editor script

//  // Function to apply formatting (bold, italic, underline, etc.)
//  function toggleFormat(command) {
//     document.execCommand(command, false, null);
//     updateActiveState();
// }

// // Function to set font size (mapped to Heading levels)
// function setFontSize(select) {
//     const fontSizeLevel = select.value;
//     document.execCommand('fontSize', false, fontSizeLevel); // Use fontSize level (1 to 7)
// }

// // Function to set font family (applied like bold)
// function setFontFamily(select) {
//     const fontFamily = select.value;
//     document.execCommand('fontName', false, fontFamily);
// }

// // Function to set text color
// function setTextColor(input) {
//     document.execCommand('foreColor', false, input.value);
// }

// // Function to set background color
// function setBackgroundColor(input) {
//     document.execCommand('backColor', false, input.value);
// }

// // Function to insert an image from URL or local file
// // function insertImageFromFile(event) {
// //     const file = event.target.files[0]; // Get the selected file
// //     if (file) {
// //         const reader = new FileReader();
// //         reader.onload = function (e) {
// //             const imgTag = `<img src="${e.target.result}" style="max-width: 100%; height: auto;">`; // Create the image tag
// //             const mixedInput = document.getElementById('mixed-input'); // Ensure mixed-input is targeted
// //             mixedInput.focus(); // Focus the mixed-input to ensure insertion works
// //             document.execCommand('insertHTML', false, imgTag); // Insert the image using execCommand
// //         };
// //         reader.readAsDataURL(file); // Read the file as a Data URL
// //     } else {
// //         console.error('No file selected or invalid file.');
// //     }
// // }

// // Function to insert a table (with basic support)
// function insertTable() {
//     const rows = prompt("Enter number of rows:");
//     const cols = prompt("Enter number of columns:");
    
//     // Validate the input
//     if (rows && cols && !isNaN(rows) && !isNaN(cols)) {
//         // Create the table structure
//         let table = '<table border="1" style="border-collapse: collapse;">';
//         for (let i = 0; i < rows; i++) {
//             table += '<tr>';
//             for (let j = 0; j < cols; j++) {
//                 table += `<td contenteditable="true" style="padding: 5px; border: 1px solid #ccc;">Cell</td>`;
//             }
//             table += '</tr>';
//         }
//         table += '</table>';
        
//         // Get the current selection and range
//         const selection = window.getSelection();
//         const range = selection.getRangeAt(0);
        
//         // Create a temporary div to hold the table HTML
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = table;
        
//         // Insert the table at the current cursor position
//         range.deleteContents(); // Remove the selected content (if any)
//         range.insertNode(tempDiv.firstChild); // Insert the table
//     }
// }

// // Function to update toolbar button states
// function updateActiveState() {
//     const selection = window.getSelection();
//     const selectedText = selection.toString();
//     const isBold = document.queryCommandState("bold");
//     const isItalic = document.queryCommandState("italic");
//     const isUnderline = document.queryCommandState("underline");
//     const isJustifyLeft = document.queryCommandState("justifyLeft");
//     const isJustifyCenter = document.queryCommandState("justifyCenter");
//     const isJustifyRight = document.queryCommandState("justifyRight");

//     toggleButtonState('boldBtn', isBold);
//     toggleButtonState('italicBtn', isItalic);
//     toggleButtonState('underlineBtn', isUnderline);
//     toggleButtonState('leftAlignBtn', isJustifyLeft);
//     toggleButtonState('centerAlignBtn', isJustifyCenter);
//     toggleButtonState('rightAlignBtn', isJustifyRight);
// }

// // Function to toggle button active/inactive state
// function toggleButtonState(buttonId, isActive) {
//     const button = document.getElementById(buttonId);
//     if (isActive) {
//         button.classList.add('active');
//     } else {
//         button.classList.remove('active');
//     }
// }

// // Initialize the active state when contenteditable is ready
// document.getElementById('mixed-input').addEventListener('input', function() {
//     updateActiveState();
// });

// // Function to handle paste event and insert as plain text
// document.getElementById('mixed-input').addEventListener('paste', function(e) {
//     e.preventDefault(); // Prevent the default paste behavior

//     // Get the pasted text as plain text
//     const text = (e.clipboardData || window.clipboardData).getData('text');

//     // Insert the plain text at the current cursor position
//     document.execCommand('insertText', false, text);
// });

// const quill = new Quill('#mixed-input', {
//     modules: {
//       syntax: true, // Enable syntax highlighting
//       toolbar: '#toolbar-container', // Attach toolbar to the editor
//     },
//     placeholder: 'Compose an epic...', // Placeholder text
//     theme: 'snow', // Snow theme for Quill
//   });
//   quill.on('text-change', function () {
//     convertToHTML(); // Call your function whenever content changes
//   });
  
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(showMainPopup, 30000); // Show main popup after 30 seconds
});

function showMainPopup() {
    document.getElementById("supportPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("supportPopup").style.display = "none";
    showMiniPopup(); // Show mini popup when main popup is closed
}

function showMiniPopup() {
    document.getElementById("miniSupportPopup").style.display = "flex";
}

function redirectToSupport() {
    closePopup(); // Close the main popup
    window.location.href = '#support'; // Redirect to support section
}

