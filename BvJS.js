        var curl = window.location.href;
        if (curl.indexOf(&#39;m=1&#39;) !== -1) {
            curl = curl.replace(&#39;m=1&#39;, &#39;m=0&#39;);
            window.location.href = curl;
        }
function myBankInfo() {
  var xrr = document.getElementById("myDIVsds");
  if (xrr.style.display === "block") {
    xrr.style.display = "none";
  } else {
    xrr.style.display = "block";
  }
}
document.querySelectorAll("#itemCodeInput")[0].value = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Item Code -[")[1].split("]")[0];

    let url = "https://script.google.com/macros/s/AKfycbwXX133NPM_8SjX9fYF2ivw9Asgx0elUzzDlmpfGa-9gllHs6kwgtN3k1hqGBT3TSAS/exec";
    let fileInput = document.getElementById("fileInput");
    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let starRatingInput = document.querySelectorAll('input[name="rating"]');
    let reviewTitleInput = document.getElementById("reviewTitleInput");
    let itemCodeInput = document.getElementById("itemCodeInput");
    let submitButton = document.getElementById("submitButton");
    let imageContainer = document.getElementById("imageContainer");
    let loadingMessage = document.querySelector(".loading-message");
    let errorMessages = document.querySelector(".error-message");
    let uploadSuccessMessage = document.querySelector(".upload-success-message");
    let maxImageCount = 5; // Maximum number of images allowed

    fileInput.addEventListener('change', () => {
        // Your existing code for handling file selection
        // ...
        // Display image previews for selected files
        imageContainer.innerHTML = '';
        for (let i = 0; i < fileInput.files.length; i++) {
            let file = fileInput.files[i];
            let img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = "100px"; // Set the maximum width for image previews
            imageContainer.appendChild(img);
        }
    });

    submitButton.addEventListener('click', () => {
        if (fileInput.files.length === 0) {
            alert('Please select at least one image.');
            return;
        }

        if (!nameInput.value || !emailInput.value || !reviewTitleInput.value || !itemCodeInput.value) {
            alert('Please fill in all required fields.');
            return;
        }

        let selectedRating = Array.from(starRatingInput).find(input => input.checked);

        if (!selectedRating) {
            alert('Please select a star rating.');
            return;
        }

        if (fileInput.files.length > maxImageCount) {
            alert(`Please select a maximum of ${maxImageCount} images.`);
            // Clear the file input
            fileInput.value = '';
            return;
        }

        // Show loading message and hide error message
        loadingMessage.style.display = "block";
        errorMessages.style.display = "none";

        // Clear existing images
        imageContainer.innerHTML = '';

        for (let i = 0; i < fileInput.files.length; i++) {
            let file = fileInput.files[i];
            let fr = new FileReader();

            fr.addEventListener("loadend", () => {
                let res = fr.result;
                let spt = res.split("base64,")[1];

                let obj = {
                    base64: spt,
                    type: file.type,
                    name: file.name,
                    folderId: "171aU9i63bFTrMMT_iPJjNcMbIaHAU21X",
                    nameValue: nameInput.value,
                    emailValue: emailInput.value,
                    starRatingValue: selectedRating.value,
                    reviewTitleValue: reviewTitleInput.value,
                    itemCodeValue: itemCodeInput.value
                }

                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(obj)
                })
                .then(response => response.text())
                .then(data => {
                    if (data === 'This email address is already used') {
                        errorMessages.style.display = "block";
                        errorMessages.textContent = data;
                        loadingMessage.style.display = "none";
                    } else {
                        imageContainer.innerHTML += data + ', ';
                        uploadSuccessMessage.textContent = 'Your Review has been submitted.';
                        uploadSuccessMessage.style.display = "block";
                        // Hide loading message
                        loadingMessage.style.display = "none";
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000);
                    }
                })
                .catch(error => console.error(error));
            });

            fr.readAsDataURL(file);
        }
    });
	
	function countAndDisplayFilteredResults(itemCode) {
        
        
            const reviews = document.querySelectorAll('.sectionCommentz');
            let filteredCount = 0;
            
            const starCounts = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    };

            reviews.forEach(review => {
                const itemSpan = review.querySelector('.itemcx');
                const txtValue = itemSpan.textContent || itemSpan.innerText;

                if (txtValue === itemCode) {
                 const rating = parseInt(review.querySelector('.star-icon').getAttribute('data-rating'));
            starCounts[rating]++;
                    filteredCount++;
                }
            });
            
                // Update the HTML elements with the rating counts
    document.getElementById('star5Count').textContent = starCounts[5];
    document.getElementById('star4Count').textContent = starCounts[4];
    document.getElementById('star3Count').textContent = starCounts[3];
    document.getElementById('star2Count').textContent = starCounts[2];
    document.getElementById('star1Count').textContent = starCounts[1];

            const commentCountElement = document.getElementById('commentCount');
            var totalRating = commentCountElement.textContent = ` ${filteredCount}`;
			document.querySelectorAll(".rating-countz")[0].innerHTML =totalRating+" Ratings";
            // Calculate total number of ratings
const totalRatings = starCounts[1] + starCounts[2] + starCounts[3] + starCounts[4] + starCounts[5];

// Calculate the percentage of each rating count
const percentage5Star = (starCounts[5] / totalRatings) * 100;
const percentage4Star = (starCounts[4] / totalRatings) * 100;
const percentage3Star = (starCounts[3] / totalRatings) * 100;
const percentage2Star = (starCounts[2] / totalRatings) * 100;
const percentage1Star = (starCounts[1] / totalRatings) * 100;

