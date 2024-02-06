function validateWorkData(data) {
    try {
        const {title, date, time} = data;

        if(!title) return {
            status: false,
            message: 'title is required'
        }

        if(!/^[A-Za-z][A-Za-z' ]{2,30}$/.test(title)) return {
            status: false,
            message: 'Invalid title'
        }

        if(date) {
            if(isNaN(new Date(date))) return {
                status: false,
                message: 'Invalid date'
            }
        }

        if(time) {
            const [h, m] = time.toString().split(':').map(Number);
            if(isNaN(h) || isNaN(m) || h>23 || m>59) return {
                status: false,
                message: 'Invalid time'
            }
        }

        return true;
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = validateWorkData;