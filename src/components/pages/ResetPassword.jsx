import { useEffect } from 'react';

const ResetPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showResetPassword('#authentication-reset-password');
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gray-900 to-surface">           
            <div className="flex-1 py-12 px-5 flex justify-center items-center">
                <div id="authentication-reset-password" className="bg-surface/80 backdrop-blur-sm border border-gray-700/50 mx-auto w-[400px] max-w-full p-10 rounded-xl shadow-xl"></div>
            </div>
        </div>
    );
};

export default ResetPassword;