console.log('I am JS');

const LoadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //Promise of response
        .then(res => res.json()) //Promise of JSON data
        .then((json) => displayLesson(json.data));
};

const removeActive = ()=> {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("active"))
      
}

const loadLevalWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive(); // remove all active class
            const clickBtn =document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);
            clickBtn.classList.add("active"); // add avtive class
            displayLevalWord(data.data)
        })
}

const displayLevalWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="hind-siliguri-font text-center col-span-full rounded py-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-lg font-medium text-gray-400 my-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="font-bold text-2xl">নেক্সট Lesson এ যান</h3>
          </div>
        `;
        return;
    }

    //     {
    //     "id": 84,
    //     "level": 1,
    //     "word": "Fish",
    //     "meaning": "মাছ",
    //     "pronunciation": "ফিশ"
    // }

    words.forEach(word => {
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
            <h2 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যাইনি"}</h2>
            <p class="font-medium">${word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"}</p>
            <div class="hind-siliguri-font text-2xl font-medium">${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যাইনি"}</div>
            <div class="flex justify-between items-center">
              <button onclick="my_modal_5.showModal()" class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80] rounded-lg p-2"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80] rounded-lg p-2"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `
        wordContainer.append(card)
    });
}

const displayLesson = (lessons) => {
    // 1. get the container & empty
    const levalContainer = document.getElementById("level-container");
    levalContainer.innerHTML = "";
    // 2. get into evey lessons
    for (let lesson of lessons) {
        console.log(lesson)
        // 3. create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevalWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
    `
        // 4. append into container
        levalContainer.append(btnDiv)
    }
}

LoadLessons();