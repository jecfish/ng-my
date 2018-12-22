export class GoogleAnalytics {
    static run(config: { trackingID: string }) {
        const tag = document.createElement('script');
        tag.async = true;
        tag.src = `https://www.googletagmanager.com/gtag/js?id=${config.trackingID}`;

        document.documentElement.firstChild.appendChild(tag);

        window['dataLayer'] = window['dataLayer'] || [];
        window['gtag'] = window['gtag'] || function (...args: any[]) {
            window['dataLayer'].push(...args);
        };

        window['gtag']('js', new Date());
        window['gtag']('config', config.trackingID);
    }
}
