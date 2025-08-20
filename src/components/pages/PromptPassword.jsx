import { useEffect } from 'react';

const PromptPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showPromptPassword('#authentication-prompt-password');
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gray-900 to-surface">
            <div className="flex-1 py-12 px-5 flex justify-center items-center">
                <div id="authentication-prompt-password" className="bg-surface/80 backdrop-blur-sm border border-gray-700/50 mx-auto w-[400px] max-w-full p-10 rounded-xl shadow-xl"></div>
            </div>
        </div>
    );
};

export default PromptPassword;