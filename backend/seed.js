const mongoose = require('mongoose');
const Candidate = require('./models/Candidate');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/votingapp')
  .then(() => console.log('✅ MongoDB connected for seeding'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Updated candidate list
const candidates = [
  {
    name: "Narendra Modi",
    party: "BJP",
    image: "https://c4.wallpaperflare.com/wallpaper/915/675/763/narendra-modi-prime-minister-presentation-wallpaper-preview.jpg",
    candidateId: 0
  },
  {
    name: "Rahul Gandhi",
    party: "Congress",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rahul_Gandhi.jpg",
    candidateId: 1
  },
  {
    name: "Arvind Kejriwal",
    party: "AAP",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Arvind_Kejriwal_%28cropped%29.jpg",
    candidateId: 2
  },
  {
    name: "Akhilesh Yadav",
    party: "Samajwadi Party",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Akhilesh_Yadav_2022.jpg",
    candidateId: 3
  },
  {
    name: "Sharad Pawar",
    party: "NCP",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Sharad_Pawar_in_2010.jpg",
    candidateId: 4
  },
  {
    name: "Yogi Adityanath",
    party: "BJP",
    image: "https://pbs.twimg.com/profile_images/1833528888368005120/4Y4hEvd5_400x400.jpg",
    candidateId: 5
  },
  {
    name: "Nitish Kumar",
    party: "JD(U)",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Nitish_Kumar.png",
    candidateId: 6
  },
  {
    name: "Uddhav Thackeray",
    party: "Shiv Sena",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Uddhav_Thackeray_in_2019.jpg",
    candidateId: 7
  },
  {
    name: "K. Chandrashekar Rao",
    party: "BRS",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/K._Chandrashekar_Rao_in_2018.jpg",
    candidateId: 8
  },
  {
    name: "Pinarayi Vijayan",
    party: "CPI(M)",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Pinarayi_Vijayan.jpg",
    candidateId: 9
  },
  {
    name: "MK Stalin",
    party: "DMK",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/M._K._Stalin.jpg",
    candidateId: 10
  },
  {
    name: "Asaduddin Owaisi",
    party: "AIMIM",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Asaduddin_Owaisi_in_2014.jpg",
    candidateId: 11
  },
  {
    name: "Hemant Soren",
    party: "JMM",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Hemant_Soren.jpg",
    candidateId: 12
  },
  {
    name: "Devendra Fadnavis",
    party: "BJP",
    image: "https://d3pc1xvrcw35tl.cloudfront.net/ln/images/1200x900/devendra-fadnavis-1689958528888-1690979111075_202308590585.jpg",
    candidateId: 13
  },
  {
    name: "Bhupesh Baghel",
    party: "Congress",
    image: "https://pbs.twimg.com/profile_images/1718139680372510720/gLbZ3arW_400x400.jpg",
    candidateId: 14
  },
  {
    name: "Naveen Patnaik",
    party: "BJD",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Naveen_Patnaik.jpg",
    candidateId: 15
  },
  {
    name: "Tejashwi Yadav",
    party: "RJD",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tejashwi_Yadav.jpg",
    candidateId: 16
  },
  {
    name: "Kanhaiya Kumar",
    party: "Congress",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Kanhaiya_Kumar_2016.jpg",
    candidateId: 17
  },
  {
    name: "Priyanka Gandhi",
    party: "Congress",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Priyanka_Gandhi_Vadra.jpg",
    candidateId: 18
  },
  {
    name: "Bhagwant Mann",
    party: "AAP",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bhagwant_Mann_in_2022.jpg",
    candidateId: 19
  },
  {
    name: "Aditya Thackeray",
    party: "Shiv Sena (UBT)",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Aditya_Thackeray.jpg",
    candidateId: 20
  },
  {
    name: "Bandi Sanjay Kumar",
    party: "BJP",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bandi_Sanjay_Kumar_in_2021.jpg",
    candidateId: 21
  },
  {
    name: "Piyush Goyal",
    party: "BJP",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75LfPvuY9vFtKOEFqE_HczMdRz5vLowaJRQ&s",
    candidateId: 22
  },
  {
    name: "Smriti Irani",
    party: "BJP",
    image: "https://governancenow.com/temp/smriti_irani4.jpg",
    candidateId: 23
  },
  {
    name: "Manish Sisodia",
    party: "AAP",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Manish_Sisodia_2017.jpg",
    candidateId: 24
  },
  {
    name: "Raj Thackeray",
    party: "MNS",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Raj_Thackeray.jpg",
    candidateId: 25
  },
  {
    name: "Sonia Gandhi",
    party: "Congress",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sonia_Gandhi.jpg",
    candidateId: 26
  },
  {
    name: "Amit Shah",
    party: "BJP",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Amit_Shah_2020.jpg",
    candidateId: 27
  },
  {
    name: "Rajnath Singh",
    party: "BJP",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Rajnath_Singh_in_2017.jpg",
    candidateId: 28
  },
  {
    name: "Mamata Banerjee",
    party: "TMC",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Mamata_Banerjee_Kolkata_2016-04-13_8988.jpg",
    candidateId: 29
  }
];

// Seeding function
async function seed() {
  try {
    await Candidate.deleteMany();    // Clear old candidates
    await Candidate.insertMany(candidates);  // Insert new candidates
    console.log('✅ Candidate data successfully inserted!');
  } catch (error) {
    console.error('❌ Error inserting candidate data:', error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
