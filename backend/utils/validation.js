import validator from "validator";

export const validateSignUpData = (req) => {
    const { email, fullName, password, confirmPassword } = req.body;
    if(!email.trim() || !fullName.trim() || !password.trim() || !confirmPassword.trim()) {
        throw new Error("Enter valid details.");
    } else if(!email || !fullName || !password || !confirmPassword) {
        throw new Error("Every fieled is required.");
    } else if(!validator.isEmail(email)) {
        throw new Error("Enter valid email.");
    } else if(password !== confirmPassword) {
        throw new Error("Passwords not matching.");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Enter Strong password.");
    }
}

export const validateLoginData = (req) => {
    const { email, password } = req.body;
    if(!email.trim() || !password.trim()) {
        throw new Error("Invalid credintials");
    } else if(!email || !password || !validator.isEmail(email)) {
        throw new Error("Invalid credintials.");
    } 
}

export const validateJobData = (req) => {
    const { title, jobDescription, companyName, location, skills, salary, employmentType } = req.body;
    if(!title.trim() || !jobDescription.trim() || !companyName.trim() || !location.trim() || !skills.length>0 || !employmentType.trim() || !salary.trim() ) {
        throw new Error("Enter valid job details.");
    } else if(!title || !jobDescription || !companyName || !location || !skills || !employmentType || !salary) {
        throw new Error("Every job detail is required.");
    }
}

export const validateAddressData = (req) => {
    const {
        street,
        city,
        state,
        country,
        postalCode
    } = req.body;
    if(!street || !city || !state || !country || !postalCode) {
        throw new Error("Enter valid address.");
    } else if(!street.trim() || !city.trim() || !state.trim() || !country.trim() || !postalCode.trim()) {
        throw new Error("Enter valid address");
    }
}

export const validateCertificateData = (req) => {
    const { certificationName, certificateUrl } = req.body;
    if(!certificationName || !certificationName.trim() || !certificateUrl || !certificateUrl.trim()) {
        throw new Error("Enter valid certificate name");
    } else if(!validator.isURL(certificateUrl)) {
        throw new Error("Enter valid url");
    }
}

export const validateExperienceData = (req) => {
    const { jobTitle, company, location, startDate, endDate, responsibilities} = req.body;
    if(!jobTitle || !company || !location || !startDate || !endDate || !responsibilities) {
        throw new Error("Every field is required");
    } else if(!jobTitle.trim() || !company.trim() || !location.trim() || !startDate.trim() || !endDate.trim() || !responsibilities.trim()) {
        throw new Error("Every filed is required");
    }
}

export const validateProfileData = (req) => {
    const { profilePic, skills, contact} = req.body;
    if(!profilePic || !skills || !contact ) {
        throw new Error("Every field is required");
    } else if(!profilePic.trim() || !skills.length >= 3 || !contact.trim()) {
        throw new Error("Every filed is required");
    }
}

export const validateProjectData = (req) => {
    const { projectName, description, techStack, projectLink } = req.body; 
    if( !projectName ||  !description || !techStack || !projectLink) {
        throw new Error("Every field is required");
    } else if(!projectName.trim() || !techStack.length >= 1 || !description.trim() || !projectLink.trim()) {
        throw new Error("Every filed is required");
    }
}