// Update the width of each bar
document.querySelector('.bar-5').style.width = percentage5Star + '%';
document.querySelector('.bar-4').style.width = percentage4Star + '%';
document.querySelector('.bar-3').style.width = percentage3Star + '%';
document.querySelector('.bar-2').style.width = percentage2Star + '%';
document.querySelector('.bar-1').style.width = percentage1Star + '%';

            
            
        }
        
        

    document.addEventListener("DOMContentLoaded", function () {
        function calculateStarRatingsAndDates() {
        const itemCodeElement = document.getElementById("itemCode");
            const itemCode = itemCodeElement ? itemCodeElement.textContent : "";

            countAndDisplayFilteredResults(itemCode);
            const reviewCards = document.querySelectorAll(".review-card");

            reviewCards.forEach(reviewCard => {
                const reviewRating = parseInt(reviewCard.querySelector(".star-icon").getAttribute("data-rating"));
                const reviewRatingElement = reviewCard.querySelector(".review-rating");

                for (let i = 0; i < reviewRating; i++) {
                    const starIcon = document.createElement("span");
                    starIcon.classList.add("star-icon");
                    starIcon.innerHTML = "★";
                    reviewRatingElement.appendChild(starIcon);
                }

                const postedDateElement = reviewCard.querySelector(".posted-date");
                const reviewDate = new Date(postedDateElement.textContent);

                const currentDate = new Date();
                const timeDifference = currentDate - reviewDate;
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                postedDateElement.textContent = `${daysDifference === 1 ? '1 day' : daysDifference + ' days'} ago`;
            });
        }

        function displayReviews(reviews) {
            const reviewsContainer = document.getElementById('reviews');

            reviews.forEach(review => {
                const commentElement = document.createElement('li');
                commentElement.classList.add('commentz');
                commentElement.innerHTML = `
                    <div class="sectionCommentz ${review.ItemCode}">
                        <div class="review-card">
                            <p class="review-date">
                                <span class="posted-date">${review.Date}</span>
                            </p>
                            <p class="review-author">
                              by <b>${review.Name}</b>
                                <span>
                                    <img class="verifyImg" width="15" height="16" src="//laz-img-cdn.alicdn.com/tfs/TB1bOqBeb_I8KJjy1XaXXbsxpXa-30-32.png" data-spm-anchor-id="a2a0e.pdp.ratings_reviews.i5.4c593359XxuS8k">
                                    <span style="color: #4caf50;" class="verify">Verified Purchase</span>
                                </span>
                            </p>
                            <p class="review-rating">
                                <span class="star-icon" data-rating="${review.Rating}"></span>
                            </p>
                            <p class="review-text">${review.Review}.</p>
                            ${generateImageTags(review.Upload)}
                            <br/>
                            <span class="itemcx">${review.ItemCode}</span>
                            <i class="fa fa-ellipsis-v" style="float: right; color: #c1c1c1;"></i>
                        </div>
                        <div class="zoomed-image-container" style="display: none;">
                            <img style="max-width: 300px; width: 100%; height: auto;" class="zoomed-image" src="" alt="Zoomed Image">
                          </div>
                        <div class="reply-section" style="display: ${review.Reply ? 'block' : 'none'};background: blanchedalmond; padding: 1px 7px; font-family: system-ui; border-radius: 4px; margin: 16px 0px 0px 0px; color: firebrick; font-size: smaller;">
                    <p class="reply-title"><b>Blackvenda.lk</b> replied:</p>
                    <p class="reply-text">${review.Reply || 'No reply yet.'}</p>
                </div>
                    </div>
                `
                ;
                if (reviewsContainer.firstChild) {
   					 reviewsContainer.insertBefore(commentElement, reviewsContainer.firstChild);
				} else {
    				reviewsContainer.appendChild(commentElement);
				}
            });
	var getItmCd = document.querySelectorAll(".modelNor")[0].innerHTML;
            calculateStarRatingsAndDates();
             countAndDisplayFilteredResults(getItmCd);
        }

        const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXX133NPM_8SjX9fYF2ivw9Asgx0elUzzDlmpfGa-9gllHs6kwgtN3k1hqGBT3TSAS/exec';

        fetch(APPS_SCRIPT_URL)
            .then(response => response.json())
            .then(reviews => {
                displayReviews(reviews);

                // Automatic filtering based on the item code when the page loads
                const itemCodeElement = document.querySelector(".modelNor");
                const itemCode = itemCodeElement ? itemCodeElement.textContent : "";

                const ul = document.getElementById("reviews");
                const li = ul.getElementsByClassName("sectionCommentz");

                for (let i = 0; i < li.length; i++) {
                    const itemSpan = li[i].querySelector(".itemcx");
                    const txtValue = itemSpan.textContent || itemSpan.innerText;

                    if (txtValue !== itemCode) {
                        li[i].style.display = "none";
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    });

    function toggleZoom(imageElement) {
        const reviewCard = imageElement.closest('.review-card');
        const zoomedContainer = reviewCard.nextElementSibling;
        const zoomedImg = zoomedContainer.querySelector('.zoomed-image');

        if (zoomedContainer.style.display === 'none') {
            zoomedContainer.style.display = 'block';
            zoomedImg.src = imageElement.src;
        } else {
            zoomedContainer.style.display = 'none';
        }
    }

    function generateImageTags(imageLinks) {
        const linksArray = imageLinks.split(',');
        let imageTags = '';

        linksArray.forEach(link => {
            const imageTag = `<img loading="lazy" onclick="toggleZoom(this)" style="width: 94px;" class="review-image" src="${convertDriveLink(link)}" alt="Customer's Review">`;
            imageTags += imageTag;
        });

        return imageTags;
    }

    function convertDriveLink(link) {
        return link.replace('https://drive.google.com/open?id=', 'https://drive.google.com/uc?id=');
    }
  
  function myReviewFunction() {
  var x = document.getElementById("myDIVz");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
  (function() {
      var items = <data:post.commentJso/>;
      var msgs = <data:post.commentMsgs/>;
      var config = <data:post.commentConfig/>;

// <![CDATA[
      var cursor = null;
      if (items && items.length > 0) {
        cursor = parseInt(items[items.length - 1].timestamp) + 1;
      }

      var bodyFromEntry = function(entry) {
        var text = (entry &&
                    ((entry.content && entry.content.$t) ||
                     (entry.summary && entry.summary.$t))) ||
            '';
        if (entry && entry.gd$extendedProperty) {
          for (var k in entry.gd$extendedProperty) {
            if (entry.gd$extendedProperty[k].name == 'blogger.contentRemoved') {
              return '<span class="deleted-comment">' + text + '</span>';
            }
          }
        }
        return text;
      }

      var parse = function(data) {
        cursor = null;
        var comments = [];
        if (data && data.feed && data.feed.entry) {
          for (var i = 0, entry; entry = data.feed.entry[i]; i++) {
            var comment = {};
            // comment ID, parsed out of the original id format
            var id = /blog-(\d+).post-(\d+)/.exec(entry.id.$t);
            comment.id = id ? id[2] : null;
            comment.body = bodyFromEntry(entry);
            comment.timestamp = Date.parse(entry.published.$t) + '';
            if (entry.author && entry.author.constructor === Array) {
              var auth = entry.author[0];
              if (auth) {
                comment.author = {
                  name: (auth.name ? auth.name.$t : undefined),
                  profileUrl: (auth.uri ? auth.uri.$t : undefined),
                  avatarUrl: (auth.gd$image ? auth.gd$image.src : undefined)
                };
              }
            }
            if (entry.link) {
              if (entry.link[2]) {
                comment.link = comment.permalink = entry.link[2].href;
              }
              if (entry.link[3]) {
                var pid = /.*comments\/default\/(\d+)\?.*/.exec(entry.link[3].href);
                if (pid && pid[1]) {
                  comment.parentId = pid[1];
                }
              }
            }
            comment.deleteclass = 'item-control blog-admin';
            if (entry.gd$extendedProperty) {
              for (var k in entry.gd$extendedProperty) {
                if (entry.gd$extendedProperty[k].name == 'blogger.itemClass') {
                  comment.deleteclass += ' ' + entry.gd$extendedProperty[k].value;
                } else if (entry.gd$extendedProperty[k].name == 'blogger.displayTime') {
                  comment.displayTime = entry.gd$extendedProperty[k].value;
                }
              }
            }
            comments.push(comment);
          }
        }
        return comments;
      };

      var paginator = function(callback) {
        if (hasMore()) {
          var url = config.feed + '?alt=json&v=2&orderby=published&reverse=false&max-results=50';
          if (cursor) {
            url += '&published-min=' + new Date(cursor).toISOString();
          }
          window.bloggercomments = function(data) {
            var parsed = parse(data);
            cursor = parsed.length < 50 ? null
                : parseInt(parsed[parsed.length - 1].timestamp) + 1
            callback(parsed);
            window.bloggercomments = null;
          }
          url += '&callback=bloggercomments';
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      };
      var hasMore = function() {
        return !!cursor;
      };
      var getMeta = function(key, comment) {
        if ('iswriter' == key) {
          var matches = !!comment.author
              && comment.author.name == config.authorName
              && comment.author.profileUrl == config.authorUrl;
          return matches ? 'true' : '';
        } else if ('deletelink' == key) {
          return config.baseUri + '/delete-comment.g?blogID='
               + config.blogId + '&postID=' + comment.id;
        } else if ('deleteclass' == key) {
          return comment.deleteclass;
        }
        return '';
      };

      var replybox = null;
      var replyUrlParts = null;
      var replyParent = undefined;

      var onReply = function(commentId, domId) {
        if (replybox == null) {
          // lazily cache replybox, and adjust to suit this style:
          replybox = document.getElementById('comment-editor');
          if (replybox != null) {
            replybox.height = '250px';
            replybox.style.display = 'block';
            replyUrlParts = replybox.src.split('#');
          }
        }
        if (replybox && (commentId !== replyParent)) {
          replybox.src = '';
          document.getElementById(domId).insertBefore(replybox, null);
          replybox.src = replyUrlParts[0]
              + (commentId ? '&parentID=' + commentId : '')
              + '#' + replyUrlParts[1];
          replyParent = commentId;
        }
      };

      var hash = (window.location.hash || '#').substring(1);
      var startThread, targetComment;
      if (/^comment-form_/.test(hash)) {
        startThread = hash.substring('comment-form_'.length);
      } else if (/^c[0-9]+$/.test(hash)) {
        targetComment = hash.substring(1);
      }

// Configure commenting API:
      var configJso = {
        'maxDepth': config.maxThreadDepth
      };
      var provider = {
        'id': config.postId,
        'data': items,
        'loadNext': paginator,
        'hasMore': hasMore,
        'getMeta': getMeta,
        'onReply': onReply,
        'rendered': true,
        'initComment': targetComment,
        'initReplyThread': startThread,
        'config': configJso,
        'messages': msgs
      };

      var render = function() {
        if (window.goog && window.goog.comments) {
          var holder = document.getElementById('comment-holder');
          window.goog.comments.render(holder, provider);
        }
      };

      // render now, or queue to render when library loads:
      if (window.goog && window.goog.comments) {
        render();
      } else {
        window.goog = window.goog || {};
        window.goog.comments = window.goog.comments || {};
        window.goog.comments.loadQueue = window.goog.comments.loadQueue || [];
        window.goog.comments.loadQueue.push(render);
      }
    })();
//Order Submittion
	const scriptURL = 'https://script.google.com/macros/s/AKfycby4XI6bPZeaY0m_wcX0Xfm013FGE4c5zTxZeHdDokfZ68x4qz7N71w6YPTdQeUkwcy6/exec'
            const form = document.forms['google-sheet']
          
            form.addEventListener('submit', e => {
              e.preventDefault()
              fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => Swal.fire(
  'Thank You!',
  'Your Order Has Been Received!',
  'success'
))



                .catch(error => console.error('Error!', error.message))
                $('#myForm').hide();
                $('#thanksMasseg').show();
            })
            
            function refreshPage(){
    window.location.reload();
} 
//Item Name Placemnt
var getInfoname = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Item Name-[")[1].split("]")[0];
var getInfoprice = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Price-[")[1].split("]")[0];
var getInfoOtherurl = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Out of Product Link-[")[1].split("]")[0];

document.querySelectorAll("#TitlteFOr")[0].value = getInfoname;
document.querySelectorAll("#OtheItemURL")[0].value = getInfoOtherurl ;
//Product size display script
var getSizes = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Size-[")[1].split("]")[0];


var gets1 = getSizes.match(35)
var gets2 = getSizes.match(36)
var gets3 = getSizes.match(37)
var gets4 = getSizes.match(38)
var gets5 = getSizes.match(39)
var gets6 = getSizes.match(40)
var gets7 = getSizes.match(41)
var gets8 = getSizes.match(42)
var gets9 = getSizes.match(43)
var gets10 = getSizes.match(44)
var gets11 = getSizes.match(45)
var gets12 = getSizes.match("S")
var gets13 = getSizes.match("L")
var gets14 = getSizes.match("M_")
var gets15 = getSizes.match("X_")
var gets16 = getSizes.match("XX")
var gets16 = getSizes.match("XX")
getSizes.match("110") ? document.querySelectorAll("#siz110CM")[0].style.display= "unset" : document.querySelectorAll("#siz110CM")[0].style.display= "none";
getSizes.match("115") ? document.querySelectorAll("#siz115CM")[0].style.display= "unset" : document.querySelectorAll("#siz115CM")[0].style.display= "none";
getSizes.match("120") ? document.querySelectorAll("#siz120CM")[0].style.display= "unset" : document.querySelectorAll("#siz120CM")[0].style.display= "none";
getSizes.match("125") ? document.querySelectorAll("#siz125CM")[0].style.display= "unset" : document.querySelectorAll("#siz125CM")[0].style.display= "none";
getSizes.match("130") ? document.querySelectorAll("#siz130CM")[0].style.display= "unset" : document.querySelectorAll("#siz130CM")[0].style.display= "none";
getSizes.match("135") ? document.querySelectorAll("#siz135CM")[0].style.display= "unset" : document.querySelectorAll("#siz135CM")[0].style.display= "none";
getSizes.match("140") ? document.querySelectorAll("#siz140CM")[0].style.display= "unset" : document.querySelectorAll("#siz140CM")[0].style.display= "none";
getSizes.match("145") ? document.querySelectorAll("#siz145CM")[0].style.display= "unset" : document.querySelectorAll("#siz145CM")[0].style.display= "none";
getSizes.match("150") ? document.querySelectorAll("#siz150CM")[0].style.display= "unset" : document.querySelectorAll("#siz150CM")[0].style.display= "none";
getSizes.match("155") ? document.querySelectorAll("#siz155CM")[0].style.display= "unset" : document.querySelectorAll("#siz155CM")[0].style.display= "none";
getSizes.match("160") ? document.querySelectorAll("#siz160CM")[0].style.display= "unset" : document.querySelectorAll("#siz160CM")[0].style.display= "none";
getSizes.match(/\b30\b/) ? document.querySelectorAll("#siz30")[0].style.display = "unset" : document.querySelectorAll("#siz30")[0].style.display = "none";
getSizes.match("31") ? document.querySelectorAll("#siz31")[0].style.display= "unset" : document.querySelectorAll("#siz31")[0].style.display= "none";
getSizes.match("32") ? document.querySelectorAll("#siz32")[0].style.display= "unset" : document.querySelectorAll("#siz32")[0].style.display= "none";
getSizes.match("33") ? document.querySelectorAll("#siz33")[0].style.display= "unset" : document.querySelectorAll("#siz33")[0].style.display= "none";
getSizes.match("34") ? document.querySelectorAll("#siz34")[0].style.display= "unset" : document.querySelectorAll("#siz34")[0].style.display= "none";

var getmatchSiz = getSizes.match(/[0-9]|[A-Z]/)

if (gets1){
document.querySelectorAll("#siz35")[0].style.display = "unset";
} else if  (!gets1) {
document.querySelectorAll("#siz35")[0].style.display = "none";
}
if (gets2){
document.querySelectorAll("#siz36")[0].style.display = "unset";
} else if  (!gets2) {
document.querySelectorAll("#siz36")[0].style.display = "none";
}
if (gets3){
document.querySelectorAll("#siz37")[0].style.display = "unset";
} else if  (!gets3) {
document.querySelectorAll("#siz37")[0].style.display = "none";
}
if (gets4){
document.querySelectorAll("#siz38")[0].style.display = "unset";
} else if  (!gets4) {
document.querySelectorAll("#siz38")[0].style.display = "none";
}
if (gets5){
document.querySelectorAll("#siz39")[0].style.display = "unset";
} else if  (!gets5) {
document.querySelectorAll("#siz39")[0].style.display = "none";
}
if (gets6){
document.querySelectorAll("#siz40")[0].style.display = "unset";
} else if  (!gets6) {
document.querySelectorAll("#siz40")[0].style.display = "none";
}
if (gets7){
document.querySelectorAll("#siz41")[0].style.display = "unset";
} else if  (!gets7) {
document.querySelectorAll("#siz41")[0].style.display = "none";
}
if (gets8){
document.querySelectorAll("#siz42")[0].style.display = "unset";
} else if  (!gets8) {
document.querySelectorAll("#siz42")[0].style.display = "none";
}
if (gets9){
document.querySelectorAll("#siz43")[0].style.display = "unset";
} else if  (!gets9) {
document.querySelectorAll("#siz43")[0].style.display = "none";
}
if (gets10){
document.querySelectorAll("#siz44")[0].style.display = "unset";
} else if  (!gets10) {
document.querySelectorAll("#siz44")[0].style.display = "none";
}
if (gets11){
document.querySelectorAll("#siz45")[0].style.display = "unset";
} else if  (!gets11) {
document.querySelectorAll("#siz45")[0].style.display = "none";
}
if (gets12){
document.querySelectorAll("#sizS")[0].style.display = "unset";
} else if  (!gets12) {
document.querySelectorAll("#sizS")[0].style.display = "none";
}
if (gets13){
document.querySelectorAll("#sizL")[0].style.display = "unset";
} else if  (!gets13) {
document.querySelectorAll("#sizL")[0].style.display = "none";
}
if (gets14){
document.querySelectorAll("#sizM")[0].style.display = "unset";
} else if  (!gets14) {
document.querySelectorAll("#sizM")[0].style.display = "none";
}
if (gets15){
document.querySelectorAll("#sizXL")[0].style.display = "unset";
} else if  (!gets15) {
document.querySelectorAll("#sizXL")[0].style.display = "none";
}
if (gets16){
document.querySelectorAll("#sizXXL")[0].style.display = "unset";
} else if  (!gets16) {
document.querySelectorAll("#sizXXL")[0].style.display = "none";
}

if (getmatchSiz){
document.querySelectorAll(".size-container")[0].style.display = "unset";
}else if (!getmatchSiz){
document.querySelectorAll(".size-container")[0].style.display = "none";
}
//Size fixing culor true
var getInfo1 = getSizes.slice(0, 2);
var getInfo11x = getSizes.slice(0, 3);
document.querySelectorAll("#size-display-new")[0].innerHTML =getInfo1;


if(getInfo1 === "30"){document.querySelectorAll("#siz301")[0].setAttribute("checked", true); document.querySelectorAll("#siz30")[0].setAttribute("class", "size active"); }
else if(getInfo1 === "31"){document.querySelectorAll("#siz311")[0].setAttribute("checked", true); document.querySelectorAll("#siz31")[0].setAttribute("class", "size active"); }
else if(getInfo1 === "32"){document.querySelectorAll("#siz321")[0].setAttribute("checked", true); document.querySelectorAll("#siz32")[0].setAttribute("class", "size active"); }
else if(getInfo1 === "33"){document.querySelectorAll("#siz331")[0].setAttribute("checked", true); document.querySelectorAll("#siz33")[0].setAttribute("class", "size active"); }
else if(getInfo1 === "34"){document.querySelectorAll("#siz341")[0].setAttribute("checked", true); document.querySelectorAll("#siz34")[0].setAttribute("class", "size active"); }
else if (getInfo1 === "39"){
 document.querySelectorAll("#siz391")[0].setAttribute("checked", true);
 document.querySelectorAll("#siz39")[0].setAttribute("class", "size active"); 
 } else if (getInfo1 === "40"){
 document.querySelectorAll("#siz401")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz40")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "35"){
 document.querySelectorAll("#siz351")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz35")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "36"){
 document.querySelectorAll("#siz361")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz36")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "37"){
 document.querySelectorAll("#siz371")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz37")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "38"){
 document.querySelectorAll("#siz381")[0].setAttribute("checked", true);
  document.querySelectorAll("#siz38")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "41"){
 document.querySelectorAll("#siz411")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz41")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "42"){
 document.querySelectorAll("#siz421")[0].setAttribute("checked", true);
  document.querySelectorAll("#siz42")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "43"){
 document.querySelectorAll("#siz431")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz43")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "44"){
 document.querySelectorAll("#siz441")[0].setAttribute("checked", true);
  document.querySelectorAll("#siz44")[0].setAttribute("class", "size active"); 
 }else if (getInfo1 === "45"){
 document.querySelectorAll("#siz451")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz45")[0].setAttribute("class", "size active"); 
 }else if (getInfo1.match("S")){ 
 document.querySelectorAll("#sizS1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#sizS")[0].setAttribute("class", "size active"); 
 }else if (getInfo1.match("L")){
 document.querySelectorAll("#sizL1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#sizL")[0].setAttribute("class", "size active"); 
 }else if (getInfo1.match("M_")){
document.querySelectorAll("#size-display-new")[0].innerHTML ="M";
 document.querySelectorAll("#sizM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#sizM")[0].setAttribute("class", "size active"); 
 }else if (getInfo1.match("X_")){
document.querySelectorAll("#size-display-new")[0].innerHTML ="XL";
 document.querySelectorAll("#sizXL1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#sizXL")[0].setAttribute("class", "size active"); 
 }else if (getInfo1.match("XX")){
document.querySelectorAll("#size-display-new")[0].innerHTML ="XXL";
 document.querySelectorAll("#sizXXL1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#sizXXL")[0].setAttribute("class", "size active");
 }else if (getInfo1.match("11")){
document.querySelectorAll("#size-display-new")[0].innerHTML ="110CM";
document.querySelectorAll("#disPlaySize")[0].innerHTML ="110CM";
 document.querySelectorAll("#siz110CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz110CM")[0].setAttribute("class", "size active");
 }else if (getInfo1.match("12")){
document.querySelectorAll("#size-display-new")[0].innerHTML ="120CM";
document.querySelectorAll("#disPlaySize")[0].innerHTML ="120CM";
 document.querySelectorAll("#siz120CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz120CM")[0].setAttribute("class", "size active");
 }else if (getInfo1.match("13")){
document.querySelectorAll("#disPlaySize")[0].innerHTML ="130CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="130CM";
 document.querySelectorAll("#siz130CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz130CM")[0].setAttribute("class", "size active");
 }else if (getInfo1.match("14")){
document.querySelectorAll("#disPlaySize")[0].innerHTML ="140CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="140CM";
 document.querySelectorAll("#siz140CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz140CM")[0].setAttribute("class", "size active");
 }else if (getInfo1.match("15")){
document.querySelectorAll("#disPlaySize")[0].innerHTML ="150CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="150CM";
 document.querySelectorAll("#siz150CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz150CM")[0].setAttribute("class", "size active");
 }else if (getInfo1.match("16")){
document.querySelectorAll("#disPlaySize")[0].innerHTML ="160CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="160CM";
 document.querySelectorAll("#siz160CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz160CM")[0].setAttribute("class", "size active");
 }
document.querySelectorAll("#disPlaySize")[0].innerHTML ="<b>(Size -"+getInfo1.replace("X_","XL").replace("XX","XXL") +")</b>";

var getInfo11 = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Size-[")[1].split("]")[0];
var getInfo112 = getInfo11.slice(0, 3);

if (getInfo112.match("115")){
document.querySelectorAll("#disPlaySize")[0].innerHTML ="115CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="115CM";
 document.querySelectorAll("#siz115CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz115CM")[0].setAttribute("class", "size active");
 } else if (getInfo112.match("125")){
document.querySelectorAll("#disPlaySize")[0].innerHTML ="125CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="125CM";
 document.querySelectorAll("#siz125CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz125CM")[0].setAttribute("class", "size active");
 } else if (getInfo112.match("135")){
document.querySelectorAll("#siz35")[0].style.display= "none";
document.querySelectorAll("#disPlaySize")[0].innerHTML ="135CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="135CM";
 document.querySelectorAll("#siz135CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz135CM")[0].setAttribute("class", "size active");
 } else if (getInfo112.match("145")){
document.querySelectorAll("#siz45")[0].style.display= "none";
document.querySelectorAll("#disPlaySize")[0].innerHTML ="145CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="135CM";
 document.querySelectorAll("#siz145CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz145CM")[0].setAttribute("class", "size active");
 } else if (getInfo112.match("155")){
document.querySelectorAll("#disPlaySize")[0].innerHTML ="155CM";
document.querySelectorAll("#size-display-new")[0].innerHTML ="155CM";
 document.querySelectorAll("#siz155CM1")[0].setAttribute("checked", true); 
  document.querySelectorAll("#siz155CM")[0].setAttribute("class", "size active");
 }
 
  const sizes = document.querySelectorAll('.size');
 
 function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

sizes.forEach(size => size.addEventListener('click', changeSize));

document.querySelectorAll("#itemCode")[0].value =document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Item Code -[")[1].split("]")[0];

	let radiBtns = document.querySelectorAll("input[name='Sizes']");
	let result = document.querySelectorAll("#size-display-new")[0];
    var avSiz = document.querySelectorAll(".qtyAviBal")[0].innerHTML;
    var dataFiz = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML;
	document.querySelectorAll(".qtyAviBal")[0].innerHTML = dataFiz.split("Size-[")[1].split("]")[0].split("(")[1].split(")")[0]+ " Pieces available";

document.querySelectorAll("#itemCode")[0].value =dataFiz.split("Item Code -[")[1].split("]")[0]+"-"+getInfo1;


let findselected = () => {
	let selected = 				document.querySelector("input[name='Sizes']:checked").value;	
    result.textContent = selected;   

if(selected.match(selected)){
 var ghe = document.querySelectorAll(".qtyAviBal")[0].innerHTML =dataFiz.split(selected+"(")[1].split(")")[0]+ " Pieces available";
document.querySelectorAll("#itemCode")[0].value =dataFiz.split("Item Code -[")[1].split("]")[0]+"-"+selected;
}


document.querySelectorAll("#disPlaySize")[0].innerHTML = "<b>(Size - "+selected+")</b>";
    document.querySelectorAll(".inb old-price efont")[0].innerHTML = "<b>(Size - "+selected+")</b>";
}

radiBtns.forEach(radioBtn => {
	radioBtn.addEventListener("change", findselected)
});

function mySizChan() {
    var avSiz = document.querySelectorAll(".qtyAviBal")[0].innerHTML.slice(0,2);

if (avSiz.match("1")){
document.querySelector(".plus-btn").setAttribute("disabled", "disabled");
document.querySelector(".minus-btn").setAttribute("disabled", "disabled");
    document.getElementById("quantity").value = "1";
}else {
    document.querySelector(".plus-btn").removeAttribute("disabled");
    document.getElementById("quantity").value = "1";
}

if(avSiz.match("2")){
function clichangeValue() {
  document.querySelector(".plus-btn").setAttribute("disabled", "disabled");
}
}
    
}

var priceDetailesz = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Price-[")[1].split("]")[0];
	var getQntLimit = dataFiz.split("Stock Lavel-[")[1].split("]")[0];
	var exChrg = 200;
	

    
        //setting default attribute to disabled of minus button
        document.querySelector(".minus-btn").setAttribute("disabled", "disabled");


        //taking value to increment decrement input value
        var valueCount

        //taking price value in variable
        var price = document.getElementById("ItemFinalTotaleHere").innerText;

        //price calculation function
        function priceTotal() {
			var subTotall = valueCount * priceDetailesz ;
            var exdel = 200
			
			if(valueCount == 2){
				var total = valueCount * priceDetailesz + (+GETdilv) + (+exChrg);
				document.querySelectorAll(".get-dil-Price")[0].innerHTML ="LKR."+ (+GETdilv + exChrg);
			}else if(valueCount == 3){
				var total = valueCount * priceDetailesz + (+GETdilv) + (+exChrg)*2;
				document.querySelectorAll(".get-dil-Price")[0].innerHTML ="LKR."+ (+GETdilv + exChrg*2);
			}else{
				var total = valueCount * priceDetailesz + (+GETdilv);
				document.querySelectorAll(".get-dil-Price")[0].innerHTML ="LKR."+ (+GETdilv);
			}

            document.getElementById("ItemFinalTotaleHere").innerText = "LKR." + total;
			document.querySelectorAll("#ItemSubtotaleHere")[0].innerHTML ="LKR." + subTotall;

			document.querySelectorAll("#PriceTag")[0].value = "LKR."+total;
			document.querySelectorAll("#ItemQuntituy")[0].innerHTML =" <b>(x " +valueCount+")</b>";

        }

        //plus button
        document.querySelector(".plus-btn").addEventListener("click", function() {
            //getting value of input
            valueCount = document.getElementById("quantity").value;

            //input value increment by 1
            valueCount++;

            //setting increment input value
            document.getElementById("quantity").value = valueCount;
            if (valueCount > 1) {
                document.querySelector(".minus-btn").removeAttribute("disabled");
                document.querySelector(".minus-btn").classList.remove("disabled")}
if (valueCount == getQntLimit) {
                document.querySelector(".plus-btn").setAttribute("disabled", "disabled")
            }
//calling price function
            priceTotal()
        })
//plus button
        document.querySelector(".minus-btn").addEventListener("click", function() {
            //getting value of input
 valueCount = document.getElementById("quantity").value;
//input value increment by 1
            valueCount--;
//setting increment input value
            document.getElementById("quantity").value = valueCount

            if (valueCount == 1) {
                document.querySelector(".minus-btn").setAttribute("disabled", "disabled")
            } if (valueCount < getQntLimit) {
                document.querySelector(".plus-btn").removeAttribute("disabled");
            }
//calling price function
            priceTotal()
})

			if(getQntLimit.match("1")){
 document.querySelector(".minus-btn").setAttribute("disabled", "disabled")
 document.querySelector(".plus-btn").setAttribute("disabled", "disabled")
}

var qttLevel = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Stock Lavel-[")[1].split("]")[0]


var unit = 0;
var total;
// if user changes value in field
$('.field').change(function() {
  unit = this.value;
});
$('.add').click(function() {
  unit++;
  var $input = $(this).prevUntil('.sub');
  $input.val(unit);
  unit = unit;
});
$('.sub').click(function() {
  if (unit > 0) {
    unit--;
    var $input = $(this).nextUntil('.add');
    $input.val(unit);
  }
});

document.querySelectorAll(".qtyAviBalDis")[0].innerHTML = qttLevel;

var getStockLim = document.querySelectorAll(".qtyAviBal")[0].innerHTML.slice(0, 2);
var qttLevelz = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Quantity-[")[1].split("]")[0]

if(qttLevelz.match(/[0-9]/)){document.querySelectorAll("#stockLevel")[0].value = qttLevelz;}else{document.querySelectorAll("#stockLevel")[0].value = getStockLim;}

function myFunctionbank() {
 var backnMessage = document.getElementById("paymentyMethord").value;
document.getElementById("testhere").innerHTML = backnMessage;


var gy = document.getElementById("testhere").innerHTML;
var checkBT = gy.match("Bank-T")
var chcekOnline = gy.match("Online-Payment")
var codx = gy.match("COD")

if (checkBT) {
document.getElementById("OnlineB").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:none;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;");
document.getElementById("testhere").setAttribute("style", "display:block;");
document.getElementById("bacnkTrans").setAttribute("style", "display:block;");
}else if (chcekOnline){
document.getElementById("OnlineB").setAttribute("style", "display:block;");
document.getElementById("bacnkTrans").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:none;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;");
document.querySelectorAll("#paymentOp")[0].setAttribute("style", "display:none;");
}else{
document.getElementById("bacnkTrans").setAttribute("style", "display:none;");
document.getElementById("OnlineB").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:block;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;");
}
}

var modal = document.getElementById("myModal12");
var btn = document.getElementById("myBtn12");
var span = document.getElementsByClassName("close")[0];
var disHEad = document.getElementById("Header1");
var subClose = document.getElementById("paymentOp");

btn.onclick = function() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const serialNumber = `ID${timestamp}-${randomNum}`;
  var serialNo = serialNumber;
  document.querySelectorAll("#Oeder-ID")[0].value = serialNumber;
  document.querySelectorAll(".displayOrderIDx")[0].innerHTML =serialNumber;
  modal.style.display = "block";
  disHEad.style.display = "none";


var sizeSelect = document.getElementById("paymentyMethord");
var preSelectedValueCOD = "COD";
var preSelectedValueBankT = "Bank-T";
var preSelectedValueOnlinePayment = "Online-Payment";

// COD Enabled
if (banktrans.match(/n|N/) && onlinetrans.match(/n|N/)) {
	document.getElementById("bacnkTrans").setAttribute("style", "display:none;");
document.getElementById("OnlineB").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:block;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;"); 
document.getElementById("paymentyMethord").setAttribute("style", "display:none;"); 
for (var i = 0; i < sizeSelect.options.length; i++) {
    if (sizeSelect.options[i].value === preSelectedValueCOD) {
        sizeSelect.options[i].selected = true;
        break; 
    }
}
  } else if
// BANK Enabled
  (codtrans.match(/n|N/) && onlinetrans.match(/n|N/)) {
	document.getElementById("OnlineB").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:none;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;");
document.getElementById("testhere").setAttribute("style", "display:block;");
document.getElementById("bacnkTrans").setAttribute("style", "display:block;");
document.getElementById("paymentyMethord").setAttribute("style", "display:none;"); 
for (var i = 0; i < sizeSelect.options.length; i++) {
    if (sizeSelect.options[i].value === preSelectedValueBankT) {
        sizeSelect.options[i].selected = true;
        break; 
    }
}
  }else if 
// Online Payment Enabled
  (codtrans.match(/n|N/) && banktrans.match(/n|N/)) {
document.getElementById("OnlineB").setAttribute("style", "display:block;");
document.getElementById("bacnkTrans").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:none;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;");
document.querySelectorAll("#paymentOp")[0].setAttribute("style", "display:none;");
document.getElementById("paymentyMethord").setAttribute("style", "display:none;"); 
for (var i = 0; i < sizeSelect.options.length; i++) {
    if (sizeSelect.options[i].value === preSelectedValueOnlinePayment) {
        sizeSelect.options[i].selected = true;
        break; 
    }
}
  } else if 
// Bank Transfer Disabled
  (codtrans.match(/y|Y/) && onlinetrans.match(/y|Y/)) {
	document.getElementById("bacnkTrans").setAttribute("style", "display:none;");
document.getElementById("OnlineB").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:block;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;"); 
  }else if
// Online Payment Disabled  
  (banktrans.match(/y|Y/) && codtrans.match(/y|Y/)) {
	document.getElementById("bacnkTrans").setAttribute("style", "display:none;");
document.getElementById("OnlineB").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:block;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;"); 
  }else if
// COD disabled  
  (banktrans.match(/y|Y/) && onlinetrans.match(/y|Y/)) {
	document.getElementById("OnlineB").setAttribute("style", "display:none;");
document.getElementById("codMess").setAttribute("style", "display:none;");
document.getElementById("paymentOp").setAttribute("style", "display:block;");
document.getElementById("adressName").setAttribute("style", "display:block;");
document.getElementById("testhere").setAttribute("style", "display:block;");
document.getElementById("bacnkTrans").setAttribute("style", "display:block;"); 
document.querySelectorAll(".cashOnDelivery")[0].textContent = 'Bank Transfer';
document.querySelectorAll(".cashOnDelivery")[0].setAttribute("disabled", "disabled");

for (var i = 0; i < sizeSelect.options.length; i++) {
    if (sizeSelect.options[i].value === preSelectedValueBankT) {
        sizeSelect.options[i].selected = true;
        break; 
    }
}
  }  


}
span.onclick = function() {
  modal.style.display = "none";
 disHEad.style.display = "block";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    disHEad.style.display = "block";
  }
}

var inforM = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML;
document.querySelectorAll("#ItemNameHere")[0].innerHTML = inforM.split("Item Name-[")[1].split("]")[0];

var GETprice = inforM.split("Price-[")[1].split("]")[0];
var GETqtty = document.querySelectorAll("input[name='Qtty']")[0].value;
var GETdilv = inforM.split("Delivery Charge-[")[1].split("]")[0]

document.querySelectorAll("#ItemSubtotaleHere")[0].innerHTML ="LKR." + GETprice;
var fstprice = document.querySelectorAll("#ItemFinalTotaleHere")[0].innerHTML ="LKR." + ((+GETprice) + (+GETdilv));
document.querySelectorAll("#ItemPricehere")[0].innerHTML ="LKR." + GETprice;

document.querySelectorAll("#PriceTag")[0].value =fstprice;
document.querySelectorAll(".get-dil-Price")[0].innerHTML ="LKR." + GETdilv;
document.querySelectorAll(".delchanrg")[0].innerHTML ="LKR." + GETdilv;

var checkOut = document.querySelectorAll(".out-of-stock")[0].innerHTML;
var chekbv = "Out";

$(function() {
   if (checkOut !== chekbv){
document.getElementById("thanksMasseg").setAttribute("style", "display:block;");
document.getElementById("thanksMasseg").innerHTML = "Unfortunately This Item Is out Of Stock"+"<br/><br/><span class='mybb' onclick='history.back()'>Go Back</span><br/>" ;
document.querySelectorAll("#OutofStk")[0].style.display= "none";
document.querySelectorAll("#size-display-new")[0].innerHTML ="00";

  var labelElements = document.querySelectorAll('.sizes label');
  for (var i = 0; i < labelElements.length; i++) {
    labelElements[i].classList.remove('size');
    labelElements[i].classList.add('size1');
  }

var inputs = document.getElementsByName('Sizes');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
   }
});
var checksizOut = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Size-[")[1].split("]")[0];

if (checksizOut.match("-35")){
document.querySelectorAll("#siz35")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz351")[0].disabled = true;
document.querySelectorAll("#siz351")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-36")){
document.querySelectorAll("#siz36")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz361")[0].disabled = true;
document.querySelectorAll("#siz361")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-37")){
document.querySelectorAll("#siz37")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz371")[0].disabled = true;
document.querySelectorAll("#siz371")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-38")){
document.querySelectorAll("#siz38")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz381")[0].disabled = true;
document.querySelectorAll("#siz381")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-39")){
document.querySelectorAll("#siz39")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz391")[0].disabled = true;
document.querySelectorAll("#siz391")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-40")){
document.querySelectorAll("#siz40")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz401")[0].disabled = true;
document.querySelectorAll("#siz401")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-41")){
document.querySelectorAll("#siz41")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz411")[0].disabled = true;
document.querySelectorAll("#siz411")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-42")){
document.querySelectorAll("#siz42")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz421")[0].disabled = true;
document.querySelectorAll("#siz421")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-43")){
document.querySelectorAll("#siz43")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz431")[0].disabled = true;
document.querySelectorAll("#siz431")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-44")){
document.querySelectorAll("#siz44")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz441")[0].disabled = true;
document.querySelectorAll("#siz441")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-45")){
document.querySelectorAll("#siz45")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz451")[0].disabled = true;
document.querySelectorAll("#siz451")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-S")){
document.querySelectorAll("#sizS")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#sizS1")[0].disabled = true;
document.querySelectorAll("#sizS1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-M_")){
document.querySelectorAll("#sizM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#sizM1")[0].disabled = true;
document.querySelectorAll("#sizM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-L")){
document.querySelectorAll("#sizL")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#sizL1")[0].disabled = true;
document.querySelectorAll("#sizL1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-X_")){
document.querySelectorAll("#sizXL")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#sizXL1")[0].disabled = true;
document.querySelectorAll("#sizXL1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-XX")){
document.querySelectorAll("#sizXXL")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#sizXXL1")[0].disabled = true;
document.querySelectorAll("#sizXXL1")[0].setAttribute("value", "Out of Stock"); 
}


if (checksizOut.match("-110CM")){
document.querySelectorAll("#siz110CM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz110CM1")[0].disabled = true;
document.querySelectorAll("#siz110CM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-115CM")){
document.querySelectorAll("#siz115CM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz115CM1")[0].disabled = true;
document.querySelectorAll("#siz115CM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-120CM")){
document.querySelectorAll("#siz120CM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz120CM1")[0].disabled = true;
document.querySelectorAll("#siz120CM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-130CM")){
document.querySelectorAll("#siz130CM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz130CM1")[0].disabled = true;
document.querySelectorAll("#siz130CM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-140CM")){
document.querySelectorAll("#siz140CM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz140CM1")[0].disabled = true;
document.querySelectorAll("#siz140CM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-150CM")){
document.querySelectorAll("#siz150CM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz150CM1")[0].disabled = true;
document.querySelectorAll("#siz150CM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match("-160CM")){
document.querySelectorAll("#siz160CM")[0].setAttribute("class", "size1"); 
document.querySelectorAll("#siz160CM1")[0].disabled = true;
document.querySelectorAll("#siz160CM1")[0].setAttribute("value", "Out of Stock"); 
}

if (checksizOut.match(/[0-9]/g)){ document.querySelectorAll("#disPlaySize")[0].style.display="unset"}else{document.querySelectorAll("#disPlaySize")[0].style.display="none"}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 20000); // Change image every 2 seconds
}

var modalk = document.getElementById("myModalk");
var btnk = document.getElementById("myBtnk");
var spank = document.getElementsByClassName("closek")[0];

btnk.onclick = function() {
  modalk.style.display = "block";
}

function closekzz() {
  modalk.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalk) {
    modalk.style.display = "none";
  }
}
//Login Page
function userLogi() {
 window.location="https://www.blackvenda.lk/p/form-border-3px-solid-f1f1f1max-width.html";
}
//Header Banner Slid
var geVal = document.querySelectorAll(".containerz")[0].addEventListener("click", myFunction);
var proLINk = document.querySelectorAll(".getsliderVal")[0].innerHTML.split("Product Link[")[1].split("]")[0];
function myFunction() {
  window.location=proLINk;
}
//Item Code
var getM = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML;
document.querySelectorAll(".modelNor")[0].innerHTML = getM.split("Item Code -[")[1].split("]")[0];

const date = new Date();
const currDate = date.toLocaleDateString();
document.querySelectorAll(".toDateRes")[0].innerHTML =currDate;

//bankTeansfer Detailes

function subM() {
 var Mobile1XZ = document.querySelectorAll("#Mobile1")[0].value;
var tttl = document.querySelectorAll("#ItemFinalTotaleHere")[0].innerHTML;
var pyMetch = document.querySelectorAll("#paymentyMethord")[0].value;
var getSno = document.querySelectorAll("#Oeder-ID")[0].value;


document.querySelectorAll(".refrNoRes")[0].innerHTML =getSno;
document.querySelectorAll(".totalRes")[0].innerHTML =tttl;
document.querySelectorAll(".payMenRes")[0].innerHTML =pyMetch;

if(pyMetch.match("Bank-T")){
document.querySelectorAll(".bankTranFin")[0].setAttribute("style", "display:block;"); 
document.querySelectorAll(".codFin")[0].setAttribute("style", "display:none;");
document.querySelectorAll(".payMenRes")[0].innerHTML ="Bank Transfer";
} 
}

//Bank transfer only Enabled/Disabled
const getBankTD = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML;
const banktrans = getBankTD.split("Bank Transfer-[")[1].split("]")[0]
const onlinetrans = getBankTD.split("Online Payment-[")[1].split("]")[0]
const codtrans = getBankTD.split("Cash on Delivery-[")[1].split("]")[0]

if(banktrans.match(/y|Y/)){
 document.querySelectorAll(".bankTransfer")[0].style.display= "block";
} else if(banktrans.match(/n|N/)){
 document.querySelectorAll(".bankTransfer")[0].style.display= "none";
}

if(onlinetrans.match(/y|Y/)){
 document.querySelectorAll(".Online-Payment")[0].style.display= "block";
} else if(onlinetrans.match(/n|N/)){
 document.querySelectorAll(".Online-Payment")[0].style.display= "none";
}

if(codtrans.match(/y|Y/)){
 document.querySelectorAll(".cashOnDelivery")[0].style.display= "block";
} else if(codtrans.match(/n|N/)){
 document.querySelectorAll(".cashOnDelivery")[0].style.display= "none";
}

//let classReviewTo = "revDiv";
let str5 = "starRating-5";
let str4 = "starRating-4";
let str3 = "starRating-3";
let str2 = "starRating-2";
let str1 = "starRating-1";

let countTotal = document.getElementsByClassName(classReviewTo).length;
let count5 = document.getElementsByClassName(str5).length;
let count4 = document.getElementsByClassName(str4).length;
let count3 = document.getElementsByClassName(str3).length;
let count2 = document.getElementsByClassName(str2).length;
let count1 = document.getElementsByClassName(str1).length;

document.querySelectorAll(".totalCountReview")[0].innerHTML =(`${countTotal}`);
document.querySelectorAll(".fiveStarRating")[0].innerHTML =(`${count5}`);
document.querySelectorAll(".fourStar")[0].innerHTML =(`${count4}`);
document.querySelectorAll(".threeStar")[0].innerHTML =(`${count3}`);
document.querySelectorAll(".toWStar")[0].innerHTML =(`${count2}`);
document.querySelectorAll(".oneStar")[0].innerHTML =(`${count1}`);

var maxCount = 100;

var strRfive = document.querySelectorAll(".fiveStarRating")[0].innerHTML;
var strRFour = document.querySelectorAll(".fourStar")[0].innerHTML;
var strRThree = document.querySelectorAll(".threeStar")[0].innerHTML;
var strRTow = document.querySelectorAll(".toWStar")[0].innerHTML;
var strROne = document.querySelectorAll(".oneStar")[0].innerHTML;

var countBar5 = strRfive;
var countBar4 = strRFour;
var countBar3 = strRThree;
var countBar2 = strRTow;
var countBar1 = strROne;

var percentage5 = (countBar5 / maxCount) * 100;
var percentage4 = (countBar4 / maxCount) * 100;
var percentage3 = (countBar3 / maxCount) * 100;
var percentage2 = (countBar2 / maxCount) * 100;
var percentage1 = (countBar1 / maxCount) * 100;

document.querySelectorAll(".bar-5")[0].style.width = percentage5 + "%";
document.querySelectorAll(".bar-4")[0].style.width = percentage4 + "%";
document.querySelectorAll(".bar-3")[0].style.width = percentage3 + "%";
document.querySelectorAll(".bar-2")[0].style.width = percentage2 + "%";
document.querySelectorAll(".bar-1")[0].style.width = percentage1 + "%";
//toggle reviwe down and up
$(document).ready(function(){
  $("#wrevi").click(function(){
    $("#ff-compose").slideToggle("slow");
  });
});
//Color selecting script
var gtD = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Main-Color[")[1].split("]")[0].toUpperCase();
var gtColId = "#"+gtD.toLowerCase()+"1"
document.querySelectorAll("#colorDisplayBew")[0].innerHTML =gtD;
if(gtD === gtD){document.querySelectorAll(gtColId)[0].setAttribute("checked", "true");}
var getClz = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML;
var patternz = "[a-zA-Z]"
if(getClz.split("Blue[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#blue")[0].style.display= "block";document.querySelectorAll("#blue1")[0].value =getClz.split("Blue[")[1].split("]")[0];} 
document.querySelectorAll("#black1")[0].value =getClz.split("Blue[")[1].split("]")[0];
if(getClz.split("Black[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#black")[0].style.display= "block"; document.querySelectorAll("#black1")[0].value =getClz.split("Black[")[1].split("]")[0];}
if(getClz.split("Green[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#green")[0].style.display= "block";document.querySelectorAll("#green1")[0].value =getClz.split("Green[")[1].split("]")[0];}
if(getClz.split("Brown[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#brown")[0].style.display= "block";document.querySelectorAll("#brown1")[0].value =getClz.split("Brown[")[1].split("]")[0];}
if(getClz.split("Coffee-Brown[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#coffee-brown")[0].style.display= "block";document.querySelectorAll("#coffee-brown1")[0].value =getClz.split("Coffee-Brown[")[1].split("]")[0];}
if(getClz.split("White[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#white")[0].style.display= "block";document.querySelectorAll("#white1")[0].value =getClz.split("White[")[1].split("]")[0];}
if(getClz.split("Red[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#red")[0].style.display= "block";document.querySelectorAll("#red1")[0].value =getClz.split("Red[")[1].split("]")[0];}
if(getClz.split("Silver[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#silver")[0].style.display= "block";document.querySelectorAll("#silver1")[0].value =getClz.split("Silver[")[1].split("]")[0];}
if(getClz.split("Orange[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#orange")[0].style.display= "block";document.querySelectorAll("#orange1")[0].value =getClz.split("Orange[")[1].split("]")[0];}
if(getClz.split("Pink[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#pink")[0].style.display= "block";document.querySelectorAll("#pink1")[0].value =getClz.split("Pink[")[1].split("]")[0];}
if(getClz.split("Gray[")[1].split("]")[0].match(patternz)){
document.querySelectorAll("#gray")[0].style.display= "block";
document.querySelectorAll("#gray1")[0].value =getClz.split("Gray[")[1].split("]")[0];
}
if(getClz.split("Yellow[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#yellow")[0].style.display= "block";document.querySelectorAll("#yellow1")[0].value =getClz.split("Yellow[")[1].split("]")[0];}
if(getClz.split("White-Black[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#whtie-black")[0].style.display= "block";document.querySelectorAll("#whtie-black1")[0].value =getClz.split("White-Black[")[1].split("]")[0];}
if(getClz.split("White-Blue[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#whtie-blue")[0].style.display= "block";document.querySelectorAll("#whtie-blue1")[0].value =getClz.split("White-Blue[")[1].split("]")[0];}
if(getClz.split("White-Red[")[1].split("]")[0].match(patternz)){document.querySelectorAll("#whtie-red")[0].style.display= "block";document.querySelectorAll("#whtie-red1")[0].value =getClz.split("White-Red[")[1].split("]")[0];}

document.querySelectorAll("#colorSend")[0].value = gtD.toLowerCase();

const myRadios = document.querySelectorAll('input[name="print_color"]');

myRadios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    if (this.checked) {
      window.location.href = this.value;
    }
  });
});

