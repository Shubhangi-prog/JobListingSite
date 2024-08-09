const validateJob = (req, res, next) => {
    try {
        const { companyName, companyLogo, jobPosition, monthlySalary, jobDuration, jobType, locationType, jobLocation, jobDescription, aboutCompany, skillsRequired, additionalInfo } = req.body;

        const errors = [];

        const validateString = (field, name) => {
            if (typeof field !== 'string' || field.trim() === '') {
                errors.push(`${name} is required and must be in text format`);
            }
        };

        const validateArray = (field, options, name) => {
            if (!options.includes(field)) {
                errors.push(`${name} must be one of ${options.join(', ')}`);
            }
        };

        // ..................................

        validateString(companyName, 'Company name');

        const logoRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/i;
        if (!companyLogo || !logoRegex.test(companyLogo)) {
            errors.push('Company logo must be a valid URL ending in png, jpg, jpeg, svg, or webp');
        }

        validateString(jobPosition, 'Job position');

        const salary = parseInt(monthlySalary);
        if (typeof salary !== 'number' || salary <= 0) {
            errors.push('Monthly salary must be a number greater than 0');
        }

        validateString(jobDuration, 'Job duration');

        validateArray(jobType, ["Full-Time", "Part-Time", "Internship"], 'Job type');

        validateArray(locationType, ["On-Site", "Remote", "Hybrid"], 'Location type');

        validateString(jobLocation, 'Job location');

        validateString(jobDescription, 'Job description');

        validateString(aboutCompany, 'About company');

        if (!Array.isArray(skillsRequired) || !skillsRequired.every(skill => typeof skill === 'string')) {
            errors.push('Skills required must be a list of skills in text format');
        }

        validateString(additionalInfo, 'Additional information');

        if (errors.length > 0) {
            throw Object.assign(Error(errors.join('\n')), { code: 400 });
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateJob;
