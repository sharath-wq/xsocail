type OtpData = {
    email: string;
    expires: string;
};

interface ResendOtpProps {
    email: string;
    resetTimer: () => void;
}