var getCup = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Coupon Code-[")[1].split("]")[0];
var getCupPers = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("%[")[1].split("]")[0];
document.querySelectorAll(".discountPersontage")[0].innerHTML ="%" + getCupPers;

function applyCoupon() {
  const couponCode = document.getElementById('couponCode').value;
  const totalAmount = parseFloat(document.getElementById('ItemFinalTotaleHere').textContent.slice(4)); // Extract numeric value
  let discountedAmount = 0;

  // Check if the coupon code is valid and apply the discount accordingly
  if (couponCode === getCup) {
     discountedAmount = totalAmount * (1 - parseFloat(getCupPers) / 100); // Calculate the discounted amount
	 document.querySelectorAll(".mainBoxCoup")[0].style.display ="none";
	 document.querySelectorAll(".totalPz")[0].innerHTML = "Discounted Price"
	 document.querySelectorAll("#TitlteFOr")[0].value = getInfoname + " (Coupon code applied)";
  } else {
    alert('Invalid coupon code. Please try again.');
    return;
  }
  // Update the displayed discounted amount
var discPri = document.getElementById('ItemFinalTotaleHere').textContent = 'LKR.' + discountedAmount.toFixed(2);
document.querySelectorAll("#PriceTag")[0].value =discPri;
}

const cupCheck =document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Coupon Code-[")[1].split("]")[0];

