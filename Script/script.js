console.log('I am JS');

const LoadLessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //Promise of response
    .then(res=>res.json()) //Promise of JSON data
    .then((json)=> displayLesson(json.data));
};

const loadLevalWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevalWord(data.data))
}

const displayLevalWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

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
            <h2 class="text-xl font-bold">${word.word}</h2>
            <p class="font-medium">${word.meaning}</p>
            <div class="hind-siliguri-font text-2xl font-medium">${word.pronunciation}</div>
            <div class="flex justify-between items-center">
              <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80] rounded-lg p-2"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80] rounded-lg p-2"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `
        wordContainer.append(card)
    });
}

const displayLesson=(lessons) => {
    // 1. get the container & empty
    const levalContainer = document.getElementById("level-container");
    levalContainer.innerHTML = "";
    // 2. get into evey lessons
    for(let lesson of lessons){
        console.log(lesson)
    // 3. create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevalWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
    `
    // 4. append into container
    levalContainer.append(btnDiv)
    }
}

LoadLessons();