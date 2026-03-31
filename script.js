let progress = -1;
let tendency = 0.5; // 0.5 being neutral, 0 => HO1, 1 => HO2

const questions = [
    ["しらすよりマグロを食べたい？", "assets/question0.jpg", ["やっぱしらすしか勝たん！", -0.2], ["マグロに決まってるだろバカか", 0.2]],
    ["刺身の上にたんぽぽを載せるバイトって正直いらないよね？", "assets/question1.jpg", ["めっちゃそう思う！マジで要らないよね！", -0.25], ["そんなことはない。失礼だろう！", 0.15]],
    ["あなたは半額ですか？", "assets/question2.png", ["はい、半額です", 0.15], ["いいえ、全額です", -0.15]],
    ["あなたは幸せでしたか？", "assets/question3.png", ["ああ、私は、幸せでした", -0.1], ["いいえ、そうでも、ありませんでした", 0.1]],
    ["デンジくんはさ、セイヨウのタンポポとカントウのタンポポ、どっちが好き？", "assets/question4.png", ["セイヨウのタンポポ", 0.075], ["カントウのタンポポ", 0.15]],
    ["ぶっちゃけ、「しらす」と「たんぽぽ」どっちが好き？", "assets/question5.jpg",  ["しらす", 0.3], ["たんぽぽ", -0.3]]
];

const imgbox       = document.getElementById('imgbox');
const questionBox  = document.getElementById('questionbox');
const button1      = document.getElementById('button1');
const button2      = document.getElementById('button2');

const mask  = document.querySelector('.mask');
const modal = document.querySelector('.modal');
const result_closeButton = document.querySelector('.result_close_button');
const result_img = document.getElementById('result_img');
const result_text = document.getElementById('result_text');
const result_subtext = document.getElementById('result_subtext');

// Declaring Event Listeners
button1.addEventListener('click', () => {
    tendency += questions[progress][2][1];
    progressToNext();
});

button2.addEventListener('click', () => {
    tendency += questions[progress][3][1];
    progressToNext();
});

result_closeButton.addEventListener('click', closeModalWindow);


// Method to go on to the next question. If there are no question remaining, just proceed to the result.
function progressToNext() {
    progress++;

    if (progress < questions.length) {
        questionBox.textContent = '第' + (progress+1) + '問\n' + questions[progress][0];
        imgbox.src = questions[progress][1];
        button1.textContent = questions[progress][2][0];
        button2.textContent = questions[progress][3][0];
    } else {
        showResult();
    }
}

// A function to open dialog and show result of the diagnosis.
function showResult() {
    if (tendency < 0.45) { // ho1
        result_img.src = "assets/result_1.jpg"
        result_text.textContent = "君にオススメのＨＯは……しらす！！";
        result_subtext.textContent = "しらすって確かにおいしいよね。僕もそう思う。";
    } else if (tendency > 0.55) { // ho2
        result_img.src = "assets/result_2.png"
        result_text.textContent = "君にオススメのＨＯは……たんぽぽ！！";
        result_subtext.textContent = "たんぽぽ載せの仕事とか、向いてるんじゃない？";
    } else { // neutral
        result_img.src = "assets/result_middle.png"
        result_text.textContent = "君にオススメのＨＯは……無い！";
        result_subtext.textContent = "どっちつかずの君は、とりあえず好きに選べば？";
    }

    openModalWindow();
}

function openModalWindow() {
    mask.classList.add('appear');
    modal.classList.add('appear');
}

function closeModalWindow() {
    mask.classList.remove('appear');
    modal.classList.remove('appear');
}

progressToNext();