if (cupCheck === "") {
  document.querySelectorAll(".mainBoxCoup")[0].style.display ="none";
}

//Qty 1 pease
var checkQttt=document.querySelectorAll(".qtyAviBal")[0].innerHTML;if("1 Pieces available"===checkQttt)document.querySelector(".plus-btn").setAttribute("disabled","disabled");$('.btn.plus-btn').on('click',function(){document.querySelectorAll(".totalPz")[0].innerHTML="Total";});

//Coupon code timer
var ExdateandTime=document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Coupon Expierd date-[")[1].split("]")[0];const couponEndTime=new Date(ExdateandTime).getTime();const interval=setInterval(()=>{const now=new Date().getTime(),timeLeft=couponEndTime-now;if(timeLeft<=0){clearInterval(interval);document.getElementById('couponDiv').style.display='none';document.getElementById('timerDiv').innerHTML='<p>Coupon has expired.</p>';}else{const daysLeft=Math.floor(timeLeft/(1000*60*60*24)),hours=Math.floor((timeLeft%(1000*60*60*24))/(1000*60*60)),minutes=Math.floor((timeLeft%(1000*60*60))/(1000*60)),seconds=Math.floor((timeLeft%(1000*60))/1000);const timerElement=document.getElementById('timer');timerElement.innerHTML=`${daysLeft} days ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;const messageElement=document.getElementById('message');daysLeft===3?messageElement.innerHTML='Only 3 days left!':messageElement.innerHTML='';}},1000);function formatTime(time){return time<10?`0${time}`:time;}

