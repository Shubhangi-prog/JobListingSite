const validateUser = (req, res, next) => {
    try {
        const { name, email, mobile, password } = req.body;
        const path = req.path;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (path === '/user/login') {
            if (!email || !password) {
                throw Object.assign(Error("Please provide all required fields"), { code: 400 });
            }
            if (!emailRegex.test(email)) {
                throw Object.assign(Error("Please provide a valid email address"), { code: 400 });
            }
        } else if (path === '/user/register') {
            if (!name || !email || !password || !mobile) {
                throw Object.assign(Error("Please provide all required fields"), { code: 400 });
            }
            if (!emailRegex.test(email)) {
                throw Object.assign(Error("Please provide a valid email address"), { code: 400 });
            }
            if (!mobileRegex.test(mobile)) {
                throw Object.assign(Error("Please provide a valid mobile number"), { code: 400 });
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateUser;