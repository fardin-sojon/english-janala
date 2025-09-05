
const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn bg-[#1a91ff1a]">${el}</span>`)
    return htmlElements.join(" ");
}

const manageSpiner = (stutus)=>{
    if(stutus == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const LoadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //Promise of response
        .then(res => res.json()) //Promise of JSON data
        .then((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("active"))

}

const loadLevalWord = (id) => {
    manageSpiner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            removeActive(); // remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);
            clickBtn.classList.add("active"); // add avtive class
            displayLevalWord(data.data)
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }

const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="">
        <h2 class="text-2xl">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
        <div class="">
        <h2 class="font-bold mb-1">সমার্থক শব্দ গুলো</h2>
        <div class="">${createElements(word.synonyms)}</div>
    </div>
    `
    document.getElementById("word_modal").showModal();
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
        manageSpiner(false);
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
              <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80] rounded-lg p-2"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80] rounded-lg p-2"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `
        wordContainer.append(card)
    });
    manageSpiner(false);
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

document.getElementById("btn-search").addEventListener("click", ()=> {
    removeActive();
    const inputSearch = document.getElementById("input-search");
    const searchValue = inputSearch.value.trim().toLowerCase();
    console.log(searchValue)
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        console.log(allWords)
        const filterWords = allWords.filter(word=> word.word.toLowerCase().includes(searchValue))
        displayLevalWord(filterWords)
    })
})