//𝗣𝗔𝗬𝗣𝗔𝗟 𝗜𝗡𝗧𝗘𝗚𝗥𝗔𝗧𝗜𝗢𝗡
const YourNameInput = document.getElementById('YourName');
const AddressInput = document.getElementById('Address');
const DistrictInput = document.getElementById('District'); 
const Mobile1Input = document.getElementById('Mobile1'); 
const orderIDElement = document.getElementById('Oeder-ID'); // Element to display custom reference
const paypalCover = document.querySelectorAll(".centered")[0];

function checkInputsx() {
  if (YourNameInput.value && AddressInput.value && DistrictInput.value && Mobile1Input.value) {
    paypalCover.style.display= 'none';
  } else {
    paypalCover.style.display= '';
  }
}

YourNameInput.addEventListener('input', checkInputsx);
AddressInput.addEventListener('input', checkInputsx);
DistrictInput.addEventListener('input', checkInputsx);
Mobile1Input.addEventListener('input', checkInputsx);

    // Disable the PayPal button when the form is not valid
    function updatePayPalButtonState() {
      const form = document.getElementById('myForm');
      const paypalButton = document.getElementById('paypal-button-container');
      const isValid = form.checkValidity();
      paypalButton.style.display = isValid ? 'block' : 'none';
    }

