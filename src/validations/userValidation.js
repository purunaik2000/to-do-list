function validateUserData(data) {
    try {
        const {name, email, password} = data;
        if(!name) return {
            status: false,
            message: 'Name is required.'
        }

        if(!/^[A-Za-z][A-Za-z' ]{2,15}$/.test(name)) return {
            status: false,
            message: 'Invalid user name'
        }

        if(!email) return {
            status: false,
            message: 'Email is required.'
        }

        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return {
            status: false,
            message: 'Invalid email address'
        }

        if(!password) return {
            status: false,
            message: 'Password is required.'
        }

        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&.])[A-Za-z\d@$!%#*?&.]{8,15}$/.test(password)) return {
            status: false,
            message: 'Password must contain minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
        }

        return true;
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports =  validateUserData;