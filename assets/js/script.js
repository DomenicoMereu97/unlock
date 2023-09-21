import data from '/assets/data.json' assert {type: 'json'};

document.addEventListener("DOMContentLoaded", (event) => {

    const keyboard = document.getElementById('numbers'),
        keys = keyboard.getElementsByTagName('button'),
        array = [],
        now = new Date,
        h = now.getHours(),
        m = now.getMinutes(),
        clock = document.getElementById("time");
        let clear = 0;
        

        clock.innerHTML = (h.toString() + ":" + m.toString());

    [...keys].forEach(key => {
        key.addEventListener("click", (event) => {
            const dotsContainer = document.getElementById("fields"),
            dots = dotsContainer.querySelectorAll(".numberfield");
          
            clear ++;
            dots.forEach(( e, index) => {
               let invert = clear == 5 ? true : false
                if(clear == 5) {
                    clear = 1;
                }
                if(clear <= 4 && index == clear-1) {
                   !invert ? dots[index].classList.add('active') : dots[index].classList.remove('active');
                }
            });
            array.push(key.innerText)

            if (array.length && array.slice(-2).toString() == "0,0") {
                const accuracy = 1000,
                    males = data.male.mostUsed.filter(e => e.count > accuracy),
                    females = data.female.mostUsed.filter(e => e.count > accuracy),
                    names = males.concat(females),
                    [nameLenght] = array,
                    pureArr = array.slice(0, -2).slice(1),
                    firstFilteredArr = names.filter(e => e.name.length == nameLenght),
                    vowels = ['A', 'E', 'I', 'O', 'U'],
                    results = [],
                    maxResults = 5;

                firstFilteredArr.forEach(element => {
                    const name = [...element.name],
                        letters = pureArr.map(num => name[parseInt(num) - 1]),
                        control = [];
                    letters.forEach(letter => {
                        if (vowels.includes(letter)) {
                            control.push(letter);
                            if (control.length == letters.length) {
                                results.push(element);
                                return;
                            }
                        }
                    })

                });
                results.sort((a, b) => {
                    return b.count - a.count;
                });

                console.log(results)
            }
        })
    });
});