// Replace 'YOUR_API_KEY' with your actual API key from Open Exchange Rates
const apiKey = 'https://openexchangerates.org/api/currencies.json';

// Function to fetch real-time exchange rates and convert LKR to USD
async function convertLKRtoUSD(lkrAmount) {
  try {
    // Fetch the latest exchange rates
    const response = await fetch(`https://open.er-api.com/v6/latest/USD?apikey=${apiKey}`);
    const data = await response.json();
    const exchangeRate = data.rates.LKR;

    return lkrAmount / exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

// Function to render PayPal button with the converted amount
async function renderPayPalButton() {
  const lkrAmount = parseFloat(document.getElementById('ItemFinalTotaleHere').innerText.split('LKR.')[1]);
  const usdAmount = await convertLKRtoUSD(lkrAmount);
  const scriptURL = 'https://script.google.com/macros/s/AKfycby4XI6bPZeaY0m_wcX0Xfm013FGE4c5zTxZeHdDokfZ68x4qz7N71w6YPTdQeUkwcy6/exec'
            const form = document.forms['google-sheet']

  if (usdAmount !== null) {
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: usdAmount.toFixed(2),
              currency_code: 'USD'
            },
			 invoice_id: orderIDElement.value
          }]
        });
      },
      onApprove: function(data, actions) { 
		document.getElementById('paymentOp').click();
		document.querySelectorAll(".onlineTrancex")[0].style.display= "block";
		document.querySelectorAll(".codFin")[0].style.display= "none";
		alert('Payment successful! Transaction');
      }
    }).render('#paypal-button-container');
  } else {
    // Handle the case where the currency conversion fails
    alert('Failed to fetch exchange rates. Please try again later.');
  }
}

