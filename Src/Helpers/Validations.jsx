export const contactValidator = (mobileNumber) => {
    const re = /^[6789]\d{9}$/; // Mobile numbers should start with 6, 7, 8, or 9
    if (!mobileNumber) return "Mobile Number can't be empty.";
    if (!re.test(mobileNumber)) return "Invalid Mobile Number.";
    return "";
};

export const emailValidator = (email) => {
    const re = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Fix: Removed the incorrect '!'
    if (!email) return "Email can't be empty.";
    if (!re.test(email)) return "Invalid Email.";
    return "";
};
