var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var lineIndex = 0
var array = []
var arrayLength = 0

function fillArrayBetweenZeros(index1, index2) {
    // console.log(`fillArrayBetweenZeros called with index1 ${index1} and index2 ${index2}`)
    var distance = index2 - index1
    // console.log(`distance: ${distance}`)

    var counter = 1
    for (var i = index1 + 1; i < index1 + Math.floor(distance / 2) + 1; i++) {
        array[i] = counter
        counter += 1
    }

    // console.log('array after 1st loop:')
    // console.log(array)

    counter = 1
    for (var j = index2 - 1; j > index2 - Math.floor(distance / 2) - 1; j--) {
        array[j] = counter
        counter += 1
    }

    // console.log('array after 2nd loop:')
    // console.log(array)
}

function fillLeft(index) {
    // console.log(`fillLeft called with index ${index}`)
    var distance = 1
    while (index > 0) {
        array[index - 1] = distance
        distance += 1
        index -= 1
    }
}

function fillRight(index) {
    // console.log(`fillRight called with index ${index}`)
    var distance = 1
    while (index < arrayLength - 1) {
        array[index + 1] = distance
        distance += 1
        index += 1
    }
}

rl.on('line', function (line) {

    if (lineIndex == 0) {

        arrayLength = parseInt(line)
        // console.log(`arrayLength: ${arrayLength}`)

        lineIndex += 1

    } else {

        array = line.split(' ').map(item => parseInt(item))
        // console.log('array:')
        // console.log(array)

        if (array.length != arrayLength) {
            rl.close()
            return
        }

        // find all the zeros
        var zeroIndices = []

        array.forEach((item, index) => {
            if (item == 0) {
                zeroIndices.push(index)
            }
        })

        // console.log('*** zeroIndices: ***')
        // console.log(zeroIndices)

        if (zeroIndices.length == 1) {

            // console.log('### zeroIndices.length == 1 ###')

            var indexOfZero = zeroIndices[0]
            fillLeft(indexOfZero)
            fillRight(indexOfZero)

        } else {

            // console.log('#$# zeroIndices.length != 1 #$#')

            fillLeft(zeroIndices[0])

            // console.log('array after fillLeft:')
            // console.log(array)

            for (var i = 0; i < zeroIndices.length - 1; i += 1) {
                fillArrayBetweenZeros(zeroIndices[i], zeroIndices[i + 1])
            }

            // console.log('array after fillArrayBetweenZeros:')
            // console.log(array)

            fillRight(zeroIndices[zeroIndices.length - 1])

            // console.log('array after fillRight:')
            // console.log(array)

        }

        console.log(array.join(' '))

        rl.close()
    }
})