// Wait for the DOM to be ready and then render the PayPal button
document.addEventListener('DOMContentLoaded', renderPayPalButton);

//Paypal onclick Cover Error
function paypalfillform() {
  alert('Please fill out this field.');
}

//TEXTTOCOPY 
var e=document.getElementById("textToCopy"),t=document.getElementById("copyButton");t.addEventListener("click",function(){var n=document.createElement("textarea");n.value=e.textContent,document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),t.textContent="Copied!",setTimeout(function(){t.textContent="Copy"},1e3)});

//PRODUCT DELIVERY DATE
function calculateEstimatedShippingDate() {
    const today = new Date();
    const estimatedShippingDate = new Date(today);
    estimatedShippingDate.setDate(today.getDate() + 14);
    return estimatedShippingDate;
}

function calculateNewEstimatedShippingDate() {
    const currentDate = new Date();
    const newEstimatedDate = new Date(currentDate);
    newEstimatedDate.setDate(currentDate.getDate() + 6);
    return newEstimatedDate;
}

const newEstimatedDateElement = document.getElementById("newEstimatedDate");
const estimatedDate2Element = document.getElementById("estimatedDate2");

const newEstimatedDate = calculateNewEstimatedShippingDate();
const estimatedDate2 = calculateEstimatedShippingDate();

newEstimatedDateElement.textContent = newEstimatedDate.toDateString();
estimatedDate2Element.textContent = estimatedDate2.toDateString();

const gtInfoInterShipping = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("International Shipping-[")[1].split("]")[0];
const gtInfoLocShipping = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Local Shpping-[")[1].split("]")[0];
const gtInfoInterwithLocShipping = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Inter Product Local Shipping-[")[1].split("]")[0];

if (gtInfoInterShipping.includes("Y")) {
    document.querySelectorAll("#newEstimatedDate")[0].style.display = "none";
    document.querySelectorAll(".cash-on-delivery")[0].style.display = "none";
    document.querySelectorAll(".delivery-option-item__time")[0].innerHTML = "14 - 25 Working day(s)";
} else if (gtInfoLocShipping.includes("Y")) {
    document.querySelectorAll("#estimatedDate2")[0].style.display = "none";
    document.querySelectorAll(".overTheSea")[0].style.display = "none";
} else if (gtInfoInterwithLocShipping.includes("Y")) {
    document.querySelectorAll("#estimatedDate2")[0].style.display = "none";
    document.querySelectorAll(".overTheSea")[0].style.display = "none";
    document.querySelectorAll(".cash-on-delivery")[0].style.display = "none";
}

//Produdct Branding
const brandN = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML.split("Brand Name-[")[1].split("]")[0];
document.querySelectorAll(".productBrand")[0].innerHTML ='<a href="https://www.blackvenda.lk/search/max-results=8?q='+ brandN +'">'+ brandN +'</a>';
document.querySelectorAll(".productBrand")[1].innerHTML ='<a href="https://www.blackvenda.lk/search/max-results=8?q='+ brandN +'">More Products from '+ brandN +'</a>';

