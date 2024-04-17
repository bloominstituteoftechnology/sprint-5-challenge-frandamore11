async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // console.log(axios)
  const learnersURL = 'http://localhost:3003/api/learners'
  const mentorsURL = 'http://localhost:3003/api/mentors'

  Promise.all([
    axios.get(learnersURL),
    axios.get(mentorsURL)
  ]).then(([learnersResponse, mentorsResponse]) => {
    const learners = learnersResponse.data;
    const mentors = mentorsResponse.data;
  
    // Create a lookup object for mentors
    const mentorLookup = mentors.reduce((acc, mentor) => {
      acc[mentor.id] = `${mentor.firstName} ${mentor.lastName}`; // combining firstName and lastName
      return acc;
    }, {});
  
    // Iterate over learners data and for each learner, map their mentor ids to mentor names
    const learnersWithMentorNames = learners.map(learner => {
      const mentorNames = learner.mentors.map(mentorId => mentorLookup[mentorId]);
      return {...learner, mentors: mentorNames};
    });
  
    // console.log(learnersWithMentorNames); // use or display the data as needed
    const cardSection = document.querySelector('.cards');

  // For each learner, create a card and append it to the card section
    learnersWithMentorNames.forEach(learner => {
      const card = createLearnerCard(learner);
      cardSection.appendChild(card);
    }); 

  }).catch(error => console.log(error)); // catch any errors

  //create a function to build the learner cards. 


  function createLearnerCard(learner) {
    //create card elements
    const card = document.createElement('div');
    card.className = 'card';
    const name = document.createElement('h3');
    const email = document.createElement('div');
    const infoElement = document.querySelector('.info');

    name.textContent = learner.fullName;
    email.textContent = learner.email;

    // Create the mentor title and list
    const mentorTitle = document.createElement('h4');
    mentorTitle.textContent = 'Mentors';
    const mentorList = document.createElement('ul');
    mentorList.style.display = 'none'; // Hide the list by default
    const arrowSpan = document.createElement('span');
    arrowSpan.textContent = '➡️'; // This is a Unicode right arrow
    arrowSpan.style.marginRight = '5px'; // Add some spacing between the arrow and the title
    mentorTitle.prepend(arrowSpan);

    // Create a list item for each mentor
    learner.mentors.forEach(mentorName => {
      const mentorLi = document.createElement('li');
      mentorLi.textContent = mentorName;
      mentorList.appendChild(mentorLi);
    });

    // Add a click event listener to the title
    mentorTitle.addEventListener('click', () => {
      // Toggle the visibility of the list when the title is clicked
      if (mentorList.style.display === 'none') {
        mentorList.style.display = 'block';
        arrowSpan.textContent = '⬇️';; // Point down when list is visible
      } else {
        mentorList.style.display = 'none';
        arrowSpan.textContent = '➡️'; // Point right when list is hidden
      }
    });

    // Append elements to card
    card.appendChild(name);
    card.appendChild(email);
    card.appendChild(mentorTitle);
    card.appendChild(mentorList);

    // Add a click event listener to the card
    card.addEventListener('click', () => {
      // Remove the "selected" class from all cards
      const allCards = document.querySelectorAll('.card');
      allCards.forEach((card) => {
        card.classList.remove('selected');
      });

      // Add the "selected" class to the clicked card
      card.classList.add('selected');
      infoElement.textContent = `The selected learner is ${learner.fullName}`;
    });

    return card;

  }
  

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
