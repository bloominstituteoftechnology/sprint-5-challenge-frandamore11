async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  console.log(axios)
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
  
    console.log(learnersWithMentorNames); // use or display the data as needed
  }).catch(error => console.log(error)); // catch any errors

  //create a function to build the learner cards. 


  function createLearnerCard(learner) {
    //create card elements
    const card = document.createElement('div')
    const name = document.createElement('h3')
    const email = document.createElement('div')
    const mentorTitle = document.createElement('h4')
    const mentorUl = document.createElement('ul')
    const mentors = document.createElement('li')

    name.textContent = learner.fullName;
    email.textContent = learner.email;
    mentorTitle.textContent = 'Mentors';

    card.appendChild(name)
    card.appendChild(email)
    //first append the li to the uls, then appedn this to the mentor title header. 
    mentorUl.appendChild(mentors)
    mentorTitle.appendChild(mentorUl)
    card.appendChild(mentorTitle)

    return card

  }

  



 


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