//Share Button
 document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("shareButton"),t=document.getElementById("socialIcons");e.addEventListener("click",()=>{t.style.display="block"===t.style.display?"none":"block"});const o=document.querySelectorAll(".social-icon");o.forEach(e=>{e.addEventListener("click",()=>{!function(e){const t=encodeURIComponent(document.title),o=encodeURIComponent(window.location.href);switch(e){case"facebook":window.open(`https://www.facebook.com/sharer/sharer.php?u=${o}`,"_blank");break;case"twitter":window.open(`https://twitter.com/intent/tweet?url=${o}&text=${t}`,"_blank");break;case"linkedin":window.open(`https://www.linkedin.com/shareArticle?url=${o}&title=${t}`,"_blank");break;case"whatsapp":window.open(`https://api.whatsapp.com/send?text=${t} - ${o}`,"_blank")}}(e.id)})})});
 
 //Product Update script
var itemD = document.querySelectorAll(".itemDetaielsMain")[0];
var deliverD = document.querySelectorAll(".deliveryOptionmain")[0];
var pmdd = document.querySelectorAll(".paymentMatherdMain")[0];
var prodd = document.querySelectorAll(".productURLMain")[0];
var itemImgdd = document.querySelectorAll(".itemImages")[0];
var finsub = document.querySelectorAll(".finalsubmit")[0];
var fistN = document.querySelectorAll(".firstNext")[0];
  document.querySelectorAll(".itemdd")[0].style.background= "white";
  document.querySelectorAll(".itemdd")[0].style.color= "red";
  

function itemdd() {
  itemD.style.display= "block";
  deliverD.style.display= "none";
  pmdd.style.display= "none";
  prodd.style.display= "none";
  itemImgdd.style.display= "none";
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: red; background-color: white;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color: ; background-color: ;";
    document.querySelectorAll(".coupendd")[0].style.cssText = "color: ; background-color: ;";
document.querySelectorAll(".coupenSections")[0].style.display= "none";
}

function firstNext() {
    itemD.style.display= "none";
  deliverD.style.display= "block";
  pmdd.style.display= "none";
  prodd.style.display= "none";
  itemImgdd.style.display= "none";
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:red; background-color:white;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color: ; background-color: ;";
    document.querySelectorAll(".coupenSections")[0].style.display= "none";

}

function delItem() {
  itemD.style.display= "none";
  deliverD.style.display= "block";
  pmdd.style.display= "none";
  prodd.style.display= "none";
  itemImgdd.style.display= "none";
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:red; background-color:white;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color: ; background-color: ;";
      document.querySelectorAll(".coupendd")[0].style.cssText = "color: ; background-color: ;";
      document.querySelectorAll(".coupenSections")[0].style.display= "none";
}
function payOp() {
    itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "block";
  prodd.style.display= "none";
  itemImgdd.style.display= "none";
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:red; background-color:white;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color: ; background-color: ;";
      document.querySelectorAll(".coupendd")[0].style.cssText = "color: ; background-color: ;";
document.querySelectorAll(".coupenSections")[0].style.display= "none";
}

function oprod() {
      itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "none";
  prodd.style.display= "block";
  itemImgdd.style.display= "none";
    document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color:red; background-color:white;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color: ; background-color: ;";
      document.querySelectorAll(".coupendd")[0].style.cssText = "color: ; background-color: ;";
      document.querySelectorAll(".coupenSections")[0].style.display= "none";
}

function productImgUrl() {
      itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "none";
  prodd.style.display= "none";
  itemImgdd.style.display= "block";
      document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color:red; background-color:white;";
  document.querySelectorAll(".finalsubmit")[0].style.display= "";
      document.querySelectorAll(".coupendd")[0].style.cssText = "color: ; background-color: ;";
      document.querySelectorAll(".coupenSections")[0].style.display= "none";
}

function coupenCodeZ() {
      itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "none";
  prodd.style.display= "none";
  itemImgdd.style.display= "none";
  document.querySelectorAll(".coupenSections")[0].style.display= "block";
      document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".finalsubmit")[0].style.display= "";
      document.querySelectorAll(".coupendd")[0].style.cssText = "color:red; background-color:white;";
}


function secondNext() {
 
      itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "";
  prodd.style.display= "none";
  itemImgdd.style.display= "none";
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:red; background-color:white;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".finalsubmit")[0].style.display= "";
}

function thirdNext() {
        itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "none";
  prodd.style.display= "";
  itemImgdd.style.display= "none";
  
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color:red; background-color:white;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color:; background-color:;";
}

function firthNext() {
          itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "none";
  prodd.style.display= "none";
  itemImgdd.style.display= "none";
   document.querySelectorAll(".coupenSections")[0].style.display= "block";
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color:; background-color:;";
        document.querySelectorAll(".coupendd")[0].style.cssText = "color:red; background-color:white;";
}

function sixthNext() {
          itemD.style.display= "none";
  deliverD.style.display= "none";
  pmdd.style.display= "none";
  prodd.style.display= "none";
  itemImgdd.style.display= "";
  document.querySelectorAll(".itemdd")[0].style.cssText = "color: ; background-color: ;";
  document.querySelectorAll(".delicerdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".paymentdd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".oprourldd")[0].style.cssText = "color:; background-color:;";
  document.querySelectorAll(".prourldd")[0].style.cssText = "color:red; background-color:white;";
   document.querySelectorAll(".coupenSections")[0].style.display= "none";
         document.querySelectorAll(".coupendd")[0].style.cssText = "color:; background-color:;";
}

//Header slide show Script
let currentSlide=0,slidesContainer=document.querySelector(".my-slides"),slides=document.querySelectorAll(".my-slide");function showSlide(n){if(n<0)n=slides.length-1;else if(n>=slides.length)n=0;currentSlide=n,slidesContainer.style.transform=`translateX(-${100*currentSlide}%)`,slides.forEach((slide,index)=>index===currentSlide?slide.style.opacity=1:slide.style.opacity=0)}function changeSlide(n){showSlide(currentSlide+n)}function autoSlide(){changeSlide(1)}showSlide(currentSlide),setInterval(autoSlide,4e3);

const iframe = document.getElementById('reviewIfram');
    const showValueDiv = document.querySelectorAll(".rating-countz")[0];

    // Wait for the iframe to load its content
    iframe.addEventListener('load', function() {
      // Access the content inside the iframe
      const iframeContent = iframe.contentDocument || iframe.contentWindow.document;

      // Get the rating count from the iframe content
      const ratingCountElement = iframeContent.querySelector('.totalCountReview');
      if (ratingCountElement) {
        const ratingCount = ratingCountElement.textContent;

        // Display the rating count in the showValue div
        showValueDiv.textContent = ratingCount + ' Ratings' ;
      } else {
        showValueDiv.textContent = 'Rating count not found';
      }
    });
function updateSelectedColor(selectedDiv) {
            const selectedColor = document.getElementById('colorDisplayBew');
            const colorSendInput = document.getElementById('colorSend');

            // Update the selected color text
            selectedColor.textContent = selectedDiv.dataset.color.replace('-', ' / ').toUpperCase();

            // Remove the red border from previously selected options
            document.querySelectorAll('.color-optionNew.selected').forEach(selectedOption => {
                selectedOption.classList.remove('selected');
            });

            // Apply the red border to the selected div
            selectedDiv.classList.add('selected');

            // Update the input value with the selected color
            colorSendInput.value = selectedDiv.dataset.color;
        }

        const colorOptions = document.querySelector('.color-optionsNew');
        const colorInfo = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML;
        const colorPairsAndSingles = colorInfo.split("Color [")[1].split("]")[0].split(',');

        document.querySelectorAll("#colorDisplayBew")[0].innerHTML =colorPairsAndSingles;
        
        if (colorPairsAndSingles) {
            colorPairsAndSingles.forEach((color, index) => {
                const div = document.createElement('div');
                div.className = 'color-optionNew';
                div.dataset.color = color.toLowerCase().replace(' & ', '-');

                // Check if it's a color pair or an individual color
                if (color.includes('/')) {
                    const colors = color.split(' / ');
                    div.style.background = `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
                } else {
                    div.style.backgroundColor = color.toLowerCase();
                }

                colorOptions.appendChild(div);

                // Pre-select the first color option and apply the red border
                if (index === 0) {
                    div.classList.add('selected');
                    updateSelectedColor(div);
                }

                // Event listener for color change
                div.addEventListener('click', (event) => {
                    updateSelectedColor(event.target);
                });
            });
        } else {
            // Handle the case when no color information is found
            colorOptions.textContent = 'No color information available';
        }
//  <!--[Free Shipping Script]-->
const getFshipping = document.querySelectorAll(".contant-detaiels-here")[0].innerHTML;
const Fshipping = getFshipping.split("Delivery Charge-[")[1].split("]")[0]

if(Fshipping){document.querySelectorAll(".get-dil-Price")[0].innerHTML ="Free Shipping", document.querySelectorAll(".delAmount")[0].innerHTML ="🚚 Free Shipping";} 

var showColorD = document.querySelectorAll("#colorDisplayBew")[0].textContent;
document.querySelectorAll("#colorDisplaySeez")[0].innerHTML="<b>Selected  - </b>"+ "("+showColorD.toLowerCase()+")";
