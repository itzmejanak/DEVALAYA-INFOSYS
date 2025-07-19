"use client"

import { useEffect } from 'react'

interface TawkChatProps {
    propertyId: string;
    widgetId: string;
}

export default function TawkChat({ propertyId, widgetId }: TawkChatProps) {
    useEffect(() => {
        // Tawk.to script injection
        const injectTawkScript = () => {
            // Create a script element
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
            script.setAttribute('charset', 'UTF-8'); // Using setAttribute instead of deprecated property
            script.setAttribute('crossorigin', '*');

            // Append the script to the body
            document.body.appendChild(script);

            // Configure Tawk.to appearance once it's loaded
            const configureTawk = () => {
                if (window && (window as any).Tawk_API) {
                    const Tawk_API = (window as any).Tawk_API;
                    const Tawk_LoadStart = new Date();

                    // Set theme colors to match your site
                    Tawk_API.onLoad = function () {
                        // Customize the widget appearance
                        Tawk_API.customize({
                            // Match your site's color scheme
                            headerBgColor: '#0f172a', // navy color
                            headerTextColor: '#e5b45b', // gold color
                            primaryBgColor: '#0f172a',
                            primaryTextColor: '#ffffff',
                            secondaryBgColor: '#1e293b',
                            secondaryTextColor: '#e5b45b',
                            buttonBgColor: '#e5b45b',
                            buttonTextColor: '#0f172a'
                        });
                    };

                    // Set visitor information if available
                    Tawk_API.onChatStarted = function () {
                        // You can set visitor information here if needed
                        console.log('Chat started');
                    };
                }
            };

            // Try to configure Tawk periodically until it's available
            const configInterval = setInterval(() => {
                if (window && (window as any).Tawk_API) {
                    configureTawk();
                    clearInterval(configInterval);
                }
            }, 500);

            // Clear interval after 10 seconds to prevent infinite checking
            setTimeout(() => clearInterval(configInterval), 10000);

            return () => {
                // Cleanup function to remove the script when component unmounts
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                clearInterval(configInterval);
            };
        };

        // Inject the script
        const cleanup = injectTawkScript();

        return () => {
            if (cleanup) cleanup();

            // Additional cleanup: remove any Tawk.to elements that might have been added
            const tawkElements = document.querySelectorAll('[id^="tawk-"]');
            tawkElements.forEach(element => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        };
    }, [propertyId, widgetId]);

    return null; // This component doesn't render anything visible
}