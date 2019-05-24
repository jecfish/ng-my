/* tslint:disable */
export class GoogleAnalytics {
    static run(config: { trackingID: string }) {
        const tag = document.createElement('script');
        tag.async = true;
        tag.src = `https://www.googletagmanager.com/gtag/js?id=${config.trackingID}`;
        tag.setAttribute('defer','');

        document.documentElement.firstChild.appendChild(tag);

        window['dataLayer'] = window['dataLayer'] || [];
        window['gtag'] = window['gtag'] || function (...args: any[]) {
            window['dataLayer'].push(arguments);
        };

        window['gtag']('js', new Date());
        window['gtag']('config', config.trackingID);
    }
}
