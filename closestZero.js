// ID успешной посылки: 48177808

let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let lineIndex = 0
let array = []
let arrayLength = 0

function fillArrayBetweenZeros(index1, index2) {
    let distance = index2 - index1

    let counter = 1
    for (let i = index1 + 1; i < index1 + Math.floor(distance / 2) + 1; i++) {
        array[i] = counter
        counter += 1
    }

    counter = 1
    for (let j = index2 - 1; j > index2 - Math.floor(distance / 2) - 1; j--) {
        array[j] = counter
        counter += 1
    }
}

function fillLeft(index) {
    let distance = 1
    while (index > 0) {
        array[index - 1] = distance
        distance += 1
        index -= 1
    }
}

function fillRight(index) {
    let distance = 1
    while (index < arrayLength - 1) {
        array[index + 1] = distance
        distance += 1
        index += 1
    }
}

rl.on('line', function (line) {

    if (lineIndex == 0) {

        arrayLength = parseInt(line)
        lineIndex += 1

    } else {

        array = line.split(' ').map(item => parseInt(item))

        if (array.length != arrayLength) {
            rl.close()
            return
        }

        // find all the zeros
        let zeroIndices = []

        array.forEach((item, index) => {
            if (item == 0) {
                zeroIndices.push(index)
            }
        })

        if (zeroIndices.length == 1) {

            let indexOfZero = zeroIndices[0]
            fillLeft(indexOfZero)
            fillRight(indexOfZero)

        } else {

            fillLeft(zeroIndices[0])

            for (let i = 0; i < zeroIndices.length - 1; i += 1) {
                fillArrayBetweenZeros(zeroIndices[i], zeroIndices[i + 1])
            }

            fillRight(zeroIndices[zeroIndices.length - 1])

        }

        console.log(array.join(' '))

        rl.close()
    }
})
