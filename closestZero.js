var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var lineIndex = 0
var arrayLength = 0

rl.on('line', function (line) {

    if (lineIndex == 0) {

        arrayLength = parseInt(line)
        // console.log(`arrayLength: ${arrayLength}`)

        lineIndex += 1

    } else {

        var array = line.split(' ').map(item => parseInt(item))

        if (array.length != arrayLength) {
            rl.close()
            return
        }

        var distance = 0
        var foundFirstZero = false
        for (var i = 0; i < arrayLength; i++) {
            if (array[i] != 0) {
                if (foundFirstZero) {
                    distance += 1
                    array[i] = distance
                }
            } else {
                foundFirstZero = true
                console.log(`foundFirstZero: ${foundFirstZero}`)
                distance = 1
            }
        }

        distance = 0 // reset / flag
        for (var i = arrayLength - 1; i > 0; i--) {
            if (array[i] == 0) {
                distance = 1
            } else if (distance > 0 && array[i] != 0 && array[i - 1] >= distance) {
                array[i] = distance
                distance += 1
            }
        }

        console.log(array.join(' '))

        rl.close()
    }
})
