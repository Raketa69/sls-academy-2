class Validator {

    validAge(input) {
        input = Number.parseInt(input)
        if (isNaN(input)) {
            console.log('\n >>> Enter only numbers!')
            return false
        }
        return true
    }
    validName(input) {
        if (input.toString().length == 1) {
            console.log('\n >>> Enter more than 1 symbol!')
            return false;
        }
        return true
    }
}

export default Validator
