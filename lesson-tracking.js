




function getCompletedLessons() {
    var completedLessonIds = localStorage.getItem('completedLessonIds');
    if (completedLessonIds) {
        return JSON.parse(completedLessonIds);
    } else {
        return [];
    }
}

function saveCompletedLessonIds(completedLessonIds) {
    localStorage.setItem('completedLessonIds', JSON.stringify(completedLessonIds));
}

function markLessonAsCompleted() {
    // Get the current lesson ID
    const currentLessonId = button.getAttribute('currentlessonid');
    console.log(currentLessonId);

    // find the div with the same Id
    const lesson = document.querySelectorAll('[itemid="' + currentLessonId + '"]');
    console.log(lesson[0]);
    lesson[0].classList.toggle('text-style-strikethrough');

    // retrieve all the completed lesson IDs
    var completedLessonIds = getCompletedLessons();

    // Add the completed lessonId to the array if it's not already there
    if (!completedLessonIds.includes(currentLessonId)) {
        completedLessonIds.push(currentLessonId);
    }
    
     // Save the updated array of completed lesson IDs to local storage
     saveCompletedLessonIds(completedLessonIds);

    // redirect user to next lesson 

    // grab next lesson from attribute

    const nextLessonSlug = button.getAttribute("nextlesson");
    const currentLessonSlug = button.getAttribute("currentlesson");


    // create the url for the new lesson
    var nextLessonURL = window.location.pathname.replace(currentLessonSlug, nextLessonSlug);
    
    // redirect user to the next lesson using the URL we just created
    window.location.href = nextLessonURL;


    
}

// Function to store the last opened lesson slug in local storage
function setLastOpenedLessonSlug(slug) {
    localStorage.setItem('lastOpenedLessonSlug', slug);
}

// Function to get the last opened lesson slug from local storage
function getLastOpenedLessonSlug() {
    return localStorage.getItem('lastOpenedLessonSlug');
}

// When a button with Id completeLessonButton is clicked, retrieve the attribute currentLessonId 
const button = document.getElementById('completeLessonButton'); 
button.addEventListener('click', markLessonAsCompleted);

// When a user opens a lesson, call setLastOpenedLesson with the lesson ID
var currentLessonSlug = window.location.pathname.split('/').pop(); // Extract the slug from the URL
var lastOpenedLessonSlug = getLastOpenedLessonSlug();



// Check if the current lesson is different from the last opened lesson
if (currentLessonSlug !== lastOpenedLessonSlug) {
    // Store the current lesson's slug as the last opened lesson
    setLastOpenedLessonSlug(currentLessonSlug);
    console.log("Current lesson slug" + currentLessonSlug)
}


document.addEventListener('DOMContentLoaded', function() {
    var completedLessonIds = getCompletedLessons();

    // Loop through the completed lesson IDs and do something with them
    completedLessonIds.forEach(function(completedLessonId) {
        // You can apply your logic here for each completed lesson ID
        // find the div with the attribute that matches the completedLessonId
        const lesson = document.querySelectorAll('[itemid="' + completedLessonId + '"]');
        // add the strikethrough class to the div
        lesson[0].classList.toggle('text-style-strikethrough');
    });

    var lastOpenedLessonSlug = getLastOpenedLessonSlug();
    console.log("last Opened lesson slug" + lastOpenedLessonSlug);

    //implementing a smooth scroll to the current item
    const currentItem = document.querySelector('.table-of-content-item.w--current');

    if (currentItem) {
        const collectionList = document.querySelector('.sidebar-item'); 
        const offsetTop = currentItem.offsetTop;
        
        // Calculate the scroll position
        const scrollPosition = offsetTop - collectionList.offsetTop - 30;
        
        // Scroll to the calculated position smoothly
        collectionList.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    });
  